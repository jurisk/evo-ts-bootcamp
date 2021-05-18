import React, {useEffect, useRef} from "react"
import {animationFrameScheduler, fromEvent, interval} from "rxjs"
import {CellSize, draw} from "./drawing"
import {Entity, State} from "./domain"
import {initialState, moveAnimal} from "./game"

function App(): JSX.Element {
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

    useEffect(() => {
        const canvasSelector = document.querySelector("#game-canvas")

        if (canvasSelector) {
            const mouseMove = fromEvent(canvasSelector, "mousemove")
            const mouseDown = fromEvent(canvasSelector, "mousedown")

            mouseMove.subscribe((e) => {
                const me = e as MouseEvent
                state = {
                    ...state,
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
                    ...state,
                    windows: moveAnimal(state.windows),
                }
            )
        }
    }, [])

    const canvasRef = useRef<HTMLCanvasElement>(null)

    interval(0, animationFrameScheduler)
        .subscribe(() => {
            const canvas = canvasRef.current
            if (canvas) {
                const context = canvas.getContext("2d")
                if (context) {
                    draw(context, state)
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
