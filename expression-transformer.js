"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ts = require("typescript");
const visitation_1 = require("./src/visitation");
function parseExpressions(program) {
    return (context) => {
        return (node) => ts.visitNode(node, visitation_1.getVisitor(context, program));
    };
}
exports.parseExpressions = parseExpressions;
//# sourceMappingURL=expression-transformer.js.map