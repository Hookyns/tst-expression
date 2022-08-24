import * as ts            from "typescript";
import { VisitorFactory } from "./src/VisitorFactory";

export default function transform(program: ts.Program): ts.TransformerFactory<ts.SourceFile>
{
	return (context) => {
		return (node) => ts.visitNode(node, VisitorFactory.create(context, program));
	};
}