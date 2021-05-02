import { Action } from "redux"
import {Pizza, PizzaId} from "../types";

export const viewPizzas = (): PizzasViewedAction => ({
    type: "PIZZAS_VIEWED",
})

interface PizzasViewedAction extends Action {
    type: "PIZZAS_VIEWED",
}

export const pizzasLoaded = (pizzas: Pizza[]): PizzasLoadedAction => ({
    type: "PIZZAS_LOADED",
    pizzas: pizzas,
})

interface PizzasLoadedAction extends Action {
    type: "PIZZAS_LOADED",
    pizzas: Pizza[],
}

export type PizzaListAction = PizzasViewedAction | PizzasLoadedAction

export const removePizzaFromBasket = (id: PizzaId): PizzaRemovedFromBasketAction => ({
    type: "PIZZA_REMOVED_FROM_BASKET",
    id: id,
});

export const addPizzaToBasket = (id: PizzaId): PizzaAddedToBasketAction => ({
    type: "PIZZA_ADDED_TO_BASKET",
    id: id,
});

interface PizzaRemovedFromBasketAction extends Action {
    type: "PIZZA_REMOVED_FROM_BASKET",
    id: PizzaId,
}

interface PizzaAddedToBasketAction extends Action {
    type: "PIZZA_ADDED_TO_BASKET",
    id: PizzaId,
}

export type BasketAction = PizzaRemovedFromBasketAction | PizzaAddedToBasketAction
