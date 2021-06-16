import React from "react"
import "./App.css"
import {Canvas} from "./Canvas"

function App(): JSX.Element {
    const draw = (ctx: CanvasRenderingContext2D, frameCount: number) => {
        const width = ctx.canvas.clientWidth
        const height = ctx.canvas.clientHeight

        ctx.fillStyle = "#e0e0e0"
        ctx.fillRect(0, 0, width, height)
        ctx.fillStyle = "#000000"
        ctx.beginPath()
        ctx.arc(width / 2, height / 2, Math.min(width, height) * 0.5 * Math.sin(frameCount * 0.05) ** 2, 0, 2 * Math.PI)
        ctx.fill()
    }

    return <Canvas draw={draw}/>
}

export default App
