import {animationFrameScheduler, combineLatest, fromEvent, interval, timer} from "rxjs"
import {CellSize, draw} from "./drawing"
import {ColRow, Coords, Score, State} from "./domain"
import {clickOn, initialState, moveAnimal} from "./game-logic"
import {startWith, map} from "rxjs/operators"

let state: State = {
    ...initialState,
    windows: moveAnimal(initialState.windows),
}

function runGame(canvas: HTMLCanvasElement, context: CanvasRenderingContext2D): void {
    const mouseClicks$ = fromEvent<MouseEvent>(canvas, "click")
        .pipe(
            map((e) => {
                const col = Math.floor(e.x / CellSize)
                const row = Math.floor(e.y / CellSize)
                return { column: col, row: row } as ColRow
            }),
            startWith(null),
        )

    const mousePositions$ = fromEvent<MouseEvent>(canvas, "mousemove")
        .pipe(
            map((e) => ({ x: e.x, y: e.y } as Coords)),
            startWith(null),
        )

    const ticks$ = timer(0, 2000)
    const frames$ = interval(0, animationFrameScheduler)

    combineLatest([mouseClicks$, mousePositions$, ticks$, frames$]).subscribe((e: [null | ColRow, null | Coords, number, number]) => {
        const [lastMouseClick, lastMousePosition, tick, frame] = e

        draw(context, {
            reticle: lastMousePosition,
            score: tick as Score, // TODO - score
            windows: [],
        })
    })

    mousePositions$.subscribe((e) => {
        if (e) {
            state = {
                ...state,
                reticle: e,
            }
        }
    })

    ticks$.subscribe(() =>
        state = {
            ...state,
            // regular moving of animals from one window to the other
            windows: moveAnimal(state.windows),
        }
    )

    mouseClicks$.subscribe((e) => {
        if (e) {
            state = clickOn(state, e)
        }
    })

    frames$
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
