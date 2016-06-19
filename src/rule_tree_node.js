"use strict";
var RuleTree;
(function (RuleTree) {
    class Node {
        get topPos() {
            return this._pos;
        }

        set topPos(pos) {
            this._pos = pos;
        }

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

        get rule() {
            return this.rules[this.topPos].sort((a, b) => {
                return a.probability < b.probability ? -1 : 1
            })[0];
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

        toJSON() {
            const object = {};
            if (this.token) {
                object.token = this.token
            }
            if (this.topPos) {
                object.rule = this.rule;
            }
            if (this.children) {
                object.children = this.children;
            }
            return object
        }

        toString() {
            return `<token:${this.token}
                    rule${this.rule}
                    chilren:${this.children}>`
        }
    }
    RuleTree.Node = Node;
})(RuleTree || (RuleTree = {}));
module.exports = RuleTree;
//# sourceMappingURL=rule_tree_node.js.map