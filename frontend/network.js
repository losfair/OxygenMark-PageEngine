export function makeRequest(method, url, data) {
    return new Promise((resolve, reject) => {
        let xhr = new XMLHttpRequest();
        xhr.open(method, url, true);
        xhr.onreadystatechange = () => {
            if(xhr.readyState == xhr.DONE) {
                if(xhr.status < 200 || xhr.status >= 300) {
                    reject(xhr.responseText);
                } else {
                    resolve(xhr.responseText);
                }
            }
        };
        if(data) xhr.send(data);
        else xhr.send(null);
    });
}
