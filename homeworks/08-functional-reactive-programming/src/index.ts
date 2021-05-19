import {animationFrameScheduler, combineLatest, fromEvent, identity, interval, timer} from "rxjs"
import {CellSize, draw} from "./drawing"
import {Coords, State} from "./domain"
import {clickOn, initialState, moveAnimal} from "./game-logic"
import {startWith, map} from "rxjs/operators"

let state: State = {
    ...initialState,
    windows: moveAnimal(initialState.windows),
}

function runGame(canvas: HTMLCanvasElement, context: CanvasRenderingContext2D): void {
    const mouseClicks$ = fromEvent<MouseEvent>(canvas, "click")
        .pipe(
            startWith(null),
            map(identity)
        )

    const mousePositions$ = fromEvent<MouseEvent>(canvas, "mousemove")
        .pipe(
            startWith(null),
            map(identity)
        )
        .pipe(
            map((e) =>
                e ? { x: e.x, y: e.y } : null
            )
        )

    const ticks$ = timer(0, 2000)
    const frames$ = interval(0, animationFrameScheduler)

    combineLatest([mouseClicks$, mousePositions$, ticks$, frames$]).subscribe((e: [null | MouseEvent, null | Coords, number, number]) => {
        const [lastMouseClick, lastMousePosition, tick, frame] = e

        draw(context, {
            reticle: lastMousePosition,
            score: tick, // TODO - score
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
        function handleMouseDown(state: State, x: number, y: number): State {
            const col = Math.floor(x / CellSize)
            const row = Math.floor(y / CellSize)
            return clickOn(state, col, row)
        }

        if (e) {
            state = handleMouseDown(state, e.x, e.y)
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
