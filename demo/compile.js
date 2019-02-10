const ts = require("typescript");
const $fs = require("fs");
const $path = require("path");
const glob = require("glob");
const {parseExpressions} = require("../expression-transformer");

// TypeScript config file
const options = require("./tsconfig");

// options.include must be set; **/*.ts otherwise
if (!options.hasOwnProperty("include")) {
	options.include = ["./**/*.ts"];
}

/**
 * Read file content and append it to "files" object parameter
 * @param path
 * @param files
 * @returns {Promise<void>}
 */
function readFileContent(path, files) {
	return new Promise((resolve, reject) => {
		$fs.readFile(path, "utf-8", (err, content) => {
			if (err) {
				reject(err);
				return;
			}

			files.push({path, content});
			resolve();
		});
	});
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
					// promises.push(
					// 	readFileContent(path, files)
					// );
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

		// for (let file of files) {
		// 	if (file.path.slice(-5) !== ".d.ts") {
		// 		// Name of output file
		// 		let outFileName = $path.basename(file.path);
		// 		outFileName = outFileName.slice(0, outFileName.length - $path.extname(file.path).length) + ".js";
		// 		let outFilePath = $path.join($path.dirname(file.path), outFileName);
		//
		// 		let result = ts.transpileModule(file.content, {
		// 			compilerOptions: options,
		// 			transformers: {before: [parseExpressions(program)]}
		// 		});
		//
		// 		promises.push(
		// 			new Promise((resolve, reject) => {
		// 				$fs.writeFile(outFilePath, result.outputText, "utf-8", err => {
		// 					if (err) {
		// 						reject(err);
		// 						return;
		// 					}
		//
		// 					resolve();
		// 				});
		// 			})
		// 		);
		// 	}
		// }

		await Promise.all(promises);
	} catch (e) {
		console.error(e);
	}
})();

// const source = $fs.readFileSync(__dirname + "/code.ts", "utf-8");
//
// // const options = {
// // 	module: ts.ModuleKind.CommonJS,
// // 	target: "esnext",
// // 	sourceMap: true,
// // };
//
//
// let result = ts.transpileModule(source, {
// 	compilerOptions: options,
// 	transformers: {before: [parseExpressions(program)]}
// });
//
// // console.log(result);
//
// $fs.writeFileSync(__dirname + "/output.js", result.outputText, "utf-8");