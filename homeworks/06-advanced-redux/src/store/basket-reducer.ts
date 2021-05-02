import {BasketState} from "../types";
import {BasketAction} from "./actions";
import {Action} from "redux";

const initialState: BasketState = []

export const basketReducer = (
    state: BasketState = initialState,
    _action: BasketAction | Action,
): BasketState => {
    // TODO:    I would normally refactor the application to have the basket state here in Redux,
    //          but I did not think it was a requirement for the homework so I did not do it.
    return state
}
