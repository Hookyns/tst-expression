import * as ts from "typescript";

/**
 * Visitor which looks up context variables
 * @param checker
 * @param node
 */
export function getContext(checker: ts.TypeChecker, node: ts.Node): ts.ObjectLiteralExpression
{
	let ignoredVariables = [];

	if (ts.isFunctionExpression(node) || ts.isArrowFunction(node)) {
		ignoredVariables = ignoredVariables.concat(node.parameters.map(p => (p.name as any).escapedText));
	}

	// This query isn't right mb, but I've not found another way of getting right objects
	const variables = checker.getSymbolsInScope(
		node,
		ts.SymbolFlags.FunctionScopedVariable | ts.SymbolFlags.Class | ts.SymbolFlags.BlockScopedVariable
	)
		.filter(v => (v.flags == ts.SymbolFlags.BlockScopedVariable || v.flags == ts.SymbolFlags.FunctionScopedVariable || v.flags == ts.SymbolFlags.Class)
			&& v.valueDeclaration && (v.valueDeclaration as any).transformFlags != undefined
			&& ignoredVariables.indexOf(v.name) == -1
		);

	const contextVariablesProperties = [];

	for (let variable of variables) {
		contextVariablesProperties.push(ts.createShorthandPropertyAssignment(variable.escapedName.toString()));
	}

	return ts.createObjectLiteral(contextVariablesProperties);
}