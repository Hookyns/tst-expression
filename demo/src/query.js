"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var js_expr_tree_1 = require("js-expr-tree");
class WhereExpression {
    constructor() {
        this.conditions = [];
        this.args = [];
    }
    addExpression(expression) {
        if (expression.kind != js_expr_tree_1.ExpressionKind.ArrowFunction) {
            throw new Error("Expression must be arrow function");
        }
        if (expression.body.kind == js_expr_tree_1.ExpressionKind.Block) {
            throw new Error("Member expression must not have block body");
        }
        if (expression.body.kind == js_expr_tree_1.ExpressionKind.ParenthesizedExpression) {
            expression = expression.expression;
        }
        let groups = this.splitBinaryExpressions(expression.body);
        console.log(groups);
    }
    getSql() {
        return ``;
    }
    splitBinaryExpressions(expression) {
        if (expression.kind == js_expr_tree_1.ExpressionKind.BinaryExpression) {
            return this.splitBinaryExpressions(expression.left)
                .concat(this.getOperator(expression.operatorToken), this.splitBinaryExpressions(expression.right));
        }
        return [expression];
    }
    getOperator(operatorToken) {
        return WhereExpression.operatorMap[operatorToken.kind];
    }
}
WhereExpression.operatorMap = {
    [js_expr_tree_1.ExpressionKind.BarBarToken]: "or",
    [js_expr_tree_1.ExpressionKind.AmpersandAmpersandToken]: "and",
    [js_expr_tree_1.ExpressionKind.EqualsEqualsEqualsToken]: "=",
    [js_expr_tree_1.ExpressionKind.EqualsEqualsToken]: "=",
    [js_expr_tree_1.ExpressionKind.ExclamationEqualsEqualsToken]: "!=",
    [js_expr_tree_1.ExpressionKind.ExclamationEqualsToken]: "!=",
    [js_expr_tree_1.ExpressionKind.GreaterThanEqualsToken]: ">=",
    [js_expr_tree_1.ExpressionKind.LessThanEqualsToken]: "<=",
    [js_expr_tree_1.ExpressionKind.GreaterThanToken]: ">",
    [js_expr_tree_1.ExpressionKind.LessThanToken]: "<"
};
class Query {
    constructor(entityName) {
        this.where = new WhereExpression();
        this.entityName = entityName;
    }
    filter(filterExpression) {
        this.where.addExpression(filterExpression.expression);
        return this;
    }
    getSql() {
        return `SELECT * FROM ${this.entityName} ${this.where.getSql()}`;
    }
}
class Human {
}
const filter = {
    age: 18,
    nameStarts: "R"
};
let sql;
sql = new Query("Human")
    .filter({ compiled: x => x.firstName.startsWith(filter.nameStarts) && x.lastName != "Zuckerberg" || x.age > filter.age, context: { WhereExpression, Query, Human, filter, sql }, expression: { "flags": 128, "kind": 197, "parameters": [{ "flags": 0, "kind": 151, "name": { "flags": 0,
                    "escapedText": "x", "flowNode": { "flags": 1538 } }, "symbol": { "flags": 1, "escapedName": "x", "declarations": [null], "exports": {} } }], "equalsGreaterThanToken": { "flags": 0, "kind": 37 }, "body": { "flags": 0, "kind": 204, "left": { "flags": 0, "kind": 204, "left": { "flags": 0,
                    "kind": 191, "expression": { "flags": 0, "kind": 189, "expression": { "flags": 0, "kind": 189, "expression": { "flags": 0,
                                "escapedText": "x" }, "name": { "flags": 0, "escapedText": "firstName" } }, "name": { "flags": 0, "escapedText": "startsWith" } }, "arguments": [{ "flags": 0, "kind": 189, "expression": { "flags": 0, "escapedText": "filter" }, "name": { "flags": 0, "escapedText": "nameStarts"
                            } }] }, "operatorToken": { "flags": 0, "kind": 54 },
                "right": { "flags": 0, "kind": 204, "left": { "flags": 0, "kind": 189, "expression": { "flags": 0, "escapedText": "x", "flowNode": { "flags": 1568 } }, "name": { "flags": 0, "escapedText": "lastName" } }, "operatorToken": { "flags": 0, "kind": 34 }, "right": { "flags": 0, "kind": 10 } } },
            "operatorToken": { "flags": 0, "kind": 55 }, "right": { "flags": 0, "kind": 204, "left": { "flags": 0, "kind": 189, "expression": { "flags": 0, "escapedText": "x", "flowNode": { "flags": 516, "antecedents": [{ "flags": 576 }, { "flags": 576 }] } }, "name": { "flags": 0, "escapedText": "age" } }, "operatorToken": { "flags": 0, "kind": 30 },
                "right": { "flags": 0,
                    "kind": 189, "expression": { "flags": 0, "escapedText": "filter" }, "name": { "flags": 0,
                        "escapedText": "age" } } } }, "flowNode": { "flags": 528, "antecedent": { "flags": 514 }, "node": { "flags": 0, "kind": 237, "name": { "flags": 0, "escapedText": "filter",
                    "flowNode": { "flags": 514 } }, "initializer": { "flags": 0, "kind": 188, "multiLine": true, "properties": [{ "flags": 0, "kind": 275, "name": { "flags": 0, "escapedText": "age", "flowNode": { "flags": 514 } }, "initializer": { "flags": 0,
                                "kind": 8, "numericLiteralFlags": 0 }, "symbol": { "flags": 4, "escapedName": "age", "declarations": [null] } }, { "flags": 0, "kind": 275,
                            "name": { "flags": 0, "escapedText": "nameStarts", "flowNode": { "flags": 514
                                } },
                            "initializer": { "flags": 0, "kind": 10 }, "symbol": { "flags": 4, "escapedName": "nameStarts", "declarations": [null] } }],
                    "symbol": { "flags": 4096, "escapedName": "__object", "declarations": [null], "members": {}
                    },
                    "jsDocCache": [] }, "symbol": { "flags": 2, "escapedName": "filter", "declarations": [null], "exports": {} } } },
        "symbol": { "flags": 16, "escapedName": "__function",
            "declarations": [null] }, "locals": {}
    } })
    .getSql();
console.log(sql);
//# sourceMappingURL=query.js.map