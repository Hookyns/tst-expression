import * as ts from "typescript";
import {getVisitor} from "./src/visitation";

export default function parseExpressions<T extends ts.Node>(program: ts.Program): ts.TransformerFactory<T>
{
	return (context) => {
		return (node) => ts.visitNode(node, getVisitor(context, program));
	};
}