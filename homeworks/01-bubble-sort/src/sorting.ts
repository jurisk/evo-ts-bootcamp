import {Ord} from "fp-ts/Ord";

export function bubbleSort<T>(input: ReadonlyArray<T>, O: Ord<T>): T[] {
    const array = input.slice();

    for (let i = 0; i < array.length; i++) {
        for (let j = 0; j < array.length - 1; j++) {

            if (O.compare(array[j], array[j + 1]) === 1) {
                let tmp = array[j];
                array[j] = array[j + 1];
                array[j + 1] = tmp;
            }
        }
    }

    return array;
}
