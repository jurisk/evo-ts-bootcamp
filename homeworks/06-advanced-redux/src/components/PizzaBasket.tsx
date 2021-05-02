import * as R from "ramda";
import React from "react";
import {Pizza, PizzaCount, PizzaId} from "../types";
import {PizzaBasketItem} from "./PizzaBasketItem";

interface PizzaBucketProps {
    pizza: Array<Pizza & {count: PizzaCount}>,
    onMinus: (_id: PizzaId) => void;
}

export function PizzaBasket({pizza, onMinus}: PizzaBucketProps) {
    return R.map((p) =>
        <PizzaBasketItem
            _id={p._id}
            onMinus={onMinus}
            key={p._id}
            price={p.price}
            name={p.name}
            count={p.count}
        />, pizza);
}
