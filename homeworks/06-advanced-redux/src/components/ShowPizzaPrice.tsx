import React from "react";
import {PizzaPrice} from "../types";

interface ShowPizzaPriceProps {
    price: PizzaPrice;
}

export function ShowPizzaPrice({ price }: ShowPizzaPriceProps) {
    return (
        <p><span className="text-yellow-400 mr-1">$</span>{price}</p>
    );
}
