"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var js_expr_tree_1 = require("js-expr-tree");
function getPropertyPath(node, ignoredProperties = [], path = "") {
    if (!node) {
        return "";
    }
    let prefix = getPropertyPath(node.expression, ignoredProperties, path);
    return (prefix ? (prefix + "_") : "") + (node.name ? node.name.escapedText : "");
}
function fieldIdFor(memberExpression) {
    const expr = memberExpression.expression;
    if (expr.kind != js_expr_tree_1.ExpressionKind.ArrowFunction) {
        throw new Error("Expression must be arrow function");
    }
    if (expr.body.kind == js_expr_tree_1.ExpressionKind.Block) {
        throw new Error("Member expression must not have block body");
    }
    if (expr.body.kind != js_expr_tree_1.ExpressionKind.PropertyAccessExpression) {
        throw new Error("Invalid member expression.");
    }
    const params = expr.parameters.map(p => p.name.escapedText);
    return getPropertyPath(expr.body, params);
}
exports.fieldIdFor = fieldIdFor;
