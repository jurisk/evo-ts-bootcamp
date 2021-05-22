import { EventEmitter } from "events"
import {EventName, FileName} from "../domain"
import {Set} from "immutable"
import path from "path"
import * as fs from "fs"
import {CancellationFunction, delay} from "../util"

export class DirWatcher {
    constructor(
        private readonly eventEmitter: EventEmitter,
    ) {}

    public watch(directoryPath: string, interval = 1000): CancellationFunction {
        let processed: Set<FileName> = Set()
        let keepRunning = true

        const process = (file: FileName): void => {
            if (!processed.contains(file)) {
                processed = processed.add(file)
                this.eventEmitter.emit(EventName, path.join(directoryPath, file) as FileName)
            }
        }

        const singleStep = (): void => {
            fs.promises.readdir(directoryPath)
                .then((files) =>
                    files.forEach((file) => process(file as FileName))
                )
        }

        const loop = () => {
            if (keepRunning) {
                singleStep()
                delay(interval).then(() => loop())
            }
        }

        loop()

        return () => keepRunning = false
    }
}
