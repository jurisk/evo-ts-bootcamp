import {mergeSort} from "./binary-tree";

/* - Develop the `mergeSort` function. */
test('mergesort should sort', () => {
    const randomArray = Array(100_000).fill(0).map(() => Math.random())
    const compareFn = (a, b) => a - b
    const expected = [...randomArray].sort(compareFn)
    const obtained = mergeSort(randomArray, compareFn)

    expect(expected).toEqual(obtained);
});

// TODO:
// - Implement `BinaryTree` interface.
// - Develop `BinaryTree` class that implements `BinaryTree` interface.
// - `BinaryTree` class has to be generic and able to define a node value.
// - Implement `BinarySearchTree` interface that extends `BinaryTree` interface.
// - Develop `BinarySearchTree` class that implements `BinarySearchTree` interface
// and extends `BinaryTree` class.
// - `BinarySearchTree` class has to have a numeric node value (not a generic class).
// - Cover all the code with tests (via `jest`). Coverage has to be 100%.
