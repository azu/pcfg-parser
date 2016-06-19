// LICENSE : MIT
"use strict";
import traverser from "../src/traverser";
import pcfg from "../src/pcfg";
import Rule from "../src/rule";
const rules = [
    "S>名詞句 形容詞 0.5",
    "S>名詞句 名詞 0.3",
    "S>名詞句 動詞 0.2",
    "S>接続詞 名詞 0.2",
    "S>文 文 0.2",
    // http://www5b.biglobe.ne.jp/~shu-sato/nihonbun.htm
    // 文 ＝ （連用句）＋（体言句）＋ 用言句
    "文>連用句 体言句 0.2",
    "文>連用句 用言句 0.2",
    "文>体言句 用言句 0.2",
    /*

     （２） 用言句 ＝ （連用句）＋
     ｛動詞 または
     形容詞 または
     形容動詞 または
     ［名詞句 ＋（助詞）＋ 「だ」等の助動詞］｝
     ＋（助動詞）＋（終助詞）

     */
    "用言句>連用句 動詞 0.2",
    "用言句>連用句 形容詞 0.2",
    "用言句>連用句 名詞句 0.2",
    "用言句>連用句 助詞 0.2",
    "用言句>連用句 助動詞 0.2",
    /*
     体言句 ＝ 名詞句 ＋（格助詞）＋（副助詞）
     */
    "体言句>名詞句 助詞 0.2",
    "体言句>名詞句 助動詞 0.2",
    /*
     名詞句 ＝ （連体句）＋
     ｛名詞 または
     ［文・用言句 ＋（準体助詞）］

     */
    "名詞句>連用句 名詞 0.2",
    "名詞句>連用句 文 0.2",
    /*
     連用句 ＝ ｛副詞 または
     用言句（連用形） または
     ［文・用言句 ＋（接続助詞）］｝
     ＋（副助詞）
     副詞のパターン
     */
    "連用句>副詞 副詞 0.2",
    "連用句>用言句 副詞 0.2",
    "連用句>文 副詞 0.2",

    // その他
    "名詞>形容詞 名詞 1",
    "名詞句>名詞 助詞 1",// ?
    "名詞>名詞 名詞 1",
    "形容詞>名詞 助詞 0.1",
    "形容詞>名詞 動詞 0.2",
    "形容詞>副詞 形容詞 0.4",
    "形容詞>副詞 形容詞 0.3",
    "動詞>副詞 動詞 0.5",
    "動詞>動詞 動詞 0.5",
    "動詞>動詞 助動詞 0.5",
    "動詞>名詞 助動詞 0.5",
    "動詞>名詞 動詞 0.5"
].map((expr) => Rule.fromString(expr));

describe("traverser", function () {
    it("should travers", function () {
        const text = "沖縄の暑い気候に体が適応する";
        return pcfg.parse(text, rules).then(result => {
            traverser(result, {
                enter(node, {depth}){
                    //     console.log(new Array(depth * 4).join(" "), rule.source);
                    //     console.log(new Array(depth * 4).join(" "), rule.token ? rule.token.surface_form : "");
                    //     const parentRule = rule.parent;
                    //     if (parentRule) {
                    //         console.log(new Array(depth * 4).join("-"), "=>" + parentRule.source);
                    //         console.log(new Array(depth * 4).join(" "), parentRule.token ? parentRule.token.surface_form : "")
                    //     }
                    // }
                    if (node.token) {
                        if (!node.parent) {
                            return;
                        }
                        const surface_form = node.token.surface_form;
                        if (surface_form === "適応") {
                            const parentNode = node.parent;
                            const rootNode = parentNode.parent;
                            var indexOf = rootNode.children.indexOf(parentNode);
                            const sibilingNode = rootNode.children[indexOf - 1];
                            console.log(sibilingNode.children[sibilingNode.children.length - 1].token);
                        }
                    }
                }
            })
        })
    });
});