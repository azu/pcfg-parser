/**
 * Created by laco on 14/12/26.
 */
"use strict";
class PcfgNode {
    get inside() {
        if (this._inside == null) {
            this._inside = {};
        }
        return this._inside;
    }
    set inside(value) {
        this._inside = value;
    }
    get outside() {
        if (this._outside == null) {
            this._outside = {};
        }
        return this._outside;
    }
    set outside(value) {
        this._outside = value;
    }
}
module.exports = PcfgNode;
//# sourceMappingURL=pcfg_node.js.map