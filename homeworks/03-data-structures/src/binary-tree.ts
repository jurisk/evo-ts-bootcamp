import {TraverseType, TreeNode} from "./tree-common"

export interface BinaryTree<T> {
    root(): TreeNode<T>
    setTree(value: TreeNode<T>): this
    traverse(traverseType: TraverseType): readonly T[]
    getColumn(columnOrder: number): readonly T[]
}

export class BinaryTreeImpl<T> implements BinaryTree<T> {
    private _root: TreeNode<T>

    constructor(tree: TreeNode<T>) {
        this._root = tree
    }

    getColumn(columnOrder: number): readonly T[] {
        function collect(current: number, node: TreeNode<T> | null): readonly T[] {
            if (node === null) {
                return []
            } else {
                const self = current === columnOrder ? [node.value] : []
                const left = collect(current - 1, node.left)
                const right = collect(current + 1, node.right)
                return [...self, ...left, ...right]
            }
        }

        return collect(0, this.root())
    }

    /** @deprecated Mutates the internal state, avoid. */
    setTree(value: TreeNode<T>): this {
        this._root = value
        return this
    }

    traverse(traverseType: TraverseType): readonly T[] {
        function dfs(node: TreeNode<T> | null): readonly T[] {
            if (node === null) {
                return []
            } else {
                const left = dfs(node.left)
                const right = dfs(node.right)

                switch (traverseType) {
                    case TraverseType.DfsInOrder:   return [...left, node.value, ...right]
                    case TraverseType.DfsPreOrder:  return [node.value, ...left, ...right]
                    case TraverseType.DfsPostOrder: return [...left, ...right, node.value]
                }
            }
        }

        function bfs(queue: TreeNode<T>[], acc: T[]): readonly T[]  {
            if (queue.length === 0) {
                return acc
            } else {
                const [qh, qt] =  [queue[0], queue.slice(1)]
                const qhL = qh.left ? [qh.left] : []
                const qhR = qh.right ? [qh.right] : []
                return bfs([...qt, ...qhL, ...qhR], [...acc, qh.value])
            }
        }

        return traverseType === TraverseType.Bfs ? bfs([this.root()], []) : dfs(this.root())
    }

    root(): TreeNode<T> {
        return this._root
    }
}
