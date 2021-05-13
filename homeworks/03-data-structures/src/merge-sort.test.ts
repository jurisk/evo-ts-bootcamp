import {mergeSort} from "./merge-sort"

test('mergesort should sort correctly', () => {
    const randomArray = Array(100_000).fill(0).map(() => Math.random())
    const compareFn = (a: number, b: number) => a - b
    const expected = [...randomArray].sort(compareFn)
    const obtained = mergeSort(randomArray, compareFn)

    expect(expected).toEqual(obtained)
})
