# Typescript Expression Transformer
[![NPM version](https://img.shields.io/npm/v/typescript-expression-transformer.svg?colorB=green)](https://www.npmjs.com/package/typescript-expression-transformer) 
[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](https://opensource.org/licenses/MIT)
[![Gitter chat](https://badges.gitter.im/JumboJS/Lobby.svg)](https://gitter.im/typescript-expression-transformer/community)

Expression trees for TypeScript similar to C#. This is the TypeScript transformer plugin. Watch [/demo](https://github.com/Hookyns/expression-transformer/tree/master/demo) folder for working example.

## Expression Type
```typescript
type Expression<TType> = {
	/**
	 * Compiled, executable, expression
	 */
	compiled: TType;

	/**
	 * TypeScript expression tree from compilation
	 */
	expression;

	/**
	 * Variables from calling context, you can access their values
	 */
	context: { [key: string]: any };
};
```
This expression type is declared inside [package](https://www.npmjs.com/package/js-expr-tree) which you need for runtime. It declares the Expression, ExpressionKind enum (taken from TypeScript) and maybe more runtime features in the future.

## Example
An example demonstrating usage of member expression (`PropertyAccessExpression`) used to generate HTML Ids for model's elements.
There is function fieldIdFor() which takes Expression argument. In TypeScript you set some arrow function as an argument (eg. m => m.foo).
In compile time, the transformer looks up all `CallExpression` of method/function declaration with parameter of type Expression<>.
Then it takes the argument, creates the expression tree and replace the original expression with object (implementing interface Expression<>).

### Get Started
Create project folder and run `npm i typescript-expression-transformer --save-dev`

### Source
> src/field-id-for.ts
```typescript
import {ExpressionKind} from "js-expr-tree"; // the runtime package of this transformer; it's a dependency

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
export function fieldIdFor<TModel>(memberExpression: Expression<(m: TModel) => any> | ((m: TModel) => any)) {
	const expr = (memberExpression as any).expression as any;

	if (expr.kind != ExpressionKind.ArrowFunction) {
		throw new Error("Expression must be arrow function");
	}

	if (expr.body.kind == ExpressionKind.Block) {
		throw new Error("Member expression must not have block body");
	}

	if (expr.body.kind != ExpressionKind.PropertyAccessExpression) {
		throw new Error("Invalid member expression.");
	}

	const params = expr.parameters.map(p => p.name.escapedText);
	return getPropertyPath(expr.body, params);
}
```
This module exports the fieldIdFor function which returns the HTML id constructed by member expression tree.

### Result Usage
Create random index file with usage of fieldIdFor function.
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
    "removeComments": true
  },
  "exclude": [
    "node_modules"
  ]
}
```

Create compile script. Tranformer needs ts.Program argument so you must compile it from code. Watch the compiler's implementation.
> compile.js
```javascript
require("typescript-expression-transformer/src/compiler").compile();
```

Run `node compile.js` and index.js will be created.

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