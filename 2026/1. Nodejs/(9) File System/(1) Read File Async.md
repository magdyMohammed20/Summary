(1) Read File Async
----------------------


    import http = require('node:http');
    import fs = require('node:fs')

    const server = http.createServer((req: http.IncomingMessage, res: http.ServerResponse) => {

        if (req.url === '/products' && req.method === 'GET') {

            // This Is Async Which Is Non Blocking Code
            fs.readFile('./src/data/products.json', 'utf8', (err, data) => {
                res.writeHead(200, { 'content-type': 'application/json' });
                const content = data
                console.log(JSON.parse(content)) // Will Printed At End
                res.write(content);

                res.end();
            })

            console.log("The Endddddd") // Will Printed First
        }

        else {
            res.writeHead(404, { 'content-type': 'text/html' });
            res.write('<h1>404 NOT FOUND</h1>');
            res.end();
        }

    });

    const PORT = 8000;

    server.listen(PORT, () => {
        console.log(`Server running on http://localhost:${PORT}`);
    });