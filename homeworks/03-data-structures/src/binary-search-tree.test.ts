import {BinarySearchTree, BinarySearchTreeImpl} from "./binary-search-tree"
import {node, TraverseType, TreeNode} from "./tree-common"

test('binary search tree - has', () => {
    const root: TreeNode<number> = node(
        8,
        node(
            3,
            node(1, null, null),
            node(
                6,
                node(4, null, null),
                node(7, null, null),
            ),
        ),
        node(
            10,
            null,
            node(
                14,
                node(13, null, null),
                null,
            ),
        ),
    )

    const tree: BinarySearchTree = new BinarySearchTreeImpl(root)
    expect(tree.has(13)).toBe(true)
    expect(tree.has(6)).toBe(true)
    expect(tree.has(17)).toBe(false)
    expect(tree.has(-17)).toBe(false)
})

test('binary search tree - setTree, traverse, getColumn', () => {
    const t: BinarySearchTree = new BinarySearchTreeImpl(node(0, null, null))
    expect(t.root().value).toBe(0)
    t.setTree(node(1, null, null))
    expect(t.traverse(TraverseType.Bfs)).toEqual([1])
    expect(t.getColumn(0)).toEqual([1])
})
