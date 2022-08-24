import { ExpressionKind }        from "./enums";
import { ExpressionAssertError } from "./errors";
import * as nodes                from "./nodes";
import {
    ExpressionOnly
}                                from "./types";

// noinspection JSUnusedGlobalSymbols
/**
 * Type guard validation that expression is truly expression.
 * @param expression
 */
export function assertExpression(expression: unknown): asserts expression is ExpressionOnly<any>
{
    if (typeof expression != "object"
        || !expression.hasOwnProperty("compiled")
        || !expression.hasOwnProperty("expression")
        || !expression.hasOwnProperty("context")
    )
    {
        throw new Error("Argument is not an expression.");
    }
}

// noinspection JSUnusedGlobalSymbols
/**
 * Type guard validation that expression is IdentifierExpressionNode
 * @param node
 */
export function isIdentifier(node: nodes.ExpressionNode): node is nodes.IdentifierExpressionNode
{
    return node?.kind === ExpressionKind.Identifier;
}

// noinspection JSUnusedGlobalSymbols
/**
 * Type guard validation that expression is IdentifierExpressionNode
 * @param node
 */
export function assertIdentifier(node: nodes.ExpressionNode): asserts node is nodes.IdentifierExpressionNode
{
    if (!isIdentifier(node)) throw new ExpressionAssertError(ExpressionKind.Identifier, node);
}

// noinspection JSUnusedGlobalSymbols
/**
 * Type guard validation that expression is ArrowFunctionExpressionNode
 * @param node
 */
export function isArrowFunctionExpression(node: nodes.ExpressionNode): node is nodes.ArrowFunctionExpressionNode
{
    return node?.kind === ExpressionKind.ArrowFunction;
}

// noinspection JSUnusedGlobalSymbols
/**
 * Type guard validation that expression is ArrowFunctionExpressionNode
 * @param node
 * @throws {ExpressionAssertError}
 */
export function assertArrowFunctionExpression(node: nodes.ExpressionNode): asserts node is nodes.ArrowFunctionExpressionNode
{
    if (!isArrowFunctionExpression(node)) throw new ExpressionAssertError(ExpressionKind.ArrowFunction, node);
}

// noinspection JSUnusedGlobalSymbols
/**
 * Type guard validation that expression is ParameterExpressionNode
 * @param node
 */
export function isParameterExpression(node: nodes.ExpressionNode): node is nodes.ParameterExpressionNode
{
    return node?.kind === ExpressionKind.Parameter;
}

// noinspection JSUnusedGlobalSymbols
/**
 * Type guard validation that expression is ParameterExpressionNode
 * @param node
 */
export function assertParameterExpression(node: nodes.ExpressionNode): asserts node is nodes.ParameterExpressionNode
{
    if (!isParameterExpression(node)) throw new ExpressionAssertError(ExpressionKind.Parameter, node);
}

// noinspection JSUnusedGlobalSymbols
/**
 * Type guard validation that expression is PropertyAccessExpressionNode
 * @param node
 */
export function isPropertyAccessExpression(node: nodes.ExpressionNode): node is nodes.PropertyAccessExpressionNode
{
    return node?.kind === ExpressionKind.PropertyAccessExpression;
}

// noinspection JSUnusedGlobalSymbols
/**
 * Type guard validation that expression is PropertyAccessExpressionNode
 * @param node
 */
export function assertPropertyAccessExpression(node: nodes.ExpressionNode): asserts node is nodes.PropertyAccessExpressionNode
{
    if (!isPropertyAccessExpression(node)) throw new ExpressionAssertError(ExpressionKind.PropertyAccessExpression, node);
}

// noinspection JSUnusedGlobalSymbols
/**
 * Type guard validation that expression is ElementAccessExpressionNode
 * @param node
 */
export function isElementAccessExpression(node: nodes.ExpressionNode): node is nodes.ElementAccessExpressionNode
{
    return node?.kind === ExpressionKind.ElementAccessExpression;
}

// noinspection JSUnusedGlobalSymbols
/**
 * Type guard validation that expression is ElementAccessExpressionNode
 * @param node
 */
export function assertElementAccessExpression(node: nodes.ExpressionNode): asserts node is nodes.ElementAccessExpressionNode
{
    if (!isElementAccessExpression(node)) throw new ExpressionAssertError(ExpressionKind.ElementAccessExpression, node);
}

// noinspection JSUnusedGlobalSymbols
/**
 * Type guard validation that expression is NonNullExpressionNode
 * @param node
 */
