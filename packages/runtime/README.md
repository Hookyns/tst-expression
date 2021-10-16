# JavaScript(/TypeScript) Expression<> (tst-expression)
[![NPM version](https://img.shields.io/npm/v/tst-expression.svg?colorB=brightgreen&label=tst-expression)](https://www.npmjs.com/package/typescript-expression)
[![NPM version](https://img.shields.io/npm/v/tst-expression-transformer.svg?colorB=brightgreen&label=tst-expression-transformer)](https://www.npmjs.com/package/typescript-expression-transformer)
[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](https://opensource.org/licenses/MIT)

[![Readme Card](https://github-readme-stats.vercel.app/api/pin/?username=hookyns&repo=tst-expression&theme=tokyonight)](https://github.com/Hookyns/tst-expression)

> Expression trees for TypeScript similar to C#.
>
> Expression trees represent code in a tree-like data structure, where each node is an expression, for example, a method call or a binary operation such as x < y.
>
> You can compile and run code represented by expression trees. This enables dynamic operations over compiled code, with access to the context captured by the code.

## How to Start
* Install transformer package and **ttypescript** `npm i tst-expression-transformer ttypescript -D`,
* install runtime package `npm i tst-expression`,
* update *tsconfig.json* file,
```json5
{
    "compilerOptions": {
        // add tst-expression-transformer plugin
        "plugins": [
            {
                "transform": "tst-expression-transformer"
            }
        ]
    }
}
```
* if You use Webpack, updater webpack config,
```javascript
({
    test: /\.(tsx?)$/,
    loader: "ts-loader",
    options: {
        compiler: "ttypescript"
    }
})
```
* write Your code,
* compile via `npx ttsc`,
* run the code.

## Expression<>
```typescript
type Expression<TType> = {
    /**
     * Compiled executable expression.
     */
    compiled: TType;

    /**
     * Expression tree.
     */
    expression: ExpressionNode;

    /**
     * Captured context variables used in expression.
     */
    context: { [capturedVariableName: string]: any };
}
```

## Usage
You can use `Expression<>` as type of method or function parameters.
Transformer `tst-expression-transformer` handle all calls of those functions and methods
and result is the `Expression` object with AST, compiled expression and captured context used by the expression.

Thanks to runtime package `tst-expression`, You have typing support with set of type guards,
so You can traverse the expression safely.

Simple example, which returns array with name of variable and its value.
```typescript
import { assertIdentifier, assertExpression, Expression } from "tst-expression";

const someVariable = 5;
const entry = getEntry(someVariable);

console.log(entry); // [ 'someVariable', 5 ]

function getEntry(expression: Expression<number>): [name: string, value: number] {
    assertExpression(expression);
    assertIdentifier(expression.expression);

    return [expression.expression.escapedText, expression.compiled];
}
```

## Example
A little more complex example which takes expression of some math operations and logs the operation with its result.

Result of the example is: `someVariable(5) + 5 - PI(3.141592653589793) = 6.858407346410207`

```typescript
import { 
    assertBinaryExpression, assertExpression, Expression, ExpressionKind, ExpressionNode, 
    isBinaryExpression, isNumericLiteral, isIdentifier, isPropertyAccessExpression 
} from "tst-expression";

const someVariable = 5;
logMathOperation(someVariable + 5 - Math.PI);

function logMathOperation(operationExpression: Expression<number>) {
    assertExpression(operationExpression);
    assertBinaryExpression(operationExpression.expression);

    const parts = splitBinaryExpressions(operationExpression.expression);
    let operation = "";

    for (const part of parts) {
        if (typeof (part) == "string") {
            operation += part;
        } else if (isNumericLiteral(part)) {
            operation += part.text;
        } else if (isIdentifier(part)) {
            operation += part.escapedText + `(${operationExpression.context[part.escapedText]})`;
        } else if (isPropertyAccessExpression(part)) {
            if (isIdentifier(part.expression) && isIdentifier(part.name)) {
                operation += part.name.escapedText + `(${operationExpression.context[part.expression.escapedText][part.name.escapedText]})`;
            } else {
                throw new Error("Not implemented.");
            }
        }
    }
    
    console.log(operation, "=", operationExpression.compiled);
}

function splitBinaryExpressions(expression: any): Array<ExpressionNode | string> {
    if (isBinaryExpression(expression)) {
        return [
            ...splitBinaryExpressions(expression.left),
            " " + getOperator(expression.operatorToken) + " ",
            ...splitBinaryExpressions(expression.right)
        ];
    }

    return [expression];
}

function getOperator(operatorToken: ExpressionNode): string {
    return ({
        [ExpressionKind.PlusToken]: "+",
        [ExpressionKind.MinusToken]: "-",
        [ExpressionKind.SlashToken]: "/",
        [ExpressionKind.AsteriskToken]: "*"
    } as { [kind: number]: string })[operatorToken.kind];
}
```

Transpiled code:
```javascript
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tst_expression_1 = require("tst-expression");
const someVariable = 5;
logMathOperation({ compiled: someVariable + 5 - Math.PI, context: { someVariable, Math }, expression: {
        "flags": 0, "kind": 219, "left": { "flags": 0, "kind": 219, "left": { "flags": 0, "kind": 79, "escapedText": "someVariable" }, "operatorToken": { "flags": 0, "kind": 39 }, "right": { "flags": 0, "kind": 8, "text": "5", "numericLiteralFlags": 0 } }, "operatorToken": { "flags": 0, "kind": 40 }, "right": { "flags": 0, "kind": 204, "expression": { "flags": 0, "kind": 79, "escapedText": "Math" }, "name": { "flags": 0, "kind": 79, "escapedText": "PI" } } } });
function logMathOperation(operationExpression) {
    (0, tst_expression_1.assertExpression)(operationExpression);
    (0, tst_expression_1.assertBinaryExpression)(operationExpression.expression);
    const parts = splitBinaryExpressions(operationExpression.expression);
    let operation = "";
    for (const part of parts) {
        if (typeof (part) == "string") {
            operation += part;
        }
        else if ((0, tst_expression_1.isNumericLiteral)(part)) {
            operation += part.text;
        }
        else if ((0, tst_expression_1.isIdentifier)(part)) {
            operation += part.escapedText + `(${operationExpression.context[part.escapedText]})`;
        }
        else if ((0, tst_expression_1.isPropertyAccessExpression)(part)) {
            if ((0, tst_expression_1.isIdentifier)(part.expression) && (0, tst_expression_1.isIdentifier)(part.name)) {
                operation += part.name.escapedText + `(${operationExpression.context[part.expression.escapedText][part.name.escapedText]})`;
            }
            else {
                throw new Error("Not implemented.");
            }
        }
    }
    console.log(operation, "=", operationExpression.compiled);
}
function splitBinaryExpressions(expression) {
    if ((0, tst_expression_1.isBinaryExpression)(expression)) {
        return [
            ...splitBinaryExpressions(expression.left),
            " " + getOperator(expression.operatorToken) + " ",
            ...splitBinaryExpressions(expression.right)
        ];
    }
    return [expression];
}
function getOperator(operatorToken) {
    return {
        [tst_expression_1.ExpressionKind.PlusToken]: "+",
        [tst_expression_1.ExpressionKind.MinusToken]: "-",
        [tst_expression_1.ExpressionKind.SlashToken]: "/",
        [tst_expression_1.ExpressionKind.AsteriskToken]: "*"
    }[operatorToken.kind];
}
```

## Tip
For work with AST you can use https://astexplorer.net which prints tree nicely. Use the TypeScript AST.

## License
This project is licensed under the [MIT license](./LICENSE).