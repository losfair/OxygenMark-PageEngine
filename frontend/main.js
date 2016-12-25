import "babel-polyfill";
import * as renderer from "./render.js";

window.loadOMPTemplate = (target, templatePath, params, callback) => {
    if(!callback) {
        return new Promise((cb) => {
            window.loadOMPTemplate(target, templatePath, params, (result) => {
                cb(result);
            });
        });
    }
    if(typeof(target) == "string") target = document.getElementById(target);
    if(!target) throw "Bad target";
    let xhr = new XMLHttpRequest();
    xhr.open("GET", templatePath, true);
    xhr.onreadystatechange = () => {
        if(xhr.readyState == xhr.DONE) {
            if(xhr.status < 200 || xhr.status >= 300) {
                console.log("Request failed");
                callback("Failed");
                return;
            }
            renderer.doRender(xhr.responseText, params, true);
            callback("OK");
        }
    }
    xhr.send(null);
}
