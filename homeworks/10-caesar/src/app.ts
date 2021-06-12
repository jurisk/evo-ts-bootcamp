import fs from "fs"
import yargs from "yargs"
import {pipeline} from "stream"

import { caesarTransform } from "./caesar"
import ReadableStream = NodeJS.ReadableStream
import WritableStream = NodeJS.WritableStream

interface Arguments {
    action: "encode" | "decode"
    shift: number
    input: string | null
    output: string | null
}

const args: Arguments = yargs.options({
    "action": {
        choices: ["encode" as const, "decode" as const],
        demandOption: true,
        alias: "a",
        description: "Action to perform",
    },
    "shift": {
        type: "number",
        demandOption: true,
        alias: "s",
        description: "Shift number used as the encryption key",
    },
    "input": {
        type: "string",
        demandOption: false,
        alias: "i",
        description: "Input file",
    },
    "output": {
        type: "string",
        demandOption: false,
        alias: "o",
        description: "Output file",
    }
}).argv as Arguments

const input: ReadableStream = (args.input ? fs.createReadStream(args.input) : process.stdin)
    .setEncoding("utf8")

const output: WritableStream = args.output ? fs.createWriteStream(args.output) : process.stdout

pipeline(
    input,
    caesarTransform(args.action, args.shift),
    output,
    (err) => err ? console.error("Error occurred", err) : console.log("Finished"),
)
