import {DirWatcher} from "./dirWatcher"
import {Importer} from "./importer"
import EventEmitter from "events"
import * as readline from "readline"

const eventEmitter = new EventEmitter()

const importer = new Importer(eventEmitter)
const cancelImporter = importer.listen((file, data) =>
    console.log(`File ${file} detected:`, data)
)

const dirWatcher = new DirWatcher(eventEmitter)
const path = "./data"
const cancelDirWatcher = dirWatcher.watch(path)

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})

rl.question(`Watching ${path}, press Enter to exit...\n`, () => {
    rl.close()
    cancelDirWatcher()
    cancelImporter()
})
