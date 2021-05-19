import {AnimalImage, BricksImage, ReticleImage, WindowImage} from "./assets"
import {Entity, State} from "./domain"

export const CellSize = 50

const EntityImages = {
    [Entity.Bricks]: BricksImage,
    [Entity.Window]: WindowImage,
    [Entity.Animal]: AnimalImage,
}

export function draw(context: CanvasRenderingContext2D, state: State): void {
    const drawEntity = (entity: Entity, colIdx: number, rowIdx: number): void =>
        context.drawImage(EntityImages[entity], colIdx * CellSize, rowIdx * CellSize, CellSize, CellSize)

    context.clearRect(0, 0, context.canvas.width, context.canvas.height)

    context.fillStyle = "black"

    state.windows.forEach((row, rowIdx) =>
        row.forEach((cell, colIdx) =>
            drawEntity(cell, colIdx, rowIdx)
        )
    )

    if (state.reticle) {
        context.drawImage(ReticleImage, state.reticle.x - (CellSize / 2), state.reticle.y - (CellSize / 2), CellSize, CellSize)
    }

    context.font = "20px serif"
    context.fillText(`Score: ${state.score}`, 5, 525)
}
