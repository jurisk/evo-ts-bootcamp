import {AnimalImage, BricksImage, ReticleImage, WindowImage} from "./assets"
import {Entity, State} from "./domain"

export const CellSize = 50

export function draw(context: CanvasRenderingContext2D, state: State): void {
    const drawEntity = (image: HTMLImageElement, colIdx: number, rowIdx: number): void => {
        context.drawImage(image, colIdx * CellSize, rowIdx * CellSize, CellSize, CellSize)
    }

    context.clearRect(0, 0, context.canvas.width, context.canvas.height)

    context.fillStyle = "black"

    state.windows.forEach((row, rowIdx) =>
        row.forEach((cell, colIdx) => {
            switch (cell) {
            case Entity.Bricks:
                return drawEntity(BricksImage, colIdx, rowIdx)
            case Entity.Window:
                return drawEntity(WindowImage, colIdx, rowIdx)
            case Entity.Animal:
                return drawEntity(AnimalImage, colIdx, rowIdx)
            }
        })
    )

    context.drawImage(ReticleImage, state.mouseX - (CellSize / 2), state.mouseY - (CellSize / 2), CellSize, CellSize)

    context.font = "20px serif"
    context.fillText(`Score: ${state.score}`, 5, 525)
}
