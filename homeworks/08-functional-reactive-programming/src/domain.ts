type Brand<K, T> = K & { __brand: T }

export enum Entity {
    Bricks = "B",
    Window = "W",
    Animal = "A",
}

export type X = Brand<number, "X">
export type Y = Brand<number, "Y">

export type Coords = {
    x: X,
    y: Y,
}

export type ColumnIndex = Brand<number, "ColumnIndex">
export type RowIndex = Brand<number, "RowIndex">

export type ColRow = {
    column: ColumnIndex
    row: RowIndex
}

export type Board = readonly Entity[][]

export type Score = Brand<number, "Score">

export type State = {
    windows: Board,
    score: Score,
    reticle: Coords | null,
}
