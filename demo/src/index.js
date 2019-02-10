"use strict";
exports.__esModule = true;
var field_id_for_1 = require("./field-id-for");
// Some module scope variable
var someGlobalVar = 10;
// Some module scope class
var Foo = /** @class */ (function () {
    function Foo() {
        // field
        this.baz = {
            deepProp: "baz"
        };
    }
    // const
    Foo.Bar = "BAZ";
    return Foo;
}());
function printThisExpression(expr /* any or | ((m) => boolean) to be more strict; otherwise method-call will emit type mismatch error */) {
    console.log("Compiled expression:", expr.compiled.toString());
    console.log("Calling context:", expr.context);
}
(function (filter) {
    var localVar = false;
    printThisExpression({ compiled: function (m) { return m.foo >= someGlobalVar || !!localVar && Foo.Bar === "BAZ" && m.a == filter.a; }, context: { filter: filter, localVar: localVar, someGlobalVar: someGlobalVar, Foo: Foo }, expression: { "flags": 128, "kind": 197, "parameters": 
            // Some module scope variable
            [// Some module scope variable
                {
                    "flags": 0, "kind": 151, "name": { "flags": 0, "escapedText": "m"
                        // Some module scope class
                        ,
                        // Some module scope class
                        "flowNode": { "flags": 1538 } }, "symbol": { "flags" // const
                        : 1, "escapedName": "m", "declarations": [null], "exports": {} } }],
            "equalsGreaterThanToken": { "flags": 0,
                "kind": 37
            },
            "body": { "flags": 0, "kind": 204, "left": { "flags": 0, "kind": 204, "left": { "flags": 0, "kind": 189, "expression": { "flags": 0, "escapedText": "m" }, "name": { "flags": 0, "escapedText": "foo" } }, "operatorToken": { "flags": 0, "kind": 32 }, "right": { "flags": 0, "escapedText": "someGlobalVar" } }, "operatorToken": { "flags": 0, "kind": 55 }, "right": { "flags": 0, "kind": 204, "left": { "flags": 0, "kind": 204, "left": { "flags": 0, "kind": 202, "operator": 52, "operand": { "flags": 0, "kind": 202, "operator": 52,
                                "operand": { "flags": 0, "escapedText": "localVar" } } },
                        "operatorToken": { "flags": 0, "kind": 54 }, "right": { "flags": 0, "kind": 204, "left": { "flags": 0, "kind": 189, "expression": { "flags": 0,
                                    "escapedText": "Foo", "flowNode": { "flags": 1568 } }, "name": { "flags": 0, "escapedText": "Bar" } }, "operatorToken": { "flags": 0, "kind": 35 }, "right": { "flags": 0, "kind": 10 } } }, "operatorToken": { "flags": 0, "kind": 54 }, "right": { "flags": 0, "kind": 204, "left": { "flags": 0, "kind": 189, "expression": { "flags": 0, "escapedText": "m", "flowNode": { "flags": 1568 } }, "name": { "flags": 0, "escapedText": "a" } }, "operatorToken": { "flags": 0, "kind": 33 }, "right": { "flags": 0, "kind": 189, "expression": { "flags": 0, "escapedText": "filter" }, "name": { "flags": 0, "escapedText": "a" } } } } }, "flowNode": { "flags": 528, "antecedent": { "flags": 528, "antecedent": { "flags": 514 }, "node": { "flags": 0, "kind": 237, "name": { "flags": 0, "escapedText": "someGlobalVar", "flowNode": { "flags": 514 } }, "initializer": { "flags": 0, "kind": 8, "numericLiteralFlags": 0 }, "symbol": { "flags": 2, "escapedName": "someGlobalVar", "declarations": [null], "exports": {} } } }, "node": { "flags": 0, "kind": 237, "name": { "flags": 0, "escapedText": "localVar" }, "initializer": { "flags": 0, "kind": 87 }, "symbol": { "flags": 2, "escapedName": "localVar", "declarations": [null], "exports": {} } } }, "symbol": { "flags": 16, "escapedName": "__function", "declarations": [null] }, "locals": {}, "nextContainer": { "flags": 128, "kind": 197, "parameters": [{ "flags": 0, "kind": 151, "name": { "flags": 0, "escapedText": "m", "flowNode": { "flags": 2 } }, "symbol": { "flags": 1, "escapedName": "m", "declarations": [null], "exports": {} } }], "equalsGreaterThanToken": { "flags": 0, "kind": 37 }, "body": { "flags": 0, "kind": 189, "expression": { "flags": 0, "kind": 189, "expression": { "flags": 0, "escapedText": "m" }, "name": { "flags": 0, "escapedText": "baz" } }, "name": { "flags": 0, "escapedText": "deepProp" } }, "symbol": { "flags": 16, "escapedName": "__function", "declarations": [null] }, "locals": {}, "nextContainer": { "flags": 128, "kind": 197, "parameters": [{ "flags": 0, "kind": 151, "name": { "flags": 0, "escapedText": "m", "flowNode": { "flags": 2 } }, "symbol": { "flags": 1, "escapedName": "m", "declarations": [null], "exports": {} } }], "equalsGreaterThanToken": { "flags": 0, "kind": 37 }, "body": { "flags": 0, "kind": 189, "expression": { "flags": 0, "escapedText": "m" }, "name": { "flags": 0, "escapedText": "baz" } }, "symbol": { "flags": 16, "escapedName": "__function", "declarations": [null] }, "locals": {} } } } });
    console.log("------------------------------");
    console.log("Baz Id:", field_id_for_1.fieldIdFor({ compiled: function (m) { return m.baz.deepProp; }, context: { filter: filter, localVar: localVar, someGlobalVar: someGlobalVar, Foo: Foo }, expression: { "flags": 128, "kind": 197, "parameters": 
            // Some module scope variable
            [// Some module scope variable
                {
                    "flags": 0, "kind": 151, "name": { "flags": 0, "escapedText": "m"
                        // Some module scope class
                        ,
                        // Some module scope class
                        "flowNode": { "flags": 2 } }, "symbol": { "flags": 
                        // const
                        1 // const
                        ,
                        "escapedName": "m", "declarations": [null], "exports": // field
                        { // field
                        } } }], "equalsGreaterThanToken": { "flags": 0, "kind": 37
            },
            "body": { "flags": 0, "kind": 189, "expression": { "flags": 0, "kind": 189, "expression": { "flags": 0, "escapedText": "m" }, "name": { "flags": 0, "escapedText": "baz" } }, "name": { "flags": 0, "escapedText": "deepProp" } }, "flowNode": { "flags": 528, "antecedent": { "flags": 528,
                    "antecedent": { "flags": 514 }, "node": { "flags": 0, "kind": 237, "name": { "flags": 0, "escapedText": "someGlobalVar", "flowNode": { "flags": 514 } }, "initializer": { "flags": 0, "kind": 8, "numericLiteralFlags": 0 }, "symbol": { "flags": 2, "escapedName": "someGlobalVar", "declarations": [null], "exports": {} } } }, "node": { "flags": 0, "kind": 237, "name": { "flags": 0, "escapedText": "localVar" }, "initializer": { "flags": 0,
                        "kind": 87 }, "symbol": { "flags": 2, "escapedName": "localVar", "declarations": [null], "exports": {} } } }, "symbol": { "flags": 16, "escapedName": "__function", "declarations": [null] }, "locals": {}, "nextContainer": { "flags": 128, "kind": 197, "parameters": [{ "flags": 0, "kind": 151, "name": { "flags": 0, "escapedText": "m", "flowNode": { "flags": 2 } }, "symbol": { "flags": 1, "escapedName": "m", "declarations": [null], "exports": {} } }], "equalsGreaterThanToken": { "flags": 0, "kind": 37 }, "body": { "flags": 0, "kind": 189, "expression": { "flags": 0, "escapedText": "m" }, "name": { "flags": 0, "escapedText": "baz" } }, "symbol": { "flags": 16, "escapedName": "__function", "declarations": [null] }, "locals": {} } } }));
    console.log("Baz Id:", field_id_for_1.fieldIdFor({ compiled: function (m) { return m.baz; }, context: { filter: filter, localVar: localVar, someGlobalVar: someGlobalVar, Foo: Foo }, expression: { "flags": 128, "kind": 197, "parameters": 
            // Some module scope variable
            [// Some module scope variable
                {
                    "flags": 0, "kind": 151, "name": { "flags": 0, "escapedText": "m"
                        // Some module scope class
                        ,
                        // Some module scope class
                        "flowNode": { "flags": 2 } }, "symbol": { "flags": 
                        // const
                        1 // const
                        ,
                        "escapedName": "m", "declarations": [null], "exports": // field
                        { // field
                        } } }], "equalsGreaterThanToken": { "flags": 0, "kind": 37
            },
            "body": { "flags": 0, "kind": 189, "expression": { "flags": 0, "escapedText": "m" } /* any or | ((m) => boolean) to be more strict; otherwise method-call will emit type mismatch error */, "name": { "flags": 0, "escapedText": "baz" } }, "flowNode": { "flags": 528, "antecedent": { "flags": 528, "antecedent": {
                        "flags": 514 }, "node": { "flags": 0, "kind": 237, "name": { "flags": 0, "escapedText": "someGlobalVar", "flowNode": { "flags": 514 } },
                        "initializer": { "flags": 0, "kind": 8, "numericLiteralFlags": 0 }, "symbol": { "flags": 2, "escapedName": "someGlobalVar", "declarations": [null], "exports": {} } } }, "node": { "flags": 0, "kind": 237, "name": { "flags": 0, "escapedText": "localVar" }, "initializer": { "flags": 0, "kind": 87 }, "symbol": { "flags": 2, "escapedName": "localVar", "declarations": [null], "exports": /* filter */ {} } } }, "symbol": { "flags": 16, "escapedName": "__function", "declarations": [null] }, "locals": {} } }));
})(/* filter */ { a: "foo" });
