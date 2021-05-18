import React, {useEffect, useRef} from "react"
import {animationFrameScheduler, fromEvent, interval} from "rxjs"
import {AnimalSvg, BricksSvg, WindowSvg, ReticleSvg} from "./assets"

function loadSvg(x: string): HTMLImageElement {
    const prefix = "data:image/svg+xml;base64,"
    const result = new Image()
    result.src = prefix + btoa(x)
    return result
}

const BricksImage = loadSvg(BricksSvg)
const AnimalImage = loadSvg(AnimalSvg)
const WindowImage = loadSvg(WindowSvg)
const ReticleImage = loadSvg(ReticleSvg)

enum Entity {
    Bricks,
    Window,
    Animal,
}

type State = {
    windows: readonly Entity[][],
    score: number,
    mouseX: number,
    mouseY: number,
}

function App(): JSX.Element {
    const moveAnimal = (board: readonly Entity[][]): readonly Entity[][] => {
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

    const initialState: State = {
        windows: moveAnimal([
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
        ]),
        score: 0,
        mouseX: 0,
        mouseY: 0,
    }

    const CellSize = 50

    function handleMouseDown(state: State, x: number, y: number): State {
        const col = Math.floor(x / CellSize)
        const row = Math.floor(y / CellSize)
        return state.windows[row][col] === Entity.Animal ? {
            windows: moveAnimal(state.windows),
            score: state.score + 1,
            mouseX: state.mouseX,
            mouseY: state.mouseY,
        } : state
    }

    let state: State = initialState

    useEffect(() => {
        const canvasSelector = document.querySelector("#game-canvas")

        if (canvasSelector) {
            const mouseMove = fromEvent(canvasSelector, "mousemove")
            const mouseDown = fromEvent(canvasSelector, "mousedown")

            mouseMove.subscribe((e) => {
                const me = e as MouseEvent
                state = {
                    windows: state.windows,
                    score: state.score,
                    mouseX: me.x,
                    mouseY: me.y,
                }
            })

            mouseDown.subscribe((e) => {
                const me = e as MouseEvent
                state = handleMouseDown(state, me.x, me.y)
            })

            // regular moving of animals from one window to the other
            interval(2000).subscribe(() =>
                state = {
                    windows: moveAnimal(state.windows),
                    score: state.score,
                    mouseX: state.mouseX,
                    mouseY: state.mouseY,
                }
            )
        }
    }, [])

    function draw(context: CanvasRenderingContext2D): void {
        function drawEntity(image: HTMLImageElement, colIdx: number, rowIdx: number): void {
            context.drawImage(image, colIdx * CellSize, rowIdx * CellSize, CellSize, CellSize)
        }

        context.clearRect(0, 0, context.canvas.width, context.canvas.height)

        context.fillStyle = "black"

        state.windows.forEach((row, rowIdx) =>
            row.forEach((cell, colIdx) => {
                switch (cell) {
                case Entity.Bricks:
                    drawEntity(BricksImage, colIdx, rowIdx)
                    break
                case Entity.Window:
                    drawEntity(WindowImage, colIdx, rowIdx)
                    break
                case Entity.Animal:
                    drawEntity(AnimalImage, colIdx, rowIdx)
                    break
                }
            })
        )

        context.drawImage(ReticleImage, state.mouseX - (CellSize / 2), state.mouseY - (CellSize / 2), CellSize, CellSize)

        context.fillStyle = "black"
        context.font = "20px serif"
        context.fillText(`Score: ${state.score}`, 5, 525)
    }

    const canvasRef = useRef<HTMLCanvasElement>(null)

    interval(0, animationFrameScheduler)
        .subscribe(() => {
            const canvas = canvasRef.current
            if (canvas) {
                const context = canvas.getContext("2d")
                if (context) {
                    draw(context)
                }
            }
        })

    return (
        <div>
            <canvas id="game-canvas" ref={canvasRef} width={500} height={550} style={{cursor: "none"}}/>
        </div>
    )
}

export default App