export function isNonNullExpression(node: nodes.ExpressionNode): node is nodes.NonNullExpressionNode
{
    return node?.kind === ExpressionKind.NonNullExpression;
}

// noinspection JSUnusedGlobalSymbols
/**
 * Type guard validation that expression is NonNullExpressionNode
 * @param node
 */
export function assertNonNullExpression(node: nodes.ExpressionNode): asserts node is nodes.NonNullExpressionNode
{
    if (!isNonNullExpression(node)) throw new ExpressionAssertError(ExpressionKind.NonNullExpression, node);
}

// noinspection JSUnusedGlobalSymbols
/**
 * Type guard validation that expression is BinaryExpressionNode
 * @param node
 */
export function isBinaryExpression(node: nodes.ExpressionNode): node is nodes.BinaryExpressionNode
{
    return node?.kind === ExpressionKind.BinaryExpression;
}

// noinspection JSUnusedGlobalSymbols
/**
 * Type guard validation that expression is BinaryExpressionNode
 * @param node
 */
export function assertBinaryExpression(node: nodes.ExpressionNode): asserts node is nodes.BinaryExpressionNode
{
    if (!isBinaryExpression(node)) throw new ExpressionAssertError(ExpressionKind.BinaryExpression, node);
}

// noinspection JSUnusedGlobalSymbols
/**
 * Type guard validation that expression is PrefixUnaryExpressionNode
 * @param node
 */
export function isPrefixUnaryExpression(node: nodes.ExpressionNode): node is nodes.PrefixUnaryExpressionNode
{
    return node?.kind === ExpressionKind.PrefixUnaryExpression;
}

// noinspection JSUnusedGlobalSymbols
/**
 * Type guard validation that expression is PrefixUnaryExpressionNode
 * @param node
 */
export function assertPrefixUnaryExpression(node: nodes.ExpressionNode): asserts node is nodes.PrefixUnaryExpressionNode
{
    if (!isPrefixUnaryExpression(node)) throw new ExpressionAssertError(ExpressionKind.PrefixUnaryExpression, node);
}

// noinspection JSUnusedGlobalSymbols
/**
 * Type guard validation that expression is CallExpressionNode
 * @param node
 */
export function isCallExpression(node: nodes.ExpressionNode): node is nodes.CallExpressionNode
{
    return node?.kind === ExpressionKind.CallExpression;
}

// noinspection JSUnusedGlobalSymbols
/**
 * Type guard validation that expression is CallExpressionNode
 * @param node
 */
export function assertCallExpression(node: nodes.ExpressionNode): asserts node is nodes.CallExpressionNode
{
    if (!isCallExpression(node)) throw new ExpressionAssertError(ExpressionKind.CallExpression, node);
}

// noinspection JSUnusedGlobalSymbols
/**
 * Type guard validation that expression is StringLiteralNode
 * @param node
 */
export function isStringLiteral(node: nodes.ExpressionNode): node is nodes.StringLiteralNode
{
    return node?.kind === ExpressionKind.StringLiteral;
}

// noinspection JSUnusedGlobalSymbols
/**
 * Type guard validation that expression is StringLiteralNode
 * @param node
 */
export function assertStringLiteral(node: nodes.ExpressionNode): asserts node is nodes.StringLiteralNode
{
    if (!isStringLiteral(node)) throw new ExpressionAssertError(ExpressionKind.StringLiteral, node);
}

// noinspection JSUnusedGlobalSymbols
/**
 * Type guard validation that expression is NumericLiteralNode
 * @param node
 */
export function isNumericLiteral(node: nodes.ExpressionNode): node is nodes.NumericLiteralNode
{
    return node?.kind === ExpressionKind.NumericLiteral;
}

// noinspection JSUnusedGlobalSymbols
/**
 * Type guard validation that expression is NumericLiteralNode
 * @param node
 */
export function assertNumericLiteral(node: nodes.ExpressionNode): asserts node is nodes.NumericLiteralNode
{
    if (!isNumericLiteral(node)) throw new ExpressionAssertError(ExpressionKind.NumericLiteral, node);
}

// noinspection JSUnusedGlobalSymbols
/**
 * Type guard validation that expression is ParenthesizedExpressionNode
 * @param node
 */
export function isParenthesizedExpression(node: nodes.ExpressionNode): node is nodes.ParenthesizedExpressionNode
{
    return node?.kind === ExpressionKind.ParenthesizedExpression;
}

