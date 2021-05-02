import React from "react";
import {Pizza, PizzaId, PizzaPrice, State} from "../types";
import {getPizzas} from "../services/api";
import * as R from "ramda";
import {thunkLoadPizzas} from "../store/pizza-list-reducer";
import {store} from "../store";
import {ThunkDispatch} from "redux-thunk";
import {AnyAction} from "redux";
import {addPizzaToBasket, removePizzaFromBasket, viewPizzas} from "../store/actions";

const dispatch = store.dispatch as ThunkDispatch<State, {}, AnyAction>

export function useApp() {
    const [pizza, setPizza] =
        React.useState<Pizza[]>([]);
    const [basket, setBasket] =
        React.useState<Pizza[]>([]);

    React.useEffect(() => {
        dispatch(viewPizzas())
        dispatch(thunkLoadPizzas())
        // TODO:    Normally I would use the pizza list from Redux state in the rest of the application,
        //          but I did not implement this.

        getPizzas().then(pizzas => { setPizza(pizzas.items) });
    }, []);

    const plusPizzaBucket = React.useCallback((id: PizzaId) => {
        dispatch(addPizzaToBasket(id))

        const p = pizza.filter(x => x._id === id)[0];
        setBasket([...basket, p]);
    }, [pizza, basket]);

    const minusPizzaBucket = React.useCallback((id: PizzaId) => {
        dispatch(removePizzaFromBasket(id))

        const idx = R.findLastIndex((x: Pizza) => x._id === id)(basket);
        if (idx !== -1) {
            setBasket(R.remove(idx, 1, basket));
        }
    }, [basket]);

    const validBasket = R.compose(
        R.values,
        R.mapObjIndexed((value: Pizza[]) => {
            return value.reduce((acc, p) => {
                return {
                    ...p,
                    price: acc.price + p.price,
                    count: acc.count + 1,
                };
            }, { count: 0, price: 0 });
        }),
        R.groupBy((x: Pizza) => x._id),
    )(basket);

    return {
        totalPrice: validBasket
            .reduce((acc, p: Pizza) => acc + p.price, 0) as PizzaPrice,
        pizza,
        bucket: validBasket,
        plusPizzaBucket,
        minusPizzaBucket,
    };
}
