import {animationFrameScheduler, combineLatest, fromEvent, interval, Observable, timer} from "rxjs"
import {CellSize, draw} from "./drawing"
import {Board, ColRow, Coords, Score} from "./domain"
import {hasAnimal, InitialBoard, moveAnimal} from "./game-logic"
import {startWith, map, scan, share} from "rxjs/operators"

function runGame(canvas: HTMLCanvasElement, context: CanvasRenderingContext2D): void {
    const mouseClicks$: Observable<ColRow | null> = fromEvent<MouseEvent>(canvas, "click")
        .pipe(
            map((e) => {
                const col = Math.floor(e.x / CellSize)
                const row = Math.floor(e.y / CellSize)
                return { column: col, row: row } as ColRow
            }),
            startWith(null),
        )

    const mousePositions$: Observable<Coords | null> = fromEvent<MouseEvent>(canvas, "mousemove")
        .pipe(
            map((e) => ({ x: e.x, y: e.y } as Coords)),
            startWith(null),
        )

    // regular moving of animals from one window to the other
    const board$: Observable<Board> = timer(0, 1000)
        .pipe(
            scan((board) => moveAnimal(board), InitialBoard),
            share(),
        )

    // this is actually not needed at the moment and could be removed - but will be useful if we add any
    // time dependent animations
    const frames$: Observable<number> = interval(0, animationFrameScheduler)

    const score$: Observable<Score> = combineLatest([board$, mouseClicks$])
        .pipe(
            map(([board, click]) => click ? (hasAnimal(board, click) ? 1 : 0) : 0),
            scan((acc, v) => acc + v as Score, 0 as Score),
        )

    combineLatest([score$, mousePositions$, board$, frames$])
        .subscribe((e: [Score, null | Coords, Board, number]) => {
            const [score, lastMousePosition, board, _frame] = e

            draw(context, {
                reticle: lastMousePosition,
                score: score,
                windows: board,
            })
        })
}

const canvas = document.querySelector("#game-canvas") as HTMLCanvasElement
if (canvas) {
    const context = canvas.getContext("2d")

    if (context) {
        runGame(canvas, context)
    }
}
