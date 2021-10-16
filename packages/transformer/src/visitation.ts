import * as ts               from "typescript";
import { getContext }        from "./context";
import { serializeNodeTree } from "./serialization";

const ExpressionTypeName = "Expression";

/**
 * Check if type is Expression
 * @param type
 */
export function isExpressionType(type: any /*ts.TypeNode*/)
{
    // if (ts.isTypeNode())
    
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

    const visit: ts.Visitor = (node: ts.Node) =>
    {
        const parent = node.parent;

        // Parent node is CallExpression, so current node is some part of CallExpression
        if (parent !== undefined && ts.isCallExpression(parent))
        {
            // We want an expression, which is argument of a CallExpression, so try to find and index.
            // -1 means that current node is not an argument.
            const argIndex = parent.arguments.indexOf(node as ts.Expression);

            // Check it is an argument and ignore node, if it's just an identifier (it can be Expression<> but stored in variable, 
            // so this CallExpression is just passing already processed Expression<>.)
            if (argIndex != -1 && !ts.isIdentifier(node))
            {
                const signature: ts.Signature = checker.getResolvedSignature(parent);
                const declaration = signature.declaration;

                if (ts.isFunctionDeclaration(declaration) || ts.isMethodDeclaration(declaration) || ts.isConstructorDeclaration(declaration))
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
                    if (param.type && (isExpressionType(param.type) || ((param.type as any).types && (param.type as any).types.some((t: ts.TypeNode) => isExpressionType(t)))))
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