import React, {useEffect, useState, useRef} from "react"
import {fromEvent} from "rxjs"

enum Entity {
    Brick,
    Window,
    Cat,
}

type State = {
    windows: readonly Entity[][],
    score: number,
    mouseX: number,
    mouseY: number,
}

function App(): JSX.Element {
    const Width = 10
    const Height = 10

    const randomCat = (board: readonly Entity[][]): readonly Entity[][] => {
        return board // TODO: replace Entity.Cat with Entity.Window, then replace random Entity.Window with Entity.Cat
    }

    const initialState: State = {
        windows: randomCat([
            [Entity.Brick, Entity.Brick, Entity.Brick, Entity.Window, Entity.Brick, Entity.Brick, Entity.Window, Entity.Brick, Entity.Brick, Entity.Brick],
            [Entity.Brick, Entity.Window, Entity.Brick, Entity.Brick, Entity.Brick, Entity.Brick, Entity.Brick, Entity.Brick, Entity.Brick, Entity.Brick],
            [Entity.Brick, Entity.Brick, Entity.Brick, Entity.Brick, Entity.Window, Entity.Brick, Entity.Brick, Entity.Brick, Entity.Brick, Entity.Brick],
            [Entity.Brick, Entity.Brick, Entity.Window, Entity.Brick, Entity.Brick, Entity.Brick, Entity.Window, Entity.Brick, Entity.Brick, Entity.Brick],
            [Entity.Window, Entity.Brick, Entity.Brick, Entity.Brick, Entity.Brick, Entity.Brick, Entity.Brick, Entity.Brick, Entity.Brick, Entity.Brick],
            [Entity.Brick, Entity.Brick, Entity.Brick, Entity.Brick, Entity.Brick, Entity.Window, Entity.Brick, Entity.Brick, Entity.Brick, Entity.Brick],
            [Entity.Brick, Entity.Brick, Entity.Brick, Entity.Brick, Entity.Brick, Entity.Brick, Entity.Brick, Entity.Brick, Entity.Brick, Entity.Brick],
            [Entity.Brick, Entity.Brick, Entity.Brick, Entity.Brick, Entity.Brick, Entity.Brick, Entity.Brick, Entity.Brick, Entity.Brick, Entity.Brick],
            [Entity.Window, Entity.Brick, Entity.Window, Entity.Brick, Entity.Brick, Entity.Brick, Entity.Brick, Entity.Brick, Entity.Brick, Entity.Window],
            [Entity.Brick, Entity.Brick, Entity.Brick, Entity.Brick, Entity.Window, Entity.Brick, Entity.Brick, Entity.Brick, Entity.Brick, Entity.Brick],
        ]),
        score: 0,
        mouseX: 0,
        mouseY: 0,
    }

    let state: State = initialState

    useEffect(() => {
        const canvasSelector = document.querySelector("#game-canvas")

        if (canvasSelector) {
            const mouseMove = fromEvent(canvasSelector, "mousemove")
            const mouseDown = fromEvent(canvasSelector, "mousedown")
            const mouseUp = fromEvent(canvasSelector, "mouseup")

            mouseMove.subscribe((e) => {
                const me = e as MouseEvent
                state = {
                    windows: state.windows,
                    score: state.score,
                    mouseX: me.x,
                    mouseY: me.y,
                }
            })
            mouseDown.subscribe((x) => console.log("mouseDown", x, state))
            mouseUp.subscribe((x) => console.log("mouseUp", x, state))
        }
    }, [])

    function draw(context: CanvasRenderingContext2D): void {
        context.clearRect(0, 0, context.canvas.width, context.canvas.height)
        context.fillStyle = "#A0A0A0"
        context.fillRect(0, 0, context.canvas.width, context.canvas.height)
        context.fillStyle = "red"
        context.fillText(`${new Date()}`, 10, 10)
    }

    const canvasRef = useRef<HTMLCanvasElement>(null)
    useEffect(() => {
        const canvas = canvasRef.current
        let animationFrameId: number | null = null

        const render = () => {
            if (canvas) {
                const context = canvas.getContext("2d")
                if (context) {
                    draw(context)

                }
            }
            animationFrameId = window.requestAnimationFrame(render)
        }
        render()

        return () => {
            if (animationFrameId) {
                window.cancelAnimationFrame(animationFrameId)
            }
        }
    }, [draw])

    return (
        <div>
            <canvas id="game-canvas" ref={canvasRef} width={500} height={500}/>
        </div>
    )
}

export default App
