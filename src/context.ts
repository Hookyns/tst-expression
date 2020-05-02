import * as ts from "typescript";

/**
 * Visitor which looks up context variables
 * @param checker
 * @param node
 * @param context
 */
export function getContext(checker: ts.TypeChecker, node: ts.Node, context: ts.TransformationContext): ts.ObjectLiteralExpression
{
	let ignoredVariables = [];
	let includeVariables = [];

	if (ts.isFunctionExpression(node) || ts.isArrowFunction(node))
	{
		ignoredVariables = ignoredVariables.concat(node.parameters.map(p => (p.name as any).escapedText));
	}

	// Visitor looking for necessary variables declared out of expression
	const visit: ts.Visitor = (node) =>
	{
		const parent = node.parent;

		if (ts.isIdentifier(node) 
			// it's last expression in PropertyAccess tree
			&& (!ts.isPropertyAccessExpression(parent) || parent.expression == node)
			// it's property assignment value, not property name
			&& (!ts.isPropertyAssignment(parent) || parent.initializer == node)
			// ignore function parameters
			&& ignoredVariables.indexOf(node.escapedText) == -1)
		{
			includeVariables.push(node.escapedText);
		}

		return ts.visitEachChild(node, visit, context);
	};

	ts.visitEachChild(node, visit, context);

	const contextVariablesProperties = [];

	for (let variable of includeVariables)
	{
		contextVariablesProperties.push(ts.createShorthandPropertyAssignment(variable));
	}

	return ts.createObjectLiteral(contextVariablesProperties);
}