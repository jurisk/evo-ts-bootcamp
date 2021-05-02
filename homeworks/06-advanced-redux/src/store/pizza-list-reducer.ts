import {PizzaListState, State} from "../types";
import {PizzaListAction, PizzasLoadedAction} from "./actions";
import {Action} from "redux";
import {getPizzas} from "../services/api";
import {ThunkAction, ThunkDispatch } from "redux-thunk";
import { AnyAction } from "redux";
import {RootState} from "./index";

const initialState: PizzaListState = []

export function thunkLoadPizzas(): ThunkAction<void, RootState, unknown, AnyAction> {
    return async function (dispatch: ThunkDispatch<State, void, AnyAction>) {
        const pizzas = await getPizzas()
        dispatch(
            {
                type: "PIZZAS_LOADED",
                pizzas: pizzas,
            }
        )
    }
}

export const pizzaListReducer = (
    state: PizzaListState = initialState,
    action: PizzaListAction | Action,
): PizzaListState => {
    switch (action.type) {
        case "PIZZAS_LOADED":
            return (action as PizzasLoadedAction).pizzas
        default:
            return state
    }
}
