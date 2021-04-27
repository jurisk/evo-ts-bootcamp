type Reducer<S, A> = (state: S | undefined, action: A) => S
type ReducerMap<S, A> = {
    [K in keyof S]: Reducer<S[K], A>
}

export const combineReducers = <S, A>(
    reducers: ReducerMap<S, A>
): Reducer<S, A> =>
        (previousState: S | undefined, action: A) => {
            const invokeOne = (acc: S, name: keyof S): S => {
                const reducer = reducers[name]
                acc[name] = reducer(previousState ? previousState[name] : undefined, action)
                return acc
            }

            return (Object.keys(reducers) as Array<keyof S>).reduce(invokeOne, {} as S)
        }
