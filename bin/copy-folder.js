#! /usr/bin/env node
import { execSync } from "child_process"
import { getPath } from "./helpers.js"

const src = getPath(import.meta.url) + "../"
const dir = process.argv[2] || process.env.PATH

execSync(`cp -r ${src}/redux ${dir}/redux`)