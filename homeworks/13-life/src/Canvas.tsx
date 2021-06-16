import React, { useRef, useEffect } from "react"

export interface CanvasProps {
    draw: (context: CanvasRenderingContext2D, frameCount: number) => void
}

export const Canvas: (props: CanvasProps) => JSX.Element = (props: CanvasProps) => {
    const { draw, ...rest } = props
    const canvasRef = useRef<HTMLCanvasElement>(null)

    useEffect(() => {
        const canvas = canvasRef.current
        if (canvas) {
            const context = canvas.getContext("2d")

            if (context) {
                let frameCount = 0
                let animationFrameId: number

                const render = () => {
                    frameCount++
                    draw(context, frameCount)
                    animationFrameId = window.requestAnimationFrame(render)
                }

                render()

                return () => {
                    window.cancelAnimationFrame(animationFrameId)
                }
            }
        }
    }, [draw])

    return <canvas ref={canvasRef} {...rest}/>
}
