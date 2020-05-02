import * as ts from "typescript";

// List of properties which will be ignored in expr tree serialization
const IgnoredProperties = ["text", "pos", "end", "parent", "id", "transformFlags", "modifierFlagsCache", "isReferenced", "nextContainer", "flowNode"];

/**
 * Serialize node's tree
 * @param node
 * @param parent
 */
export function serializeNodeTree(node: ts.Node, parent)
{
	const cache = [];
	return JSON.stringify(node, function (key, value) {
		// Ignore these properties
		if (IgnoredProperties.indexOf(key) !== -1) return undefined;

		if (typeof value === "object" && value !== null) {
			if (cache.indexOf(value) !== -1) {
				// Duplicate reference found
				try {
					// If this value does not reference a parent it can be deduped
					return JSON.parse(JSON.stringify(value));
				} catch (error) {
					return undefined;
				}
			}

			cache.push(value);
		}

		return value;
	});
}