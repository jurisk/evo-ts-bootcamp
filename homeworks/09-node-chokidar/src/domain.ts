import {Brand} from "./util"

export const EventName = "dirwatcher:changed"

export type JsonObject = { [key: string]: string }
export type FileName = Brand<string, "FileName">
