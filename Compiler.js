const pageEngine = require("./PageEngine.js");
const process = require("process");
const fs = require("fs");

if(process.argv.length != 3) {
    throw "Bad usage";
}

try {
    var page = new pageEngine.page(process.argv[2]);
    var result = page.prepare();
} catch(e) {
    throw "Error parsing page: " + e;
}

var output = {
    "main": result.code,
    "params": page.params
};

if(page.title) output.title = page.title;

console.log(JSON.stringify(output));
