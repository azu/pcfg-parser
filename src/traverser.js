// LICENSE : MIT
"use strict";
export default function traverse({nodeTree, tokens, newRules}, {enter}) {
    const treeLength = nodeTree.length;
    display(nodeTree, tokens, 0, treeLength - 1, "S");
    console.log(JSON.stringify(nodeTree, null, 4));
    function display(tree, tokens, x, y, pos, depth = 0, leafCount = 0, parentRule, parentNode) {
        // top is `currentNode`
        const top = tree[x][y];
        if (top === undefined) {
            return leafCount;
        }
        if (!Array.isArray(top.children)) {
            top.children = [];
        }
        if (parentNode) {
            parentNode.children.push(top);
        }
        top.topPos = pos;
        // 期待値が一番高いものを取り出す
        const rule = top.rule;
        const token = tokens[leafCount];
        if (parentNode && !top.parent) {
            Object.defineProperty(top, "parent", {
                value: parentNode
            });
        }
        // 実際にtokenがある位置にtokenを設定
        if (rule.result1 === "END" && token) {
            Object.defineProperty(top, "token", {
                value: token
            });
        }
        // END
        enter(top, {
            depth
        });
        if (rule.result1 === "END") {
            leafCount++;
        }
        if (rule.result1 !== "END") {
            const leftNode = top.left[rule.toString()];
            leafCount = display(tree, tokens, leftNode.x, leftNode.y, rule.result1, depth + 1, leafCount, rule, top);
        }
        if (rule.result2 !== "END") {
            const rightNode = top.right[rule.toString()];
            leafCount = display(tree, tokens, rightNode.x, rightNode.y, rule.result2, depth + 1, leafCount, rule, top);
        }
        return leafCount;
    }
};