import { ExpressionNode } from "./nodes";

export const EXPRESSION_ID_PROPERTY_NAME = "__tst_expression__";
export const EXPRESSION_TYPE_NAME = "Expression";

/**
 * Expression Type
 */
export abstract class ExpressionOnly<TType> {
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
    context?: { [capturedVariableName: string]: any };

    /**
     * @private
     */
    private [EXPRESSION_ID_PROPERTY_NAME]: true
}

export type Expression<TType> = TType | ExpressionOnly<TType>;