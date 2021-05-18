import {Entity, State} from "./domain"

export const moveAnimal = (board: readonly Entity[][]): readonly Entity[][] => {
    const withoutAnimal = board.map((row) =>
        row.map((entity) =>
            entity === Entity.Animal ? Entity.Window : entity
        )
    )

    type ColRow = {
        column: number
        row: number
    }

    const windowIndices: ColRow[] = withoutAnimal.flatMap((row, rowIdx) =>
        row.flatMap((entity, colIdx) =>
            entity === Entity.Window ? [{column: colIdx, row: rowIdx}] : []
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

export const initialState: State = {
    windows: [
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
    ],
    score: 0,
    mouseX: 0,
    mouseY: 0,
}
