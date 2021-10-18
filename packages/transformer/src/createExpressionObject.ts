import * as ts               from "typescript";
import { getContext }        from "./context";
import { serializeNodeTree } from "./serialization";

/**
 * Create Expression<> object.
 * @param {ts.Node} node
 * @param {(node: ts.Node) => ts.VisitResult<ts.Node>} visit
 * @param {ts.TransformationContext} context
 * @param {ts.TypeChecker} checker
 * @return {ts.ObjectLiteralExpression}
 */
export function createExpressionObject(node: ts.Node, visit: (node: ts.Node) => ts.VisitResult<ts.Node>, context: ts.TransformationContext, checker: ts.TypeChecker)
{
    let serializedTreeExpression = "var a = " + serializeNodeTree(node);
    let treeExpression = ts.createSourceFile("__.ts", serializedTreeExpression, ts.ScriptTarget.ESNext, null, ts.ScriptKind.JS);

    return ts.factory.createObjectLiteralExpression([
        ts.factory.createPropertyAssignment("compiled", ts.visitEachChild(node, visit, context) as any),
        ts.factory.createPropertyAssignment("context", getContext(checker, node, context)),
        ts.factory.createPropertyAssignment("expression", (treeExpression.statements[0] as any).declarationList.declarations[0].initializer)
    ]);
}