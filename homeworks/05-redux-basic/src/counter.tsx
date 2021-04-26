import {createStore} from "redux"
import {useDispatch, useSelector} from "react-redux";

interface IncrementAction {
    type: 'INCREMENT'
}

interface DecrementAction {
    type: 'DECREMENT'
}

type CounterAction = IncrementAction | DecrementAction
type CounterState = number

function counter(state: CounterState = 0, action: CounterAction) {
    switch (action.type) {
        case 'INCREMENT':
            return state + 1
        case 'DECREMENT':
            return state - 1
        default:
            return state
    }
}

export const store = createStore(counter)

interface CounterProps {
    state: CounterState,
    increment: () => void,
    decrement: () => void,
}

function CounterF(props: CounterProps) {
    return (<div>
        <button onClick={() => props.decrement()}>-</button>
        <span>{props.state}</span>
        <button onClick={() => props.increment()}>+</button>
    </div>)
}

const selectCount = (state: CounterState) => state;

export function Counter() {
    const count = useSelector(selectCount)
    const dispatch = useDispatch()

    function increment() {
        dispatch({ type: 'INCREMENT' })
    }

    function decrement() {
        dispatch({ type: 'DECREMENT' })
    }

    return (<CounterF state={count} increment={increment} decrement={decrement}/>)
}
