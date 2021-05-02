import React from "react";
import {PizzaName} from "../types";

interface ShowPizzaNameProps {
    name: PizzaName;
}

export function ShowPizzaName({ name }: ShowPizzaNameProps) {
   return (
       <div className="block mt-1 text-lg leading-tight font-medium text-black">{name}</div>
   );
}
