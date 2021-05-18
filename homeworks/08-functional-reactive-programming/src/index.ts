import {animationFrameScheduler, fromEvent, interval} from "rxjs"
import {CellSize, draw} from "./drawing"
import {Entity, State} from "./domain"
import {initialState, moveAnimal} from "./game-logic"

function handleMouseDown(state: State, x: number, y: number): State {
    const col = Math.floor(x / CellSize)
    const row = Math.floor(y / CellSize)
    return state.windows[row][col] === Entity.Animal ? {
        ...state,
        windows: moveAnimal(state.windows),
        score: state.score + 1,
    } : state
}

let state: State = {
    ...initialState,
    windows: moveAnimal(initialState.windows),
}

const canvasSelector = document.querySelector("#game-canvas") as HTMLCanvasElement

if (canvasSelector) {
    fromEvent(canvasSelector, "mousemove")
        .subscribe((e) => {
            const me = e as MouseEvent
            state = {
                ...state,
                mouseX: me.x,
                mouseY: me.y,
            }
        })

    fromEvent(canvasSelector, "mousedown")
        .subscribe((e) => {
            const me = e as MouseEvent
            state = handleMouseDown(state, me.x, me.y)
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
            if (canvasSelector) {
                const context = canvasSelector.getContext("2d")
                if (context) {
                    draw(context, state)
                }
            }
        })
}

