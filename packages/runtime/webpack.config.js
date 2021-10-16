const path = require("path");
const Mode = (process.env.NODE_ENV || "development").toLowerCase();

module.exports = {
    entry: "./index.ts",
    mode: Mode,
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "tst-expression.js",
        library: {
            name: "tstExpression",
            type: "umd",
            umdNamedDefine: true
        },
        libraryTarget: 'umd',
        globalObject: 'this'
    },
    resolve: {
        extensions: [".ts", ".js"]
    },
    devtool: "source-map",
    module: {
        rules: [
            {
                test: /\.ts$/,
                use: "ts-loader",
                exclude: /node_modules/,
            },
        ],
    },
};