"use strict";
const Pcfg = require("./pcfg");
const Rule = require("./rule");
var rules = [
    "S>名詞句 形容詞 0.5",
    "S>名詞句 名詞 0.3",
    "S>名詞句 動詞 0.2",
    "S>接続詞 名詞 0.2",
    "S>名詞句 体言句 0.2",

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
    "名詞句>名詞 文 0.2",
    "名詞句>名詞 助詞 0.2",
    "名詞句>連用句 文 0.2",
    "名詞句>連用句 用言句 0.2",

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
    "名詞句>名詞 助詞 1",
    "名詞>名詞 名詞 1",
    "形容詞>名詞 助詞 0.1",
    "形容詞>名詞 動詞 0.2",
    "形容詞>副詞 形容詞 0.4",
    "形容詞>副詞 形容詞 0.3",
    "動詞>副詞 動詞 0.5",
    "動詞>動詞 動詞 0.5",
    "動詞>名詞 助動詞 0.5",
    "動詞>名詞 動詞 0.5"
].map((expr) => Rule.fromString(expr));
var text = "新しいバージョンが検索結果に適応される";
console.log("text=" + text);
rules.forEach((v) => console.log(v.toString(), v.probability));
Pcfg.parse(text, rules, (nodeTree, tokens, newRules) => {
    console.log("### result ###");
    if (!nodeTree) {
        console.log("Cannot parse");
    }
    else {
        var N = nodeTree.length;
        display(nodeTree, tokens, 0, N - 1, "S");
        newRules.forEach((v) => {
            console.log(v.toString(), v.probability);
        });
    }
    console.log("ENd");
});
function display(tree, tokens, x, y, pos, depth = 0, leafCount = 0) {
    var top = tree[x][y];
    if (top === undefined) {
        return leafCount;
    }
    var result = "";
    var rule = top.rules[pos].sort((a, b) => a.probability < b.probability ? -1 : 1)[0];
    if (rule.result1 == "END") {
        result = "--->" + tokens[leafCount].surface_form;
        leafCount++;
    }
    else {
        result = "(" + rule.probability.toString() + ")";
    }
    console.log(new Array(depth * 4).join(" "), rule.source, result);
    if (rule.result1 !== "END") {
        leafCount = display(tree, tokens, top.left[rule.toString()].x, top.left[rule.toString()].y, rule.result1, depth + 1, leafCount);
    }
    if (rule.result2 !== "END") {
        leafCount = display(tree, tokens, top.right[rule.toString()].x, top.right[rule.toString()].y, rule.result2, depth + 1, leafCount);
    }
    return leafCount;
}
//# sourceMappingURL=index.js.map