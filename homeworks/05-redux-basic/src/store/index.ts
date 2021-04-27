import {combineReducers, createStore, compose} from "redux"
import {CounterState} from "./counter/types"
import {counterReducer} from "./counter/reducers"
import {balanceReducer} from "./balance/reducers"
import {BalanceState} from "./balance/types"

const rootReducer = combineReducers({
    count: counterReducer,
    balance: balanceReducer,
})

export const selectCount: (state: State) => CounterState = (state: State) => state.count

export interface State {
    count: CounterState;
    balance: BalanceState;
}

declare global {
    interface Window {
        __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
    }
}
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

export const store = createStore(rootReducer, undefined, composeEnhancers())
