# JavaScript(/TypeScript) Expression<> (tst-expression)
[![NPM version](https://img.shields.io/npm/v/tst-expression.svg?colorB=green)](https://www.npmjs.com/package/typescript-expression) 
[![NPM version](https://img.shields.io/npm/v/tst-expression-transformer.svg?colorB=green)](https://www.npmjs.com/package/typescript-expression-transformer) 
[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](https://opensource.org/licenses/MIT)

## Expression Type
```typescript
type Expression<TType> = {
    /**
     * Compiled executable expression.
     */
    compiled?: TType;

    /**
     * Expression tree.
     */
    expression?: ExpressionNode;

    /**
     * Captured context variables used in expression.
     */
    context?: { [capturedVariableName: string]: any };
}
```

## Tip
For work with AST you can use https://astexplorer.net which prints tree nicely. Use the TypeScript AST.

## License
This project is licensed under the [MIT license](./LICENSE).