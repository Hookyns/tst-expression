import * as ts                  from "typescript";
import { isExpressionType }     from "./isExpressionType";
import { isExpressionTypeNode } from "./isExpressionTypeNode";
import { visitCallExpression }  from "./visitCallExpression";

export const VisitorFactory = {
	/**
	 * Visitor which convert all call with parameter of Expression<> type to Expression interface format
	 * @param context
	 * @param program
	 */
	create(context: ts.TransformationContext, program: ts.Program): ts.Visitor
	{
		let checker = program.getTypeChecker();

		const visit: ts.Visitor = (node: ts.Node) =>
		{
			const parent = node.parent;

			if (parent !== undefined)
			{
				// Parent node is CallExpression, so current node is some part of CallExpression
				if (ts.isCallExpression(parent))
				{
					const callExpressionResult = visitCallExpression(node, parent, visit, context, checker);

					if (callExpressionResult)
					{
						return callExpressionResult;
					}
				}
				// Parent node is PropertyDeclaration and current node is an initializer
				else if (ts.isPropertyDeclaration(parent) && parent.initializer == node && (
					(parent.type && isExpressionTypeNode(parent.type, checker))
					|| isExpressionType(checker.getTypeAtLocation(node))
				))
				{
					console.info("PropertyDeclaration: Not implemented yet.");
				}
			}

			return ts.visitEachChild(node, visit, context);
		};

		return visit;
	}
}
