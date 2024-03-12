console.log('Request data...');

const p = new Promise((resolve, reject) => {
    setTimeout(() => {
        console.log('Preparing data...');
        const backendData = {
            server: 'aws',
            port: 2000,
            status: 'working'
        }
        resolve(backendData)
    }, 2000)
})

p.then(data => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            data.modified = true
            resolve(data)

        }, 2000)
    })
}).then(data => {
    data.fromPromise = true
    return data
}).then(data => {
    console.log('Modified', data);
})
    .catch((err) => {
        console.error("error", err);
    })
    .finally(() => console.log('Finally'))

const sleep = ms => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve()
        }, ms)
    })
}

sleep(2000).then(() => {
    console.log('After 2sec');
})

Promise.all([sleep(2000), sleep(5000)])
    .then(() => {
        console.log('All promises');
    })


Promise.race([sleep(2000), sleep(5000)])
    .then(() => {
        console.log('Race promises');
    })