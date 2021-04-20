export interface TreeNode<T> {
    value: T
    left: TreeNode<T> | null
    right: TreeNode<T> | null
}

export enum TraverseType {
    DfsInOrder,
    DfsPreOrder,
    DfsPostOrder,
    Bfs,
}

export const node = <T>(value: T, left: TreeNode<T> | null, right: TreeNode<T> | null): TreeNode<T> =>
    ({ value, left, right })
