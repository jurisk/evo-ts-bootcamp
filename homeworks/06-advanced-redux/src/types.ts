type Brand<K, T> = K & { __brand: T }

type PizzaName = Brand<string, 'PizzaName'>
type PizzaPrice = Brand<number, 'PizzaPrice'>
export type PizzaId = Brand<string, 'PizzaId'>
type PizzaCount = Brand<number, 'PizzaCount'>

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
