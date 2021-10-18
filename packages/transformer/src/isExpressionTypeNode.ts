import * as ts              from "typescript";
import { isExpressionType } from "./isExpressionType";

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