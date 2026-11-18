#!/usr/bin/env node
/**
 * Validates every skill tree in data/trees/ against the contract in
 * data/schema.json and types/tree.ts, plus the graph rules reviewers check
 * by hand (unique ids, prerequisites that exist, no cycles).
 *
 * No dependencies, so it runs in CI before `npm ci` finishes caching and
 * contributors can run it with plain Node:
 *
 *   npm run validate                         # every tree
 *   npm run validate -- data/trees/foo.json  # specific files
 *
 * Exit code 1 when any tree has an error.
 */
import { readFileSync, readdirSync } from 'node:fs'
import { basename, join, resolve } from 'node:path'

const TREES_DIR = resolve(process.cwd(), 'data', 'trees')
const ID_PATTERN = /^[a-z0-9-]+$/
const DIFFICULTIES = ['easy', 'medium', 'hard']
const RESOURCE_TYPES = ['video', 'article', 'interactive', 'course', 'docs']

function isNonEmptyString(v) {
  return typeof v === 'string' && v.trim().length > 0
}

function isFiniteNumber(v) {
  return typeof v === 'number' && Number.isFinite(v)
}

function isHttpUrl(v) {
  if (typeof v !== 'string') return false
  try {
    const u = new URL(v)
    return u.protocol === 'https:' || u.protocol === 'http:'
  } catch {
    return false
  }
}

export function validateTree(tree, fileName) {
  const errors = []
  const err = (msg) => errors.push(msg)

  if (tree === null || typeof tree !== 'object' || Array.isArray(tree)) {
    return ['the file must contain one JSON object']
  }

  // ── Tree-level fields ──────────────────────────────────────────────────────
  for (const key of ['treeId', 'title', 'category', 'difficulty', 'description', 'version']) {
    if (!isNonEmptyString(tree[key])) err(`"${key}" is required and must be a non-empty string`)
  }
  if (isNonEmptyString(tree.treeId)) {
    if (!ID_PATTERN.test(tree.treeId)) err(`"treeId" must be lowercase letters, digits and hyphens (got "${tree.treeId}")`)
    if (fileName && basename(fileName, '.json') !== tree.treeId) {
      err(`"treeId" ("${tree.treeId}") must match the file name ("${basename(fileName)}")`)
    }
  }
  if (tree.difficulty !== undefined && !DIFFICULTIES.includes(tree.difficulty)) {
    err(`"difficulty" must be one of ${DIFFICULTIES.join(', ')} (got "${tree.difficulty}")`)
  }
  if (tree.estimatedMonths !== undefined && !(isFiniteNumber(tree.estimatedMonths) && tree.estimatedMonths > 0)) {
    err('"estimatedMonths" must be a positive number')
  }
  if (tree.icon !== undefined && !isNonEmptyString(tree.icon)) err('"icon" must be a non-empty string')

  if (!Array.isArray(tree.nodes) || tree.nodes.length === 0) {
    err('"nodes" must be a non-empty array')
    return errors
  }
  if (!Array.isArray(tree.edges)) err('"edges" must be an array (use [] when there are none)')

  if (tree.totalNodes !== undefined && tree.totalNodes !== tree.nodes.length) {
    err(`"totalNodes" is ${tree.totalNodes} but the tree has ${tree.nodes.length} nodes`)
  }

  // ── Nodes ──────────────────────────────────────────────────────────────────
  const nodeIds = new Set()
  tree.nodes.forEach((node, i) => {
    const where = isNonEmptyString(node?.id) ? `node "${node.id}"` : `nodes[${i}]`
    if (node === null || typeof node !== 'object') {
      err(`${where} must be an object`)
      return
    }
    for (const key of ['id', 'label', 'description', 'icon', 'zone']) {
      if (!isNonEmptyString(node[key])) err(`${where}: "${key}" is required and must be a non-empty string`)
    }
    if (isNonEmptyString(node.id)) {
      if (!ID_PATTERN.test(node.id)) err(`${where}: "id" must be lowercase letters, digits and hyphens`)
      if (nodeIds.has(node.id)) err(`${where}: duplicate node id`)
      nodeIds.add(node.id)
    }
    if (!Array.isArray(node.requires)) err(`${where}: "requires" must be an array (use [] for a starting node)`)

    if (!Array.isArray(node.resources) || node.resources.length === 0) {
      err(`${where}: "resources" must list at least one resource`)
    } else {
      const resourceIds = new Set()
      node.resources.forEach((r, j) => {
        const rWhere = `${where} resources[${j}]`
        if (r === null || typeof r !== 'object') {
          err(`${rWhere} must be an object`)
          return
        }
        for (const key of ['id', 'title', 'author']) {
          if (!isNonEmptyString(r[key])) err(`${rWhere}: "${key}" is required and must be a non-empty string`)
        }
        if (isNonEmptyString(r.id)) {
          if (resourceIds.has(r.id)) err(`${rWhere}: duplicate resource id "${r.id}" in this node`)
          resourceIds.add(r.id)
        }
        if (!isHttpUrl(r.url)) err(`${rWhere}: "url" must be a full http(s) URL (got ${JSON.stringify(r.url)})`)
        if (!RESOURCE_TYPES.includes(r.type)) {
          err(`${rWhere}: "type" must be one of ${RESOURCE_TYPES.join(', ')} (got ${JSON.stringify(r.type)})`)
        }
        if (!(isFiniteNumber(r.estimatedHours) && r.estimatedHours > 0)) {
          err(`${rWhere}: "estimatedHours" must be a positive number`)
        }
        if (r.isFree !== undefined && typeof r.isFree !== 'boolean') err(`${rWhere}: "isFree" must be true or false`)
      })
    }

    if (node.position !== undefined) {
      if (!(isFiniteNumber(node.position?.x) && isFiniteNumber(node.position?.y))) {
        err(`${where}: "position" needs numeric "x" and "y" (or leave it out and let auto-layout place the node)`)
      }
    }
  })

  // ── Prerequisites ──────────────────────────────────────────────────────────
  for (const node of tree.nodes) {
    if (!isNonEmptyString(node?.id) || !Array.isArray(node.requires)) continue
    for (const req of node.requires) {
      if (req === node.id) err(`node "${node.id}" requires itself`)
      else if (!nodeIds.has(req)) err(`node "${node.id}" requires "${req}", which is not a node in this tree`)
    }
  }

  // Cycle check (a cycle makes every node in it permanently locked).
  const requiresOf = new Map(
    tree.nodes
      .filter((n) => isNonEmptyString(n?.id) && Array.isArray(n.requires))
      .map((n) => [n.id, n.requires.filter((r) => nodeIds.has(r) && r !== n.id)]),
  )
  const state = new Map() // undefined = unvisited, 1 = on stack, 2 = done
  const visit = (id, path) => {
    if (state.get(id) === 2) return
    if (state.get(id) === 1) {
      err(`prerequisite cycle: ${[...path.slice(path.indexOf(id)), id].join(' → ')}`)
      return
    }
    state.set(id, 1)
    for (const next of requiresOf.get(id) ?? []) visit(next, [...path, id])
    state.set(id, 2)
  }
  for (const id of requiresOf.keys()) visit(id, [])

  // ── Edges ──────────────────────────────────────────────────────────────────
  if (Array.isArray(tree.edges)) {
    const edgeIds = new Set()
    tree.edges.forEach((e, i) => {
      const where = isNonEmptyString(e?.id) ? `edge "${e.id}"` : `edges[${i}]`
      if (e === null || typeof e !== 'object') {
        err(`${where} must be an object`)
        return
      }
      if (!isNonEmptyString(e.id)) err(`${where}: "id" is required`)
      else if (edgeIds.has(e.id)) err(`${where}: duplicate edge id`)
      else edgeIds.add(e.id)
      for (const end of ['source', 'target']) {
        if (!isNonEmptyString(e[end])) err(`${where}: "${end}" is required`)
        else if (!nodeIds.has(e[end])) err(`${where}: "${end}" is "${e[end]}", which is not a node in this tree`)
      }
    })
  }

  return errors
}

