import React from "react";
import {Pizza, State} from "../types";
import {getPizzas} from "../services/api";
import * as R from "ramda";
import {thunkLoadPizzas} from "../store/pizza-list-reducer";
import {store} from "../store";
import {ThunkDispatch} from "redux-thunk";
import {AnyAction} from "redux";

const dispatch = store.dispatch as ThunkDispatch<State, {}, AnyAction>

export function useApp() {
    const [pizza, setPizza] =
        React.useState<Pizza[]>([]);
    const [basket, setBasket] =
        React.useState<Pizza[]>([]);

    React.useEffect(() => {
        dispatch(thunkLoadPizzas())

        getPizzas().then(pizzas => { setPizza(pizzas.items) });
    }, []);

    const plusPizzaBucket = React.useCallback((_id: string) => {
        const p = pizza.filter(x => x._id === _id)[0];
        setBasket([...basket, p]);
    }, [pizza, basket]);

    const minusPizzaBucket = React.useCallback((_id: string) => {
        const idx = R.findLastIndex((x: Pizza) => x._id === _id)(basket);
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
            .reduce((acc, p: Pizza) =>
                acc + p.price, 0),
        pizza,
        bucket: validBasket,
        plusPizzaBucket,
        minusPizzaBucket,
    };
}
