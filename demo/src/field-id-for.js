"use strict";
exports.__esModule = true;
var js_expr_tree_1 = require("js-expr-tree");
/**
 * Construct path from member expression
 * @param node
 * @param ignoredProperties
 * @param path
 */
function getPropertyPath(node, ignoredProperties, path) {
    if (ignoredProperties === void 0) { ignoredProperties = []; }
    if (path === void 0) { path = ""; }
    if (!node) {
        return "";
    }
    var prefix = getPropertyPath(node.expression, ignoredProperties, path);
    return (prefix ? (prefix + "_") : "") + (node.name ? node.name.escapedText : "");
}
/**
 * Generate html id for model's property member expression
 * @param memberExpression
 */
function fieldIdFor(memberExpression) {
    var expr = memberExpression.expression;
    if (expr.kind != js_expr_tree_1.ExpressionKind.ArrowFunction) {
        throw new Error("Expression must be arrow function");
    }
    if (expr.body.kind == js_expr_tree_1.ExpressionKind.Block) {
        throw new Error("Member expression must not have block body");
    }
    if (expr.body.kind != js_expr_tree_1.ExpressionKind.PropertyAccessExpression) {
        throw new Error("Invalid member expression.");
    }
    var params = expr.parameters.map(function (p) { return p.name.escapedText; });
    return getPropertyPath(expr.body, params);
}
exports.fieldIdFor = fieldIdFor;
