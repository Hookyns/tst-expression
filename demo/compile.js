const compiler = require("../src/compiler");

compiler.compile()
	.then(() => {
		console.log("\nCompilation finished.");
	});