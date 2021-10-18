import * as ts                    from "typescript";
import { createExpressionObject } from "./createExpressionObject";
import { isExpressionType }       from "./isExpressionType";
import { isExpressionTypeNode }   from "./isExpressionTypeNode";

/**
 * Process CallExpression
 * @param {ts.Node} node
 * @param {ts.CallExpression} parent
 * @param {ts.Visitor} visit
 * @param {ts.TransformationContext} context
 * @param {ts.TypeChecker} checker
 * @return {ts.Node | undefined}
 */
export function visitCallExpression(node: ts.Node, parent: ts.CallExpression, visit: ts.Visitor, context: ts.TransformationContext, checker: ts.TypeChecker): ts.Node | undefined
{
    // We want an expression, which is argument of a CallExpression, so try to find and index.
    // -1 means that current node is not an argument.
    const argIndex = parent.arguments.indexOf(node as ts.Expression);

    // Check it is an argument
    if (argIndex != -1)
    {
        // If it is an identifier, ignore it in case that it is identifier of some variable with type Expression<>
        // (so this CallExpression is just passing already processed Expression<>.)
        if (ts.isIdentifier(node) && isExpressionType(checker.getTypeAtLocation(node)))
        {
            return node;
        }

        const signature: ts.Signature = checker.getResolvedSignature(parent);
        const declaration = signature.declaration;

        if (ts.isFunctionLike(declaration))
        {
            let param: ts.ParameterDeclaration = declaration.parameters[argIndex];
            let ignoreThisNode = false;

            if (!param && declaration.parameters.length <= argIndex)
            {
                const lastParam = declaration.parameters[declaration.parameters.length - 1];

                // TODO: Is it a good idea? We don't even know if it is our Expression<> call. We throw on error in not interested code.
                if (!lastParam.dotDotDotToken)
                {
                    throw new Error("Invalid number of arguments.");
                }

                param = lastParam;
            }

            // TODO: Remove casts to any
            const type: ts.TypeNode & ts.UnionOrIntersectionTypeNode = param.type as any;

            if (type && (isExpressionTypeNode(type, checker) || (type.types?.some((t: ts.TypeNode) => isExpressionTypeNode(t, checker)))))
            {
                return createExpressionObject(node, visit, context, checker);
            }
        }
    }

    return undefined;
}