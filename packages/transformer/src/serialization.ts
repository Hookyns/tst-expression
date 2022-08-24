import { ExpressionKind } from "tst-expression";
import * as ts            from "typescript";

// List of properties which will be ignored in expr tree serialization
const IgnoredProperties = ["text", "pos", "end", "parent", "id", "transformFlags", "modifierFlagsCache", "isReferenced", "nextContainer", "flowNode", "jsDocCache", "symbol"];

/**
 * Serialize node's tree
 * @param node
 */
export function serializeNodeTree(node: ts.Node)
{
	const cache: any[] = [];

	return JSON.stringify(node, function (key, value) {
		// Ignore these properties; but don't ignore "text" property if it's text containing node
		if (IgnoredProperties.indexOf(key) !== -1 && (key != "text" || (!ts.isStringTextContainingNode(this) && !ts.isNumericLiteral(this))))
		{
			return undefined;
		}

		// Translate TypeScript SyntaxKind to our standard (cross-version) ExpressionKind.
		if (key === "kind" && !isNaN(value))
		{
			value = (ExpressionKind as any)[ts.SyntaxKind[value]] || ExpressionKind.Unknown;

			if (!value)
			{
				console.error(`Unable to translate TypeScript's SyntaxKind '${ts.SyntaxKind[value]}' (${value}) to ExpressionKind. ExpressionKind.Unknown used instead.`);
			}
		}

		if (typeof value === "object" && value !== null)
		{
			if (cache.indexOf(value) !== -1)
			{
				// Duplicate reference found
				try
				{
					// If this value does not reference a parent it can be deduped
					return JSON.parse(JSON.stringify(value));
				}
				catch (error)
				{
					return undefined;
				}
			}

			cache.push(value);
		}

		return value;
	});
}