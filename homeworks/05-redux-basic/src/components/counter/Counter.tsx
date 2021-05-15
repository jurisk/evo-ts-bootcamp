import React from "react"
import {useDispatch, useSelector} from "react-redux"
import {CounterState} from "../../store/counter/types"
import {selectCount} from "../../store"
import {decrementCounter, incrementCounter} from "../../store/counter/actions"

interface CounterProps {
    readonly state: CounterState,
    readonly increment: () => void,
    readonly decrement: () => void,
}

function CounterPure(props: CounterProps) {
    return (<div>
        <h1>Counter: {props.state.count}</h1>
        <button onClick={() => props.decrement()}>-</button>
        <button onClick={() => props.increment()}>+</button>
    </div>)
}

export function Counter(): JSX.Element {
    const count = useSelector(selectCount)

    const dispatch = useDispatch()

    const increment = () => dispatch(incrementCounter())
    const decrement = () => dispatch(decrementCounter())

    return (<CounterPure state={count} increment={increment} decrement={decrement}/>)
}
