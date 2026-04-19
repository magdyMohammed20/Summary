(1) Module Path
-----------------
==> For Write Better And Absoluted Paths 

    import http = require('node:http');
    import fs = require('node:fs')
    import path = require('node:path');

    const server = http.createServer((req: http.IncomingMessage, res: http.ServerResponse) => {

        if (req.url === '/products' && req.method === 'GET') {

            // 1- Create products.json path (/node_first_project/src/data/products.json)
            const product_path = path.join(__dirname, "data", "products.json")

            fs.readFile(product_path, 'utf8', (err, data) => {
                res.writeHead(200, { 'content-type': 'application/json' });
                const content = data
                console.log(JSON.parse(content)) 
                res.write(content);

                res.end();
            })

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