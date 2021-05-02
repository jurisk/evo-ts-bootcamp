import {applyMiddleware, createStore, combineReducers} from 'redux'
import {State} from "../types";
import thunk from 'redux-thunk'
import {pizzaListReducer} from "./pizza-list-reducer";
import {basketReducer} from "./basket-reducer";
import {AppAction} from "./actions";

const rootReducer = combineReducers<State, AppAction>({
    pizza: pizzaListReducer,
    basket: basketReducer,
})

export const store = createStore(
    rootReducer,
    applyMiddleware(thunk)
)

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
