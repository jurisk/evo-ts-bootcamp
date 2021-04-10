import {Ord, ord, ordNumber} from "fp-ts/Ord";
import {randomArray} from "./util";

export interface Element {
    value: number
    id: string
}

export interface SortingState {
    array: ReadonlyArray<Element>
    iterationIndex: number
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
        iterationIndex: -1,
    }
}

export const isFinished = (state: SortingState): Boolean =>
    state.iterationIndex >= state.array.length;

const ordering: Ord<Element> = ord.contramap(ordNumber, (x: Element) => x.value)

export function bubbleSortStep(state: SortingState): SortingState {
    const array = state.array.slice();
    const i = state.iterationIndex + 1
    if (i < array.length) {
        for (let j = 0; j < array.length - 1; j++) {

            if (ordering.compare(array[j], array[j + 1]) === 1) {
                let tmp = array[j];
                array[j] = array[j + 1];
                array[j + 1] = tmp;
            }
        }
    }

    return {
        array,
        iterationIndex: i,
    };
}
