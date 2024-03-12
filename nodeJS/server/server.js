const http = require("http");

const visits = new Map();
const search = new Map();

const port = 8000;
const serverName = `http://localhost:${port}`;

const server = http.createServer((req, res) => {
  const parsedUrl = new URL(req.url, serverName);

  for(paramName of parsedUrl.searchParams.keys()) {
    search.set(paramName, (search.get(paramName) || 0) + 1);
  }

  const key = parsedUrl.pathname;
  const count = (visits.get(req.url) || 0) + 1;
  visits.set(key, count);
  res.end(`Visited ${count}
  
  Search params counts:
  ${[...search.entries()].map((key, value) => `${key} => ${value}`).join('\n')}
  `,
  );
})

server.listen(port, () => {
  console.log(`Your server port is ${serverName}`);
  console.log('Happy hacking!');
})