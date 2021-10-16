import {
    assertBinaryExpression,
    assertExpression,
    Expression,
    ExpressionKind,
    ExpressionNode,
    isBinaryExpression,
    isNumericLiteral,
    isIdentifier,
    isPropertyAccessExpression,
    assertIdentifier
} from "tst-expression";

const someVariable = 5;
const entry = getEntry(someVariable);

console.log(entry);

function getEntry(expression: Expression<number>): [name: string, value: number] {
    assertExpression(expression);
    assertIdentifier(expression.expression);

    return [expression.expression.escapedText, expression.compiled];
}


logMathOperation(someVariable + 5 - Math.PI);

function logMathOperation(operationExpression: Expression<number>) {
    assertExpression(operationExpression);
    assertBinaryExpression(operationExpression.expression);

    const parts = splitBinaryExpressions(operationExpression.expression);
    let operation = "";

    for (const part of parts) {
        if (typeof (part) == "string") {
            operation += part;
        } else if (isNumericLiteral(part)) {
            operation += part.text;
        } else if (isIdentifier(part)) {
            operation += part.escapedText + `(${operationExpression.context[part.escapedText]})`;
        } else if (isPropertyAccessExpression(part)) {
            if (isIdentifier(part.expression) && isIdentifier(part.name)) {
                operation += part.name.escapedText + `(${operationExpression.context[part.expression.escapedText][part.name.escapedText]})`;
            } else {
                throw new Error("Not implemented.");
            }
        }
    }

    console.log(operation, "=", operationExpression.compiled);
}

function splitBinaryExpressions(expression: any): Array<ExpressionNode | string> {
    if (isBinaryExpression(expression)) {
        return [
            ...splitBinaryExpressions(expression.left),
            " " + getOperator(expression.operatorToken) + " ",
            ...splitBinaryExpressions(expression.right)
        ];
    }

    return [expression];
}

function getOperator(operatorToken: ExpressionNode): string {
    return ({
        [ExpressionKind.PlusToken]: "+",
        [ExpressionKind.MinusToken]: "-",
        [ExpressionKind.SlashToken]: "/",
        [ExpressionKind.AsteriskToken]: "*"
    } as { [kind: number]: string })[operatorToken.kind];
}