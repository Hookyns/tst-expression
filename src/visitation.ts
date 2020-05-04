import * as ts             from "typescript";
import {getContext}        from "./context";
import {serializeNodeTree} from "./serialization";

const ExpressionTypeName = "Expression";

/**
 * Check if type is Expression
 * @param type
 */
export function isExpressionType(type)
{
	return type && type.typeName && type.typeName.escapedText === ExpressionTypeName;
}

/**
 * Visitor which convert all call with parameter of Expression<> type to Expression interface format
 * @param context
 * @param program
 */
export function getVisitor(context: ts.TransformationContext, program: ts.Program): ts.Visitor
{
	let checker = program.getTypeChecker();

	const visit: ts.Visitor = (node) =>
	{
		const parent = node.parent;

		if (parent !== undefined)
		{
			let index;
			if (ts.isCallExpression(parent) && parent.arguments.length !== 0
				&& (index = parent.arguments.indexOf(node as any)) != -1 
				// skip if it's just identifier -> it can be just Expression<> reference
				&& node.kind != ts.SyntaxKind.Identifier)
			{
				const signature = checker.getResolvedSignature(parent);
				const declaration = signature.declaration as ts.FunctionDeclaration | ts.MethodDeclaration;

				if (!!declaration)
				{
					const param = declaration.parameters[index] as any;

					if (isExpressionType(param.type) || (param.type && param.type.types && param.type.types.some(t => isExpressionType(t))))
					{
						let serializedTreeExpression = "var a = " + serializeNodeTree(node, parent);
						let treeExpression = ts.createSourceFile("__.ts", serializedTreeExpression, ts.ScriptTarget.ESNext, null, ts.ScriptKind.JS);

						return ts.createObjectLiteral([
							ts.createPropertyAssignment("compiled", ts.visitEachChild(node, visit, context) as any),
							ts.createPropertyAssignment("context", getContext(checker, node, context)),
							ts.createPropertyAssignment("expression", (treeExpression.statements[0] as any).declarationList.declarations[0].initializer)
						]);
					}
				}
			}
		}

		return ts.visitEachChild(node, visit, context);
	};

	return visit;
}