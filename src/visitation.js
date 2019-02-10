"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ts = require("typescript");
const context_1 = require("./context");
const serialization_1 = require("./serialization");
const ExpressionTypeName = "Expression";
/**
 * Check if type is Expression
 * @param type
 */
function isExpressionType(type) {
    return type && type.typeName && type.typeName.escapedText === ExpressionTypeName;
}
exports.isExpressionType = isExpressionType;
/**
 * Visitor which convert all call with parameter of Expression<> type to Expression interface format
 * @param context
 * @param program
 */
function getVisitor(context, program) {
    let checker = program.getTypeChecker();
    const visit = (node) => {
        const parent = node.parent;
        if (parent !== undefined) {
            if (ts.isCallExpression(parent) && parent.arguments.length !== 0
                && parent.arguments.some(a => a == node)) {
                let index = parent.arguments.indexOf(node);
                if (index != -1) {
                    const signature = checker.getResolvedSignature(parent);
                    const declaration = signature.declaration;
                    if (!!declaration) {
                        const param = declaration.parameters[index];
                        if (isExpressionType(param.type) || (param.type && param.type.types && param.type.types.some(t => isExpressionType(t)))) {
                            let serializedTreeExpression = "var a = " + serialization_1.serializeNodeTree(node, parent);
                            let treeExpression = ts.createSourceFile("__.ts", serializedTreeExpression, ts.ScriptTarget.ESNext, null, ts.ScriptKind.JS);
                            return ts.createObjectLiteral([
                                ts.createPropertyAssignment("compiled", ts.visitEachChild(node, visit, context)),
                                ts.createPropertyAssignment("context", context_1.getContext(checker, node)),
                                ts.createPropertyAssignment("expression", treeExpression.statements[0].declarationList.declarations[0].initializer)
                            ]);
                        }
                    }
                }
            }
        }
        return ts.visitEachChild(node, visit, context);
    };
    return visit;
}
exports.getVisitor = getVisitor;
//# sourceMappingURL=visitation.js.map