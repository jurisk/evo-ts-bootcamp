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
type MergeSort<T> = (array: readonly T[], compareFunction: CompareFunction<T>) => readonly T[]

export const mergeSort = <T>(array: readonly T[], compareFunction: CompareFunction<T>): readonly T[] => {
    /** Ordered merging of two ordered lists */
    function merge(a: readonly T[], b: readonly T[]): readonly T[] {
        if (a.length === 0) {
            return b
        } else if (b.length === 0) {
            return a
        } else {
            const [ah, at] = [a[0], a.slice(1)]
            const [bh, bt] = [b[0], b.slice(1)]
            const comparison = compareFunction(ah, bh)
            return comparison < 0 ? [ah, ...merge(at, b)] : [bh, ...merge(a, bt)]
        }
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
