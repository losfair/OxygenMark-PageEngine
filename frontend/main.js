import "babel-polyfill";
import * as network from "./network.js";
import * as renderer from "./render.js";
import * as animations from "./animations.js";

async function loadOMPTemplate(target, templatePath, params) {
    if(typeof(target) == "string") target = document.getElementById(target);
    if(!target) throw "Bad target";

    let resp = await network.makeRequest("GET", templatePath);
    renderer.doRender(target, resp, params, true);

    return "OK";
}

async function loadHTMLDocument(target, docPath) {
    if(typeof(target) == "string") target = document.getElementById(target);
    if(!target) throw "Bad target";

    let resp = await network.makeRequest("GET", docPath);
    target.innerHTML = resp;

    return "OK";
}

async function loadTextDocument(target, docPath) {
    if(typeof(target) == "string") target = document.getElementById(target);
    if(!target) throw "Bad target";

    let resp = await network.makeRequest("GET", docPath);
    let escaped = "";

    const mappings = {
        "<": "&lt;",
        ">": "&gt;",
        "&": "&amp;",
        " ": "&nbsp;",
        "\n": "<br>"
    };

    resp.forEach((ch) => {
        if(mappings[ch]) escaped += mappings[ch];
        else escaped += ch;
    });

    target.innerHTML = escaped;

    return "OK";
}

window.ompe = {
    loadOMPTemplate: loadOMPTemplate,
    loadHTMLDocument: loadHTMLDocument,
    loadTextDocument: loadTextDocument,
    makeRequest: network.makeRequest,
    fadeIn: animations.fadeIn,
    fadeOut: animations.fadeOut
};
