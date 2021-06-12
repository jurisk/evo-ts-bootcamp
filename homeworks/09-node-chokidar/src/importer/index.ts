import { EventEmitter } from "events"
import {EventName, FileName, JsonObject} from "../domain"
import * as fs from "fs"
import csvtojson from "csvtojson"
import {CancellationFunction} from "../util"

const options: { encoding: BufferEncoding } = { encoding: "utf8" }

export class Importer {
    constructor(
        private readonly eventEmitter: EventEmitter,
    ) {}

    public listen(callback: (fileName: FileName, data: readonly JsonObject[]) => void): CancellationFunction {
        const listener = (file: FileName) =>
            this.import(file).then((result) => callback(file, result))

        this.eventEmitter.on(EventName, listener)
        return () => this.eventEmitter.off(EventName, listener)
    }

    public async import(path: string): Promise<readonly JsonObject[]> {
        const data = await fs.promises.readFile(path, options)
        return csvtojson().fromString(data).then((x) => x as JsonObject[])
    }

    public importSync(path: string): readonly JsonObject[] {
        const data = fs.readFileSync(path, options)
        throw new Error("Our chosen JSON library is only async so we did not do 'importSync'." + data)
    }
}
