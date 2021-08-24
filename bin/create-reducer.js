#! /usr/bin/env node
import { execSync } from "child_process"
import { readFileSync, writeFileSync } from "fs"
import { getPath, nodeNameToClassName as nodeNameToUnixName } from "helpers.js"

const __DIR__ = process.env.PWD + "/src/app/redux"
const REDUCERS_MASTER_PATH = __DIR__ + "/combinedReducers.ts"
const REDUCER_SAMPLE_PATH = getPath(import.meta.url) + "/samples/reducer.sample.ts"
const REDUCER_NAME = process.argv[2]
const REDUCER_UNIX_NAME = nodeNameToUnixName(REDUCER_NAME)

// Create reducer
const reducerPath = __DIR__ + "/reducers/" + REDUCER_NAME + ".ts"
writeFileSync(reducerPath, readFileSync(REDUCER_SAMPLE_PATH))
execSync("code " + reducerPath) // Try to open editor
// Append reducers master
const combinedReducers = readFileSync(REDUCERS_MASTER_PATH).toString("utf-8")
const newCombinedReducers = combinedReducers
  .replace(
    "/* -- New Import -- */",
    `import ${REDUCER_UNIX_NAME} from "${REDUCER_NAME}"\n/* -- New Import -- */`
  )
  .replace(
    "/* -- New Reducer -- */",
    ` ${REDUCER_NAME},\n/* -- New Reducer -- */`
  )
writeFileSync(REDUCERS_MASTER_PATH, newCombinedReducers)