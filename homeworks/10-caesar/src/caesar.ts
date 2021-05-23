import {Transform, TransformCallback} from "stream"

const encode = (shift: number) => (s: string) => s
    .split("")
    .map((x) => String.fromCharCode(x.charCodeAt(0) + shift))
    .join("")

const decode = (shift: number) => encode(-shift)

export const caesarTransform = (action: "encode" | "decode", shift: number): Transform => {
    const f = { encode, decode }[action](shift)

    return new Transform({
        transform(chunk: any, encoding: BufferEncoding, callback: TransformCallback) {
            if (chunk instanceof Buffer) {
                const input: string = chunk.toString("utf8")
                const converted = f(input)
                callback(null, converted)
            } else {
                callback(new Error(`Did not recognize ${chunk}`), null)
            }
        }
    })
}
