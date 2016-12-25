export function sleep(ms, data) {
    return new Promise((cb) => {
        setTimeout(() => {
            cb(data);
        }, ms);
    });
};
