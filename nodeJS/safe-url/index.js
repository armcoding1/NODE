const http = require("http");
const fs = require("fs");
const crypto = require("crypto");

const PORT = 3000;
const serverName = `http://localhost:${PORT}`;

const visits = new Map();

const server = http.createServer((req, res) => {
    const parsedUrl = new URL(req.url, serverName);
    let urlforHash;

    if (parsedUrl.pathname !== '/favicon.ico') {
        urlforHash = req.url
        const key = parsedUrl.pathname;
        const count = (visits.get(key) || 0) + 1;
        visits.set(key, count);
        res.end(`visit count is ${key} ${count}`);
    } else {
        res.end();
    }

    if (urlforHash !== undefined) {
        fs.writeFile("url.txt", String(urlforHash), (err, data) => {
            if (err) {
                console.log(err.message);
            }
            fs.readFile("url.txt", "utf-8", (err, data) => {
                if (err) {
                    console.log((err.message));
                }
                const hash = crypto.createHash("sha256").update(data).digest('hex');
                fs.writeFile("url.txt.sha256", hash, (hashErr) => {
                    if (hashErr) {
                        console.log(hashErr.message);
                    }
                })
            })
        })
    }
})

server.listen(PORT, () => {
    console.log('\x1b[45m%s\x1b[0m', 'Your server in' + ' ' + serverName);
    console.log('\x1b[42m%s\x1b[0m', 'Happy hacking:)')
})