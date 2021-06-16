import React, { useRef, useEffect } from "react"

export interface CanvasProps {
    draw: (context: CanvasRenderingContext2D, frameCount: number) => void
}

export const Canvas: (props: CanvasProps) => JSX.Element = (props: CanvasProps) => {
    const { draw, ...rest } = props
    const canvasRef = useRef<HTMLCanvasElement>(null)

    const resizeCanvasToDisplaySize = (canvas: HTMLCanvasElement) => {
        const { width, height } = canvas.getBoundingClientRect()

        if (canvas.width !== width || canvas.height !== height) {
            canvas.width = width
            canvas.height = height
            return true
        }

        return false
    }

    const resizeCanvas = (canvas: HTMLCanvasElement) => {
        const { width, height } = canvas.getBoundingClientRect()

        if (canvas.width !== width || canvas.height !== height) {
            const { devicePixelRatio : ratio = 1 } = window
            const context = canvas.getContext("2d")
            if (context) {
                canvas.width = width * ratio
                canvas.height = height * ratio
                context.scale(ratio, ratio)
            }

            return true
        }

        return false
    }

    useEffect(() => {
        const canvas = canvasRef.current

        if (canvas) {
            window.addEventListener("resize", () => resizeCanvasToDisplaySize(canvas))

            resizeCanvasToDisplaySize(canvas)
            resizeCanvas(canvas)

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
