import { ExpressionKind } from "./enums";
import { ExpressionNode } from "./nodes";

/**
 * Error thrown from the assert guards.
 */
export class ExpressionAssertError extends Error
{
    constructor(message: string | ExpressionKind, public readonly node: ExpressionNode)
    {
        super(typeof message == "string" ? message : `Invalid expression. ${ExpressionKind[message]} expected. ${ExpressionKind[node.kind]} received.`);
    }
}