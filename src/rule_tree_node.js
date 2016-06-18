"use strict";
var RuleTree;
(function (RuleTree) {
    class Node {
        get left() {
            if (this._left == null) {
                this._left = {};
            }
            return this._left;
        }
        set left(value) {
            this._left = value;
        }
        get right() {
            if (this._right == null) {
                this._right = {};
            }
            return this._right;
        }
        set right(value) {
            this._right = value;
        }
        get rules() {
            if (this._rules == null) {
                this._rules = {};
            }
            return this._rules;
        }
        set rules(value) {
            this._rules = value;
        }
    }
    RuleTree.Node = Node;
})(RuleTree || (RuleTree = {}));
module.exports = RuleTree;
//# sourceMappingURL=rule_tree_node.js.map