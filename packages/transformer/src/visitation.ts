import { EXPRESSION_ID_PROPERTY_NAME, EXPRESSION_TYPE_NAME } from "tst-expression";
import * as ts                         from "typescript";
import { getContext }                  from "./context";
import { serializeNodeTree }           from "./serialization";

/**
 * Check if type is Expression<>
 * @param typeNode
 * @param checker
 */
export function isExpressionTypeNode(typeNode: ts.TypeNode, checker: ts.TypeChecker)
{
    if (ts.isTypeReferenceNode(typeNode))
    {
        return isExpressionType(checker.getTypeFromTypeNode(typeNode));
    }

    return false;
}

/**
 * Check if type is Expression<>
 * @param type
 */
export function isExpressionType(type: ts.Type)
{
    return (type.symbol?.name === EXPRESSION_TYPE_NAME || type.aliasSymbol?.name === EXPRESSION_TYPE_NAME)
        && (type as ts.UnionType)
            .types[1]
            .getProperties()
            .some(prop => prop.name == EXPRESSION_ID_PROPERTY_NAME);
}

/**
 * Visitor which convert all call with parameter of Expression<> type to Expression interface format
 * @param context
 * @param program
 */
export function getVisitor(context: ts.TransformationContext, program: ts.Program): ts.Visitor
{
    let checker = program.getTypeChecker();

    const visit: ts.Visitor = (node: ts.Node) =>
    {
        const parent = node.parent;

        // Parent node is CallExpression, so current node is some part of CallExpression
        if (parent !== undefined && ts.isCallExpression(parent))
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
                    if (param.type && (
                        isExpressionTypeNode(param.type, checker)
                        || ((param.type as any).types && (param.type as any).types.some((t: ts.TypeNode) => isExpressionTypeNode(t, checker)))
                    ))
                    {
                        let serializedTreeExpression = "var a = " + serializeNodeTree(node, parent);
                        let treeExpression = ts.createSourceFile("__.ts", serializedTreeExpression, ts.ScriptTarget.ESNext, null, ts.ScriptKind.JS);

                        return ts.factory.createObjectLiteralExpression([
                            ts.factory.createPropertyAssignment("compiled", ts.visitEachChild(node, visit, context) as any),
                            ts.factory.createPropertyAssignment("context", getContext(checker, node, context)),
                            ts.factory.createPropertyAssignment("expression", (treeExpression.statements[0] as any).declarationList.declarations[0].initializer)
                        ]);
                    }
                }
            }
        }

        return ts.visitEachChild(node, visit, context);
    };

    return visit;
}
