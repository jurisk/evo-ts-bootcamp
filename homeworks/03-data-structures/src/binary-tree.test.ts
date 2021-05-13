import {
    BinaryTree,
    BinaryTreeImpl,
} from "./binary-tree"
import {node, TraverseType, TreeNode} from "./tree-common"

const root: TreeNode<string> = node(
    "F",
    node(
        "B",
        node("A", null, null),
        node(
            "D",
            node("C", null, null),
            node("E", null, null),
        ),
    ),
    node(
        "G",
        null,
        node(
            "I",
            node("H", null, null),
            null,
        ),
    ),
)
const tree: BinaryTree<string> = new BinaryTreeImpl(root)

const parse = (s: string): readonly string[] => s.split(", ")

test('binary tree - traverse', () => {
    expect(tree.traverse(TraverseType.Bfs)).toEqual(parse("F, B, G, A, D, I, C, E, H"))
    expect(tree.traverse(TraverseType.DfsPreOrder)).toEqual(parse("F, B, A, D, C, E, G, I, H"))
    expect(tree.traverse(TraverseType.DfsInOrder)).toEqual(parse("A, B, C, D, E, F, G, H, I"))
    expect(tree.traverse(TraverseType.DfsPostOrder)).toEqual(parse("A, C, E, D, B, H, I, G, F"))
})

test('binary tree - getColumn', () => {
    expect(tree.getColumn(-3)).toEqual([])
    expect(tree.getColumn(-2)).toEqual(parse("A"))
    expect(tree.getColumn(-1)).toEqual(parse("B, C"))
    expect(tree.getColumn( 0)).toEqual(parse("F, D"))
    expect(tree.getColumn(+1)).toEqual(parse("E, G, H"))
    expect(tree.getColumn(+2)).toEqual(parse("I"))
    expect(tree.getColumn(+3)).toEqual([])
})

test('binary tree - setTree', () => {
    const tree: BinaryTree<string> = new BinaryTreeImpl(node("A", null, null))
    tree.setTree(node("B", null, null))
    expect(tree.traverse(TraverseType.Bfs)).toEqual(["B"])
})
