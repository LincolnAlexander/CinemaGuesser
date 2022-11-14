function fetchData() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve('accepted');
        }, 1000);
    })
}

module.exports = fetchData;