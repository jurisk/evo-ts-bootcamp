import React from "react"
import {SortingState} from "./sorting"

export enum SortStatus {
    Running,
    Paused,
    Finished,
}

interface SortVisualizationProps {
    height: number
    state: SortingState
    status: SortStatus
    newSet: () => void
    start: () => void
    pause: () => void
}

export function SortVisualization(props: SortVisualizationProps) {
    const {height, state, status, newSet, start, pause} = props

    return (
        <main className="app">
            <h1>Bubble sort 🛁</h1>
            <div className="array" style={{height: height + "px"}}>
                {
                    state.array.map((x) => (
                        <div
                            className="element"
                            style={{height: x.value + "px"}}
                            key={x.id}
                            title={`${x.id}, value ${x.value}`}
                        />
                    ))
                }
            </div>
            <div className="buttons">
                <button onClick={newSet}>↻ New set</button>
                {status === SortStatus.Paused ? <button onClick={start}>▶️ Start</button> : null}
                {status === SortStatus.Running ? <button onClick={pause}>⏸️ Pause</button> : null}
                {status === SortStatus.Finished ? <button disabled>✓ Finished</button> : null}
            </div>
        </main>
    )
}
