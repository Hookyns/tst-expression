import {ExpressionKind} from "js-expr-tree";

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