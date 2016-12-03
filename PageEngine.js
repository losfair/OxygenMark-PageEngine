const om = require("oxygenmark");
const fs = require("fs");
const path = require("path");

function doPrepareTemplate(from, params) {
    if(path.isAbsolute(from)) {
        var fromFileDir = path.dirname(path.normalize(from)) + "/";
    } else {
        var fromFileDir = path.dirname(process.cwd() + "/" + path.normalize(from)) + "/";
    }

    for(var item in params) {
        if(params[item] && typeof(params[item]) == "object" && params[item]["type"] == "file") {
            var srcFile = params[item]["from"];
            params[item] = null;
            params[item] = doPrepareTemplate(fromFileDir + path.normalize(srcFile), params);
        }
    }

    var fromFileData = fs.readFileSync(from, "utf-8");
    var renderParams = {};
    for(var key in params) {
        if(params[key] && typeof(params[key]) == "string") renderParams[key] = params[key];
    }

    var omContext = new om();
    omContext.load(fromFileData);
    omContext.setParams(renderParams);

    var result = {
        "type": "script",
        "code": omContext.prepareRaw(false)
    }

    omContext.destroy();

    return result;
}

function page(template) {
    if(!template) throw "Template filename required";

    this.template = JSON.parse(fs.readFileSync(template, "utf-8"));
    if(path.isAbsolute(template)) {
        this.templateDir = path.dirname(path.normalize(template));
    } else {
        this.templateDir = path.dirname(process.cwd() + "/" + path.normalize(template));
    }

    this.params = {};
    if(this.template.title) this.title = this.template.title;

    this.prepare = () => {
        for(var key in this.template.params) this.params[key] = this.template.params[key];
        
        if(path.isAbsolute(this.template.base)) {
            var baseFileDir = path.dirname(path.normalize(this.template.base));
        } else {
            var baseFileDir = path.dirname(this.templateDir + "/" + path.normalize(this.template.base));
        }
        return doPrepareTemplate(baseFileDir + "/" + path.normalize(this.template.base), this.params);
    }
}

module.exports.page = page;
