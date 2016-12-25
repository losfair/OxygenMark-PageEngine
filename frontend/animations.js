import {sleep} from "./sleep.js";

export async function fadeIn(target, ms) {
    if(typeof(target) == "string") target = document.getElementById(target);
    if(!target) throw "Bad target";

    if(!ms) ms = 1000;
    let currentOpacity = parseInt(target.style.opacity);

    while(currentOpacity < 1) {
        currentOpacity += 1 / ms * 10;
        if(currentOpacity >= 1) {
            target.style.opacity = 1;
            break;
        }
        target.style.opacity = currentOpacity;
        await sleep(10);
    }
}

export async function fadeOut(target, ms) {
    if(typeof(target) == "string") target = document.getElementById(target);
    if(!target) throw "Bad target";

    if(!ms) ms = 1000;
    let currentOpacity = parseInt(target.style.opacity);
    if(target.style.opacity === "") currentOpacity = 1;

    while(currentOpacity > 0) {
        currentOpacity -= 1 / ms * 10;
        if(currentOpacity <= 0) {
            target.style.opacity = 0;
            break;
        }
        target.style.opacity = currentOpacity;
        await sleep(10);
    }
}
