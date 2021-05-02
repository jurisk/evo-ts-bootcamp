import { Action } from "redux"
import {Pizza, PizzaId} from "../types";

export interface PizzasViewedAction extends Action {
    eventName: "PIZZAS_VIEWED",
}

export interface PizzasLoadedAction extends Action {
    eventName: "PIZZAS_LOADED",
    pizzas: Pizza[],
}

export interface PizzaRemovedFromBasketAction extends Action {
    eventName: "PIZZA_REMOVED_FROM_BASKET",
    id: PizzaId,
}

export interface PizzaAddedToBasketAction extends Action {
    eventName: "PIZZA_ADDED_TO_BASKET",
    id: PizzaId,
}

export interface PizzaSelectedAction extends Action {
    eventName: "PIZZA_SELECTED",
    id: PizzaId,
}

export type PizzaListAction = PizzasViewedAction | PizzasLoadedAction
export type BasketAction = PizzaRemovedFromBasketAction | PizzaAddedToBasketAction | PizzaSelectedAction

export type AppAction = PizzaListAction | BasketAction
