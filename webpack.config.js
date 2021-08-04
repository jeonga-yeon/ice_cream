const path = require("path");
const { PassThrough } = require("stream");

module.exports = {
    entry: "./src/frontend/js/main.js",
    output: {
        filename: "main.js",
        path: path.resolve(__dirname, "assets", "js"),
    },
};