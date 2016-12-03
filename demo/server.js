const express = require("express");
const fs = require("fs");

const app = express();

app.use(express.static("public"));

app.get("/render_test", (req, resp) => {
    var doc = fs.readFileSync("test_template.omp", "utf-8");
    resp.send(doc);
});

app.listen(7766);
