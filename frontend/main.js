import "babel-polyfill";
import * as network from "./network.js";
import * as renderer from "./render.js";

async function loadOMPTemplate(target, templatePath, params) {
    if(typeof(target) == "string") target = document.getElementById(target);
    if(!target) throw "Bad target";

    let resp = await network.makeRequest("GET", templatePath);
    renderer.doRender(resp, params, true);

    return "OK";
}

window.loadOMPTemplate = loadOMPTemplate;
