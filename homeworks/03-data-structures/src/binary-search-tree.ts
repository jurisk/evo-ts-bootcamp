import {BinaryTree, BinaryTreeImpl} from "./binary-tree"
import {TraverseType, TreeNode} from "./tree-common"

export interface BinarySearchTree extends BinaryTree<number> {
    has(value: number): boolean
}

export class BinarySearchTreeImpl implements BinarySearchTree {
    private binaryTree: BinaryTree<number>

    constructor(tree: TreeNode<number>) {
        this.binaryTree = new BinaryTreeImpl(tree)
    }

    root(): TreeNode<number> {
        return this.binaryTree.root()
    }

    getColumn(columnOrder: number): readonly number[] {
        return this.binaryTree.getColumn(columnOrder)
    }

    has(value: number): boolean {
        function find(node: TreeNode<number>): boolean {
            if (value < node.value) {
                return node.left ? find(node.left) : false
            } else if (value > node.value) {
                return node.right ? find(node.right) : false
            } else { // value === node.value
                return true
            }
        }

        return find(this.binaryTree.root())
    }

    /** @deprecated Mutates the internal state, avoid. */
    setTree(value: TreeNode<number>): this {
        this.binaryTree.setTree(value)
        return this
    }

    traverse(traverseType: TraverseType): readonly number[] {
        return this.binaryTree.traverse(traverseType)
    }
}
