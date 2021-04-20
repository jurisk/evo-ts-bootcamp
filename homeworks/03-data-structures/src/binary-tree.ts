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
