import {
    assertArrowFunctionExpression,
    assertExpression,
    Expression,
    ExpressionOnly
} from "tst-expression";

function logExpression(expression: ExpressionOnly<any>)
{
    console.log(expression.expression);
}

function logParameters(expression: Expression<(...args: any[]) => any>)
{
    assertExpression(expression);
    assertArrowFunctionExpression(expression.expression);
    
    logExpression(expression);

    for (let parameter of expression.expression.parameters)
    {
        console.log(parameter.name, parameter.dotDotDotToken);
    }
}

logParameters((x: string, y: number, z: { foo: any }) => z.foo && (x > z.foo || y < z.foo));