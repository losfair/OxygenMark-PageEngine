(function() {
    function addCssRefToDocumentHead(p) {
        var newElem = document.createElement("link");
        newElem.href = p;
        newElem.rel = "stylesheet";
        newElem.type = "text/css";
        document.head.appendChild(newElem);
    }

    function addScriptRefToDocumentHead(p) {
        var newElem = document.createElement("script");
        newElem.src = p;
        document.head.appendChild(newElem);
    }

    function loadHeaders(headers) {
        if(headers.css) {
            if(typeof(headers.css) == "string") {
                addCssRefToDocumentHead(headers.css);
            } else {
                headers.css.forEach((v) => {
                    addCssRefToDocumentHead(v);
                });
            }
        }
        if(headers.scripts) {
            if(typeof(headers.scripts) == "string") {
                addScriptRefToDocumentHead(headers.scripts);
            } else {
                headers.scripts.forEach((v) => {
                    addScriptRefToDocumentHead(v);
                })
            }
        }
    }

    function doRender(data, newParams, writeToPage) {
        var result = "";

        if(typeof(data) == "string") data = JSON.parse(data);

        var base = data.base;
        var params = data.params;
        if(newParams) {
            for(var key in newParams) {
                params[key] = newParams[key];
            }
        }

        for(var p in params) {
            if(params[p] && typeof(params[p]) == "object" && params[p].type == "script") {
                eval("var func = " + params[p].code);
                var stringParams = {};
                for(var item in params) {
                    if(typeof(params[item]) == "string") stringParams[item] = params[item];
                }
                params[p] = func(stringParams);
            }
        }
        
        var stringParams = {};
        for(var item in params) {
            if(typeof(params[item]) == "string") stringParams[item] = params[item];
        }

        eval("var func = " + base);
        var result = func(stringParams);

        if(writeToPage) {
            if(data.title) document.title = data.title;
            if(data.headers) {
                loadHeaders(data.headers);
            }
            document.body.innerHTML = result;
        }

        return result;
    }
    window.loadOMPTemplate = function(target, templatePath, params, callback) {
        if(!callback) {
            return new Promise(function(cb) {
                window.loadOMPTemplate(target, templatePath, params, function(result) {
                    cb(result);
                });
            });
        }
        if(typeof(target) == "string") target = document.getElementById(target);
        if(!target) throw "Bad target";
        var xhr = new XMLHttpRequest();
        xhr.open("GET", templatePath, true);
        xhr.onreadystatechange = function() {
            if(xhr.readyState == xhr.DONE) {
                if(xhr.status < 200 || xhr.status >= 300) {
                    console.log("Request failed");
                    callback("Failed");
                    return;
                }
                doRender(xhr.responseText, params, true);
                callback("OK");
            }
        }
        xhr.send(null);
    }
})();
