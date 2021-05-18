import {animationFrameScheduler, fromEvent, interval} from "rxjs"
import {CellSize, draw} from "./drawing"
import {State} from "./domain"
import {clickOn, initialState, moveAnimal} from "./game-logic"

let state: State = {
    ...initialState,
    windows: moveAnimal(initialState.windows),
}

function runGame(canvas: HTMLCanvasElement, context: CanvasRenderingContext2D): void {
    fromEvent<MouseEvent>(canvas, "mousemove")
        .subscribe((e) => {
            state = {
                ...state,
                mouseX: e.x,
                mouseY: e.y,
            }
        })

    fromEvent<MouseEvent>(canvas, "click")
        .subscribe((e) => {
            function handleMouseDown(state: State, x: number, y: number): State {
                const col = Math.floor(x / CellSize)
                const row = Math.floor(y / CellSize)
                return clickOn(state, col, row)
            }

            state = handleMouseDown(state, e.x, e.y)
        })

    // regular moving of animals from one window to the other
    interval(2000).subscribe(() =>
        state = {
            ...state,
            windows: moveAnimal(state.windows),
        }
    )

    interval(0, animationFrameScheduler)
        .subscribe(() => {
            draw(context, state)
        })
}

const canvas = document.querySelector("#game-canvas") as HTMLCanvasElement
if (canvas) {
    const context = canvas.getContext("2d")

    if (context) {
        runGame(canvas, context)
    }
}
