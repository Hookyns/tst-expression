import {
    assertArrowFunctionExpression,
    assertExpression,
    Expression,
    ExpressionOnly
}                       from "tst-expression";
import {
    ImportedClass,
    importedProp
} from "./some-module";

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

const constProp = 1;
let letProp = 2;
const access = { propAccess: 3 };
class Class {
    static staticProp = 4;
}


logParameters(
    (x: string, y: number, z: { foo: any, bar: (baz: string) => { baz: string } }) => 
        z.foo && (x > z.foo || y < z.foo) && y < constProp && y < letProp && y < access.propAccess && y < Class.staticProp
        && y < importedProp && y < ImportedClass.staticProp
        && z.bar("bar").baz
);

class Foo
{
    private static expression: Expression<(x: any) => boolean> = x => !!x;
    private static func = (x: any) => !!x;
}