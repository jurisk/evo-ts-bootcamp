import React from "react";
import {ShowPizzaPrice} from "./ShowPizzaPrice";
import {PizzaPrice} from "../types";

interface TotalPriceProps {
    price: PizzaPrice;
}

export function TotalPrice({ price }: TotalPriceProps) {
    return (
        <div className="flex">
            <span>Total price:</span><ShowPizzaPrice price={price} />
        </div>
    );
}
