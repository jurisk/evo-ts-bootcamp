type CompareFunction<T> = (a: T, b: T) => number

export const mergeSort = <T>(array: readonly T[], compareFunction: CompareFunction<T>): readonly T[] => {
    function merge(a: readonly T[], b: readonly T[]): readonly T[] {
        const results = []
        const positions = { a: 0, b: 0 }

        // A more elegant recursive solution was overflowing the call stack
        while (positions.a < a.length || positions.b < b.length) {
            if (positions.a >= a.length) {
                results.push(b[positions.b])
                positions.b = positions.b + 1
            } else if (compareFunction(a[positions.a], b[positions.b]) > 0) {
                results.push(b[positions.b])
                positions.b = positions.b + 1
            } else {
                results.push(a[positions.a])
                positions.a = positions.a + 1
            }
        }

        return results
    }

    if (array.length <= 1) {
        return array
    } else {
        const half = Math.ceil(array.length / 2)

        const sortedFirstHalf = mergeSort(array.slice(0, half), compareFunction)
        const sortedSecondHalf = mergeSort(array.slice(half), compareFunction)

        return merge(sortedFirstHalf, sortedSecondHalf)
    }
}
