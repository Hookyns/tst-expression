import * as ts from "typescript";
import {getVisitor} from "./src/visitation";

export default function transform(program: ts.Program): ts.TransformerFactory<ts.SourceFile>
{
	return (context) => {
		return (node) => ts.visitNode(node, getVisitor(context, program));
	};
}