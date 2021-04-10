import {Ord, ord, ordNumber} from "fp-ts/Ord";
import {randomArray} from "./util";

export interface Element {
    value: number
    id: string
}

export interface SortingState {
    array: ReadonlyArray<Element>
    i: number
    j: number
}

export function newSortingState(count: number, max: number): SortingState {
    const array: ReadonlyArray<Element> = randomArray(count, max)
        .map((x, idx) =>
            ({
                value: x,
                id: `element-${idx}`,
            })
        )

    return {
        array,
        i: 0,
        j: -1,
    }
}

export const isFinished = (state: SortingState): Boolean =>
    state.i >= state.array.length;

const ordering: Ord<Element> = ord.contramap(ordNumber, (x: Element) => x.value)

export function bubbleSortStep(state: SortingState): SortingState {
    const [i, j] = (state.j < state.array.length - 2 - state.i)
        ? [state.i, state.j + 1]
        : [state.i + 1, 0]

    const array = state.array.slice();
    if (i < state.array.length) {
        if (ordering.compare(array[j], array[j + 1]) === 1) {
            let tmp = array[j];
            array[j] = array[j + 1];
            array[j + 1] = tmp;
        }
    }

    return {
        array,
        i: i,
        j: j,
    };
}
