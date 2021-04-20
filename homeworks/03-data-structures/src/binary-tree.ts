interface TreeNode<T> {
    value: T
    left: TreeNode<T>
    right: TreeNode<T>
}

enum TraverseType {
    DfsInOrder,
    DfsPreOrder,
    DfsPostOrder,
    Bfs,
}

interface BinaryTree<T> {
    constructor(tree: TreeNode<T>): void;
    setTree(value): this;
    traverse(traverseType: TraverseType): T[];
    getColumn(columnOrder: number): T[];
}

interface BinarySearchTree extends BinaryTree<number> {
    has(value: number): boolean;
}

type CompareFunction<T> = (a: T, b: T) => number

export const mergeSort = <T>(array: readonly T[], compareFunction: CompareFunction<T>): readonly T[] => {
    /** Ordered merging of two ordered lists */
    function merge(a: readonly T[], b: readonly T[]): readonly T[] {
        const results = []
        const positions = { a: 0, b: 0 }

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
        const half = Math.ceil(array.length / 2);

        const sortedFirstHalf = mergeSort(array.slice(0, half), compareFunction)
        const sortedSecondHalf = mergeSort(array.slice(half), compareFunction)

        return merge(sortedFirstHalf, sortedSecondHalf)
    }
}
