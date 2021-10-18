import {
    EXPRESSION_ID_PROPERTY_NAME,
    EXPRESSION_TYPE_NAME
}              from "tst-expression";
import * as ts from "typescript";

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