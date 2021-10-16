import {
    ExpressionKind,
    NodeFlags
}                         from "./enums";

export interface ExpressionNode {
    kind: ExpressionKind;
    flags: NodeFlags;
    // decorators?: Array<Decorator>;
    // modifiers?: ModifiersArray;
}

/**
 * Expression node of ArrowFunction
 */
export interface ArrowFunctionExpressionNode extends ExpressionNode {
	body: ExpressionNode;
	parameters: Array<ParameterExpressionNode>;
}

/**
 * Expression node of function parameter
 */
export interface ParameterExpressionNode extends ExpressionNode {
	name: IdentifierExpressionNode;
	dotDotDotToken: undefined | ExpressionNode;
}

/**
 * Expression node of identifier
 */
export interface IdentifierExpressionNode extends ExpressionNode {
	escapedText: string;
}

/**
 * Expression node of property access
 */
export interface PropertyAccessExpressionNode extends ExpressionNode {
	expression: PropertyAccessExpressionNode | IdentifierExpressionNode | NonNullExpressionNode | ElementAccessExpressionNode;
	name: IdentifierExpressionNode;
	questionDotToken?: ExpressionNode;
}

/**
 * Expression node of element access
 */
export interface ElementAccessExpressionNode extends ExpressionNode {
	expression: PropertyAccessExpressionNode | IdentifierExpressionNode | NonNullExpressionNode | ElementAccessExpressionNode;
	argumentExpression: ExpressionNode;
	questionDotToken?: ExpressionNode;
}

/**
 * Expression node of binary expression
 */
export interface BinaryExpressionNode extends ExpressionNode {
	left: ExpressionNode;
	right: ExpressionNode;
	operatorToken: ExpressionNode;
}

/**
 * Expression node of prefix unary expression
 */
export interface PrefixUnaryExpressionNode extends ExpressionNode {
	operator: ExpressionKind;
	operand: ExpressionNode;
}

/**
 * Expression node of call expression
 */
export interface CallExpressionNode extends ExpressionNode {
	expression: ExpressionNode;
	questionDotToken?: ExpressionNode;
	arguments: Array<ExpressionNode>;
}

/**
 * Expression node of string literal
 */
export interface StringLiteralNode extends ExpressionNode {
	text: string;
}

/**
 * Expression node of numeric literal
 */
export interface NumericLiteralNode extends ExpressionNode {
	text: string;
}

/**
 * Expression node of non-null expression "!."
 */
export interface NonNullExpressionNode extends ExpressionNode {
	expression: ExpressionNode;
}

/**
 * Expression node of parenthesis
 */
export interface ParenthesizedExpressionNode extends ExpressionNode {
	expression: ExpressionNode;
}

/**
 * Expression node of spread assignment
 */
export interface ObjectLiteralExpressionNode extends ExpressionNode {
	properties: Array<SpreadAssignmentExpressionNode | PropertyAssignmentExpressionNode | ShorthandPropertyAssignmentExpressionNode>;
}

/**
 * Expression node of spread assignment
 */
export interface SpreadAssignmentExpressionNode extends ExpressionNode {
	expression: ExpressionNode;
}

/**
 * Expression node of property assignment
 */
export interface PropertyAssignmentExpressionNode extends ExpressionNode {
	initializer: ExpressionNode;
	name: ExpressionNode;
	questionToken: ExpressionNode;
	exclamationToken: ExpressionNode;
}

/**
 * Expression node of shorthand property assignment
 */
export interface ShorthandPropertyAssignmentExpressionNode extends ExpressionNode {
	name: ExpressionNode;
}