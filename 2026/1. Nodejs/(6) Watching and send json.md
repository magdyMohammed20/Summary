(1) Watching
---------------
==> npm i -D typescript ts-node nodemon
==> in 'package.json' Add The Script Of Run

    {
        "scripts": {
            "start": "node dist/index.js",
            "dev": "nodemon src/index.ts",
            "build": "tsc -p ."
        }
    }


    index.ts
    ------------

    import http = require('node:http');

    const server = http.createServer((req: http.IncomingMessage, res: http.ServerResponse) => {
        res.writeHead(200, { "Content-Type": "text/plain" });
        res.write("This Is First One\n");
        res.write("This Is Second One\n");
        res.end("Hello, There!");
    });

    const PORT = 8000;

    server.listen(PORT, () => {
        console.log(`Server running on http://localhost:${PORT}`);
    });

(2) Send JSON Data
---------------------

    import http = require('node:http');

    const server = http.createServer((req: http.IncomingMessage, res: http.ServerResponse) => {
        res.writeHead(200, { "Content-Type": "text/plain" });
        const products = [
            {
                id: 1,
                name: "first 1"
            },
            {
                id: 2,
                name: "second 2"
            }
        ]
        res.end(JSON.stringify(products));
    });

    const PORT = 8000;

    server.listen(PORT, () => {
        console.log(`Server running on http://localhost:${PORT}`);
    });