function main() {
  const args = process.argv.slice(2)
  const files = args.length
    ? args.map((f) => resolve(process.cwd(), f))
    : readdirSync(TREES_DIR)
        .filter((f) => f.endsWith('.json'))
        .sort()
        .map((f) => join(TREES_DIR, f))

  if (files.length === 0) {
    console.error('No tree files found in data/trees/')
    process.exit(1)
  }

  const treeIds = new Map()
  let failed = 0

  for (const file of files) {
    let tree
    try {
      tree = JSON.parse(readFileSync(file, 'utf8'))
    } catch (e) {
      failed++
      console.error(`✗ ${basename(file)}\n    invalid JSON: ${e.message}`)
      continue
    }
    const errors = validateTree(tree, file)
    if (isNonEmptyString(tree?.treeId)) {
      if (treeIds.has(tree.treeId)) errors.push(`"treeId" "${tree.treeId}" is also used by ${treeIds.get(tree.treeId)}`)
      else treeIds.set(tree.treeId, basename(file))
    }
    if (errors.length) {
      failed++
      console.error(`✗ ${basename(file)}`)
      for (const e of errors) console.error(`    ${e}`)
    } else {
      console.log(`✓ ${basename(file)} (${tree.nodes.length} nodes)`)
    }
  }

  console.log(`\n${files.length - failed}/${files.length} trees valid`)
  if (failed) process.exit(1)
}

main()
