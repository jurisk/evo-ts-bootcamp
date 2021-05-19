import {Board, ColRow, Entity} from "./domain"

export const InitialBoard: Board = [
    [Entity.Bricks, Entity.Bricks, Entity.Bricks, Entity.Window, Entity.Bricks, Entity.Bricks, Entity.Window, Entity.Bricks, Entity.Bricks, Entity.Bricks],
    [Entity.Bricks, Entity.Window, Entity.Bricks, Entity.Bricks, Entity.Bricks, Entity.Bricks, Entity.Bricks, Entity.Bricks, Entity.Bricks, Entity.Bricks],
    [Entity.Bricks, Entity.Bricks, Entity.Bricks, Entity.Bricks, Entity.Window, Entity.Bricks, Entity.Bricks, Entity.Bricks, Entity.Bricks, Entity.Bricks],
    [Entity.Bricks, Entity.Bricks, Entity.Window, Entity.Bricks, Entity.Bricks, Entity.Bricks, Entity.Window, Entity.Bricks, Entity.Bricks, Entity.Bricks],
    [Entity.Window, Entity.Bricks, Entity.Bricks, Entity.Bricks, Entity.Bricks, Entity.Bricks, Entity.Bricks, Entity.Bricks, Entity.Bricks, Entity.Bricks],
    [Entity.Bricks, Entity.Bricks, Entity.Bricks, Entity.Bricks, Entity.Bricks, Entity.Window, Entity.Bricks, Entity.Bricks, Entity.Bricks, Entity.Bricks],
    [Entity.Bricks, Entity.Bricks, Entity.Bricks, Entity.Bricks, Entity.Bricks, Entity.Bricks, Entity.Bricks, Entity.Bricks, Entity.Bricks, Entity.Bricks],
    [Entity.Bricks, Entity.Bricks, Entity.Bricks, Entity.Bricks, Entity.Bricks, Entity.Bricks, Entity.Bricks, Entity.Bricks, Entity.Bricks, Entity.Bricks],
    [Entity.Window, Entity.Bricks, Entity.Window, Entity.Bricks, Entity.Bricks, Entity.Bricks, Entity.Bricks, Entity.Bricks, Entity.Bricks, Entity.Window],
    [Entity.Bricks, Entity.Bricks, Entity.Bricks, Entity.Bricks, Entity.Window, Entity.Bricks, Entity.Bricks, Entity.Bricks, Entity.Bricks, Entity.Bricks],
]

export const hasAnimal = (board: Board, colRow: ColRow): boolean =>
    board[colRow.row][colRow.column] === Entity.Animal

export const moveAnimal = (board: readonly Entity[][]): readonly Entity[][] => {
    const withoutAnimal = board.map((row) =>
        row.map((entity) =>
            entity === Entity.Animal ? Entity.Window : entity
        )
    )

    const windowIndices: ColRow[] = withoutAnimal.flatMap((row, rowIdx) =>
        row.flatMap((entity, colIdx) =>
            entity === Entity.Window ? [{column: colIdx, row: rowIdx} as ColRow] : []
        )
    )

    const selectedWindow: ColRow = windowIndices[Math.floor(Math.random() * windowIndices.length)]

    // replace random window with Animal
    return withoutAnimal.map((row, rowIdx) =>
        row.map((entity, colIdx) =>
            (rowIdx === selectedWindow.row) && (colIdx === selectedWindow.column) ? Entity.Animal : entity
        )
    )
}

