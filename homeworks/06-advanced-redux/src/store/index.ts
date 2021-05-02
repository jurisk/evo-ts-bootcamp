import {applyMiddleware, createStore, combineReducers, AnyAction} from 'redux'
import {State} from "../types";
import thunk from 'redux-thunk'
import {pizzaListReducer} from "./pizza-list-reducer";
import {basketReducer} from "./basket-reducer";
import {remoteLogging, localLogging} from "../services/analytics";

const rootReducer = combineReducers<State, AnyAction>({
    pizza: pizzaListReducer,
    basket: basketReducer,
})

export const store = createStore(
    rootReducer,
    applyMiddleware(thunk, localLogging, remoteLogging)
)

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
