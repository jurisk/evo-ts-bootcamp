import {mergeSort} from "./merge-sort"

/* - Develop the `mergeSort` function. */
test('mergesort should sort', () => {
    const randomArray = Array(100_000).fill(0).map(() => Math.random())
    const compareFn = (a, b) => a - b
    const expected = [...randomArray].sort(compareFn)
    const obtained = mergeSort(randomArray, compareFn)

    expect(expected).toEqual(obtained)
})
