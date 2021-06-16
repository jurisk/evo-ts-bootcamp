import React from "react"
import "./App.css"
import {Canvas} from "./Canvas"

function App(): JSX.Element {
    const draw = (ctx: CanvasRenderingContext2D, frameCount: number) => {
        ctx.fillStyle = "#a0a0a0"
        ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height)
        ctx.fillStyle = "#000000"
        ctx.beginPath()
        ctx.arc(ctx.canvas.width / 2, ctx.canvas.height / 2, 20 * Math.sin(frameCount * 0.05) ** 2, 0, 2 * Math.PI)
        ctx.fill()
    }

    return <Canvas draw={draw}/>
}

export default App
