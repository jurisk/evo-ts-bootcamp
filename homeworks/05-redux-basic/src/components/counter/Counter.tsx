import {useDispatch, useSelector} from "react-redux";
import {CounterState} from "../../store/counter/types";
import {selectCount} from "../../store";
import {decrementCounter, incrementCounter} from "../../store/counter/actions";

interface CounterProps {
    state: CounterState,
    increment: () => void,
    decrement: () => void,
}

function CounterF(props: CounterProps) {
    return (<div>
        <h1>Counter: {props.state.count}</h1>
        <button onClick={() => props.decrement()}>-</button>
        <button onClick={() => props.increment()}>+</button>
    </div>)
}

export function Counter() {
    const count = useSelector(selectCount)

    const dispatch = useDispatch()

    const increment = () => dispatch(incrementCounter());
    const decrement = () => dispatch(decrementCounter());

    return (<CounterF state={count} increment={increment} decrement={decrement}/>)
}
