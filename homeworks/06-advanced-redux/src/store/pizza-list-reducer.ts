import {PizzaListState, State} from "../types";
import {PizzaListAction, pizzasLoaded} from "./actions";
import {getPizzas} from "../services/api";
import {ThunkAction, ThunkDispatch } from "redux-thunk";
import { AnyAction } from "redux";
import {RootState} from "./index";

const initialState: PizzaListState = []

export function thunkLoadPizzas(): ThunkAction<void, RootState, unknown, AnyAction> {
    return async function (dispatch: ThunkDispatch<State, void, AnyAction>) {
        const pizzas = await getPizzas()
        dispatch(pizzasLoaded(pizzas.items))
    }
}

export const pizzaListReducer = (
    state: PizzaListState = initialState,
    action: PizzaListAction,
): PizzaListState => {
    switch (action.type) {
        case "PIZZAS_LOADED":
            return action.pizzas
        default:
            return state
    }
}