// noinspection JSUnusedGlobalSymbols
/**
 * Type guard validation that expression is ParenthesizedExpressionNode
 * @param node
 */
export function assertParenthesizedExpression(node: nodes.ExpressionNode): asserts node is nodes.ParenthesizedExpressionNode
{
    if (!isParenthesizedExpression(node)) throw new ExpressionAssertError(ExpressionKind.ParenthesizedExpression, node);
}

// noinspection JSUnusedGlobalSymbols
/**
 * Type guard validation that expression is ObjectLiteralExpressionNode
 * @param node
 */
export function isObjectLiteralExpression(node: nodes.ExpressionNode): node is nodes.ObjectLiteralExpressionNode
{
    return node?.kind === ExpressionKind.ObjectLiteralExpression;
}

// noinspection JSUnusedGlobalSymbols
/**
 * Type guard validation that expression is ObjectLiteralExpressionNode
 * @param node
 */
export function assertObjectLiteralExpression(node: nodes.ExpressionNode): asserts node is nodes.ObjectLiteralExpressionNode
{
    if (!isObjectLiteralExpression(node)) throw new ExpressionAssertError(ExpressionKind.ObjectLiteralExpression, node);
}

// noinspection JSUnusedGlobalSymbols
/**
 * Type guard validation that expression is ArrayLiteralExpression.
 * @param {ExpressionNode} node
 */
export function isArrayLiteralExpression(node: nodes.ExpressionNode): node is nodes.ArrayLiteralExpressionNode {
	return node?.kind === ExpressionKind.ArrayLiteralExpression
}

// noinspection JSUnusedGlobalSymbols
/**
 * Type guard validation that expression is ArrayLiteralExpression
 * @param node
 */
export function assertArrayLiteralExpression(node: nodes.ExpressionNode): asserts node is nodes.ArrayLiteralExpressionNode
{
	if (!isArrayLiteralExpression(node)) throw new ExpressionAssertError(ExpressionKind.ArrayLiteralExpression, node);
}

// noinspection JSUnusedGlobalSymbols
/**
 * Type guard validation that expression is PropertyAssignmentExpressionNode
 * @param node
 */
export function isPropertyAssignmentExpression(node: nodes.ExpressionNode): node is nodes.PropertyAssignmentExpressionNode
{
    return node?.kind === ExpressionKind.PropertyAssignment;
}

// noinspection JSUnusedGlobalSymbols
/**
 * Type guard validation that expression is PropertyAssignmentExpressionNode
 * @param node
 */
export function assertPropertyAssignmentExpression(node: nodes.ExpressionNode): asserts node is nodes.PropertyAssignmentExpressionNode
{
    if (!isPropertyAssignmentExpression(node)) throw new ExpressionAssertError(ExpressionKind.PropertyAssignment, node);
}

// noinspection JSUnusedGlobalSymbols
/**
 * Type guard validation that expression is ShorthandPropertyAssignmentExpressionNode
 * @param node
 */
export function isShorthandPropertyAssignmentExpression(node: nodes.ExpressionNode): node is nodes.ShorthandPropertyAssignmentExpressionNode
{
    return node?.kind === ExpressionKind.ShorthandPropertyAssignment;
}

// noinspection JSUnusedGlobalSymbols
/**
 * Type guard validation that expression is ShorthandPropertyAssignmentExpressionNode
 * @param node
 */
export function assertShorthandPropertyAssignmentExpression(node: nodes.ExpressionNode): asserts node is nodes.ShorthandPropertyAssignmentExpressionNode
{
    if (!isShorthandPropertyAssignmentExpression(node)) throw new ExpressionAssertError(ExpressionKind.ShorthandPropertyAssignment, node);
}

// noinspection JSUnusedGlobalSymbols
/**
 * Type guard validation that expression is SpreadAssignmentExpressionNode
 * @param node
 */
export function isSpreadAssignmentExpression(node: nodes.ExpressionNode): node is nodes.SpreadAssignmentExpressionNode
{
    return node?.kind === ExpressionKind.SpreadAssignment;
}

// noinspection JSUnusedGlobalSymbols
/**
 * Type guard validation that expression is SpreadAssignmentExpressionNode
 * @param node
 */
export function assertSpreadAssignmentExpression(node: nodes.ExpressionNode): asserts node is nodes.SpreadAssignmentExpressionNode
{
    if (!isSpreadAssignmentExpression(node)) throw new ExpressionAssertError(ExpressionKind.SpreadAssignment, node);
}