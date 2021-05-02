import React from "react";
import {PizzaCount} from "../types";

interface ShowPizzaCountProps {
    count: PizzaCount
}

export function ShowPizzaCount({ count }: ShowPizzaCountProps) {
    return  (
        <p><span className="text-yellow-400 mr-1">x</span>{count}</p>
    );
}
