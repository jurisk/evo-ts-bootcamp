import {BasketState} from "../types";
import {BasketAction} from "./actions";
import {Action} from "redux";

const initialState: BasketState = []

export const basketReducer = (
    state: BasketState = initialState,
    action: BasketAction | Action,
): BasketState => {
    console.log("TODO - handle", action)
    return state
}
