export function addCssRefToDocumentHead(p) {
    let newElem = document.createElement("link");
    newElem.href = p;
    newElem.rel = "stylesheet";
    newElem.type = "text/css";
    document.head.appendChild(newElem);
}

export function addScriptRefToDocumentHead(p) {
    let newElem = document.createElement("script");
    newElem.src = p;
    document.head.appendChild(newElem);
}
