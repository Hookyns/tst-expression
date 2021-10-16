/**
 * Expression Type
 */
import { ExpressionNode } from "./nodes";

export const EXPRESSION_ID_PROPERTY_NAME = "__tst_expression__";

export type ExpressionOnly<TType> = {
    /**
     * Compiled executable expression.
     */
    compiled?: TType;

    /**
     * Expression tree.
     */
    expression?: ExpressionNode;

    /**
     * Captured context variables used in expression.
     */
    context?: { [key: string]: any };
};

export type Expression<TType> = TType | ExpressionOnly<TType>
// {
//     /**
//      * Compiled executable expression.
//      */
//     compiled?: TType;
//
//     /**
//      * Expression tree.
//      */
//     expression?: ExpressionNode;
//
//     /**
//      * Captured context variables used in expression.
//      */
//     context?: { [key: string]: any };
//
//     /**
//      * Property to identify Expression type
//      * @private
//      */
//     [EXPRESSION_ID_PROPERTY_NAME]: true;
// };