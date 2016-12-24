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
        document.body.innerHTML = result;
    }

    return result;
}

var container = document.getElementById("container");

var xhr = new XMLHttpRequest();
xhr.open("GET", "/render_test", false);
xhr.send(null);
var result = JSON.parse(xhr.responseText);

doRender(result, null, true);
