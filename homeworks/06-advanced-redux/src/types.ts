type Brand<K, T> = K & { __brand: T }

export type PizzaName = Brand<string, 'PizzaName'>
export type PizzaPrice = Brand<number, 'PizzaPrice'>
export type PizzaId = Brand<string, 'PizzaId'>
export type PizzaCount = Brand<number, 'PizzaCount'>

export type Pizza = {
    name: PizzaName;
    price: PizzaPrice;
    _id: PizzaId;
}

export type PizzaListState = Pizza[]

export type BasketState = ReadonlyArray<Pizza & { count: PizzaCount }>

export type State = {
    pizza: PizzaListState;
    basket: BasketState;
}
