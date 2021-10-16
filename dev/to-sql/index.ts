import {
    assertArrowFunctionExpression,
    assertExpression,
    Expression,
    ExpressionKind,
    ExpressionNode,
    isBinaryExpression,
    isParenthesizedExpression
} from "tst-expression";

class Person
{
    name: string;
    age: number;
}

const filter = {
    ageLimit: 18,
    nameStarts: "J"
};

console.log(`SELECT * FROM Person WHERE ${toSql<Person>(person => person.age > filter.ageLimit && person.name.startsWith(filter.nameStarts))}`);

function toSql<TEntity>(whereLambda: Expression<(entity: TEntity) => boolean>): string
{
    assertExpression(whereLambda);
    assertArrowFunctionExpression(whereLambda.expression);

    let expression = whereLambda.expression.body;

    if (expression.kind == ExpressionKind.Block)
    {
        throw new Error("Arrow function cannot have block body.");
    }

    // Skip top level parenthesis if exists
    if (isParenthesizedExpression(expression))
    {
        expression = expression.expression;
    }

    const parts = splitBinaryExpressions(expression);
    
    let sqlCondition = "";
    
    for (let part of parts) {
        if (typeof(part) == "string") {
            sqlCondition = sqlCondition + " " + part;
        }
        else 
        {
            // TODO: Implement
        }
    }
    
    return sqlCondition;
}

const operatorMap: { [kind: number]: string } = {
    [ExpressionKind.BarBarToken]: "or",
    [ExpressionKind.AmpersandAmpersandToken]: "and",
    [ExpressionKind.EqualsEqualsEqualsToken]: "=",
    [ExpressionKind.EqualsEqualsToken]: "=",
    [ExpressionKind.ExclamationEqualsEqualsToken]: "!=",
    [ExpressionKind.ExclamationEqualsToken]: "!=",
    [ExpressionKind.GreaterThanEqualsToken]: ">=",
    [ExpressionKind.LessThanEqualsToken]: "<=",
    [ExpressionKind.GreaterThanToken]: ">",
    [ExpressionKind.LessThanToken]: "<",
};

function getOperator(operatorToken: ExpressionNode): string
{
    return operatorMap[operatorToken.kind];
}

function splitBinaryExpressions(expression: any): Array<ExpressionNode | string>
{
    if (isBinaryExpression(expression))
    {
        return [
            ...splitBinaryExpressions(expression.left),
            getOperator(expression.operatorToken), 
            ...splitBinaryExpressions(expression.right)
        ];
    }

    return [expression];
}