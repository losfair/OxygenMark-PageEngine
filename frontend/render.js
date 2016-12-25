import * as pageUtils from "./page.js";

function loadHeaders(headers) {
    if(headers.css) {
        if(typeof(headers.css) == "string") {
            pageUtils.addCssRefToDocumentHead(headers.css);
        } else {
            headers.css.forEach((v) => {
                pageUtils.addCssRefToDocumentHead(v);
            });
        }
    }
    if(headers.scripts) {
        if(typeof(headers.scripts) == "string") {
            pageUtils.addScriptRefToDocumentHead(headers.scripts);
        } else {
            headers.scripts.forEach((v) => {
                pageUtils.addScriptRefToDocumentHead(v);
            })
        }
    }
}

export function doRender(target, data, newParams, writeToPage) {
    let result = "";

    if(typeof(data) == "string") data = JSON.parse(data);

    let base = data.base;
    let params = data.params;
    if(newParams) {
        for(let key in newParams) {
            params[key] = newParams[key];
        }
    }

    for(var p in params) {
        if(params[p] && typeof(params[p]) == "object" && params[p].type == "script") {
            let func = (new Function("return " + params[p].code))();
            let stringParams = {};
            for(var item in params) {
                if(typeof(params[item]) == "string") stringParams[item] = params[item];
            }
            params[p] = func(stringParams);
        }
    }
    
    let stringParams = {};
    for(let item in params) {
        if(typeof(params[item]) == "string") stringParams[item] = params[item];
    }

    let func = (new Function("return " + base))();
    result = func(stringParams);

    if(writeToPage) {
        if(data.title) document.title = data.title;
        if(data.headers) {
            loadHeaders(data.headers);
        }
        target.innerHTML = result;
    }

    return result;
}
