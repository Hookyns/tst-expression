# Typescript Expression<> Transformer (tst-expression-transformer)
[![NPM version](https://img.shields.io/npm/v/tst-expression-transformer.svg?colorB=green)](https://www.npmjs.com/package/typescript-expression-transformer) 
[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](https://opensource.org/licenses/MIT)

Expression trees for TypeScript similar to C#. This is the TypeScript transformer plugin. 

## Expression Type
```typescript
type Expression<TType> = TType &
	{
		/**
		 * Compiled, executable, expression
		 */
		compiled?: TType;

		/**
		 * TypeScript expression tree
		 */
		expression?: ExpressionNode;

		/**
		 * Context variables
		 */
		context?: { [key: string]: any };
	};
```
This expression type is declared inside [package](https://www.npmjs.com/package/tst-expression) which you need for runtime. It declares the Expression, ExpressionKind enum (taken from TypeScript) and maybe more runtime features in the future.

## Example
An example demonstrating usage of member expression (`PropertyAccessExpression`) used to generate HTML Ids for model's elements.
There is function fieldIdFor() which takes Expression argument. In TypeScript you set some arrow function as an argument (eg. m => m.foo).
In transpile time, the transformer looks up all `CallExpression` of method/function declaration with parameter of type Expression<>.
Then it takes the argument, creates the expression tree and replace the original expression with object (representing type Expression<>).

### Get Started
Create project folder and run `npm i typescript-expression-transformer ttypescript -D && npm i js-expr-tree`

### Source
> src/field-id-for.ts
```typescript
import {ExpressionKind} from "tst-expression"; // the runtime package of this transformer; it's a dependency

/**
 * Construct path from member expression
 * @param node
 * @param ignoredProperties
 * @param path
 */
function getPropertyPath(node, ignoredProperties: Array<string> = [], path: string = "") {
	if (!node) {
		return "";
	}

	let prefix = getPropertyPath(node.expression, ignoredProperties, path);
	return (prefix ? (prefix + "_") : "") + (node.name ? node.name.escapedText : "");
}

/**
 * Generate html id for model's property member expression
 * @param memberExpression
 */
export function fieldIdFor<TModel>(memberExpression: Expression<(m: TModel) => any>) {
	const expr = memberExpression.expression as ArrowFunctionExpressionNode;

	if (expr.kind != ExpressionKind.ArrowFunction) {
		throw new Error("Expression must be arrow function");
	}

	if (expr.body.kind != ExpressionKind.PropertyAccessExpression) {
		throw new Error("Arrow function body must be member expression without block body.");
	}

	const params = expr.parameters.map(p => p.name.escapedText);
	
	return getPropertyPath(expr.body, params);
}
```
This module exports the fieldIdFor function which returns the HTML id constructed by member expression tree.

### Result Usage
Create random ts file with usage of fieldIdFor function.
> index.ts
```typescript
import {fieldIdFor} from "./src/field-id-for"

class Human {
	public name: string;
	public baz: { deepProp: string };
}

console.log("Generated id for property:", fieldIdFor<Human>(m => m.baz.deepProp));
```

Create typescript config file.
> tsconfig.json
```json
{
  "compilerOptions": {
    "module": "commonjs",
    "target": "esnext",
    "plugins": [
      {
        "transform": "tst-expression-transformer"
      }
    ]
  }
}
```

Using `ttypescript` package, you can transpile source by running `npx ttsc`. index.js will be created.

#### Transpiled Code
> index.js
```javascript
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var field_id_for_1 = require("./field-id-for");
class Human {
}
console.log("Generated id for property:", field_id_for_1.fieldIdFor({ compiled: m => m.baz.deepProp, context: { Human }, expression: { "flags": 128, "kind": 197, "parameters": [{ "flags": 0, "kind": 151, "name": { "flags": 0, "escapedText": "m", "flowNode": { "flags": 2 } }, "symbol": { "flags": 1, "escapedName": "m", "declarations": [null], "exports": {} } }], "equalsGreaterThanToken": { "flags": 0, "kind": 37 }, "body": { "flags": 0, "kind": 189, "expression": { "flags": 0, "kind": 189, "expression": { "flags": 0, "escapedText": "m" }, "name": { "flags": 0, "escapedText": "baz" } }, "name": { "flags": 0, "escapedText": "deepProp" } }, "flowNode": { "flags": 2 }, "symbol": { "flags": 16, "escapedName": "__function", "declarations": [null] }, "locals": {} } }));
```

Run `node index.js` and you'll see the result.

#### Result
```
Generated id for property: baz_deepProp
```

## Tip
For work with AST you can use https://astexplorer.net which prints tree nicely. Use the TypeScript AST.