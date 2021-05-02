import React from "react";
import { PizzaItem } from "./PizzaItem";
import * as R from "ramda";
import {PizzaId, PizzaName, PizzaPrice} from "../types";

interface PizzaListProps {
    pizza: {
        _id: PizzaId;
        name: PizzaName;
        price: PizzaPrice;
    }[];
    onAdd: (_id: PizzaId) => void;
}

export function PizzaList({ pizza, onAdd }: PizzaListProps) {
    return R.map((p) =>
        <PizzaItem
            key={p._id}
            _id={p._id}
            name={p.name}
            price={p.price}
            onAdd={onAdd}
        />, pizza);
}
