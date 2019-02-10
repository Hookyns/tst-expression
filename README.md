# Typescript Expression Transformer
[![NPM version](https://img.shields.io/npm/v/typescript-expression-transformer.svg?colorB=green)](https://www.npmjs.com/package/typescript-expression-transformer) 
[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](https://opensource.org/licenses/MIT)

Expression trees for TypeScript similar to C#. This is the TypeScript transformer plugin. Watch /demo for working example.

## Expression Interface
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

## Example
An example demonstrating usage of member expression (PropertyAccessExpression).

### Result usage
```typescript
console.log("Generated id for property:", fieldIdFor<Foo>(m => m.baz.deepProp));
```

Result
```
Generated id for property: bar_deepProp
```

### Source
```typescript
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

## Tip
For work with AST you can use https://astexplorer.net which prints tree nicely. Use the TypeScript AST.