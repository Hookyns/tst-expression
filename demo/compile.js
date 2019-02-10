const ts = require("typescript");
const glob = require("glob");
const {parseExpressions} = require("../expression-transformer");

// TypeScript config file
const options = require("./tsconfig");

// options.include must be set; **/*.ts otherwise
if (!options.hasOwnProperty("include")) {
	options.include = ["./**/*.ts"];
}

/**
 * Gets paths from patterns
 * @param pattern
 * @param files
 * @returns {Promise<void>}
 */
async function getPathsFromPatterns(pattern, files) {
	return new Promise((resolve, reject) => {
		glob(pattern, {cwd: __dirname, absolute: true}, async (err, filePaths) => {
			const promises = [];

			try {
				for (let path of filePaths) {
					if (files.indexOf(path) === -1) {
						files.push(path);
					}
				}
				await Promise.all(promises);
				resolve();
			} catch (ex) {
				reject(ex);
			}
		});
	});
}

/**
 * Returns files paths and contents
 * @param options
 * @returns {Promise<Array<{path: string, content: string}>>}
 */
async function getFiles(options) {
	const promises = [];
	const files = [];

	for (let pattern of options.include) {
		promises.push(
			getPathsFromPatterns(pattern, files)
		);

	}

	await Promise.all(promises);
	return Promise.resolve(files);
}

(async function () {
	try {
		const promises = [];
		const files = await getFiles(options);
		// const fileNames = files.map(f => f.path);
		const program = ts.createProgram(files, options);
		program.emit(undefined, undefined, undefined, false, {before: [parseExpressions(program)]});

		await Promise.all(promises);
	} catch (e) {
		console.error(e);
	}
})();