import * as ts from "typescript";

/**
 * Visitor which looks up context variables
 * @param checker
 * @param node
 * @param context
 */
export function getContext(checker: ts.TypeChecker, node: ts.Node, context: ts.TransformationContext): ts.ObjectLiteralExpression
{
    let ignoredVariables: Array<string> = [];
    let includeVariables: { [variableName: string]: ts.Identifier } = {};

    if (ts.isFunctionExpression(node) || ts.isArrowFunction(node))
    {
        for (let parameter of node.parameters)
        {
            if (ts.isIdentifier(parameter.name))
            {
                ignoredVariables.push(parameter.name.escapedText.toString());
            }
            else
            {
                throw new Error("Unexpected type of parameter.");
            }
        }
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
            && ignoredVariables.indexOf(node.escapedText.toString()) == -1)
        {
            includeVariables[node.escapedText.toString()] = node;
        }

        return ts.visitEachChild(node, visit, context);
    };

    ts.visitEachChild(node, visit, context);

    const contextVariablesProperties = [];

    for (let variable of Object.keys(includeVariables))
    {
        contextVariablesProperties.push(ts.factory.createShorthandPropertyAssignment(includeVariables[variable]));
    }

    return ts.factory.createObjectLiteralExpression(contextVariablesProperties);
}