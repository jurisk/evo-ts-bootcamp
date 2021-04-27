import {combineReducers, createStore} from "redux";
import {counterReducer} from "./counter/reducers";
import {CounterState} from "./counter/types";

const reducer = combineReducers({
    count: counterReducer
});

export const selectCount: (state: State) => CounterState = (state: State) => state.count;

interface State {
    count: CounterState;
}

export const store = createStore(reducer);
