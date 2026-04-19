(1) Write To File
--------------------

    import http = require('node:http');
    import fs = require('node:fs')
    import path = require('node:path');

    const server = http.createServer((req: http.IncomingMessage, res: http.ServerResponse) => {

        if (req.url === '/products' && req.method === 'GET') {

            // 1- Create products.json path
            const product_path = path.join(__dirname, "data", "products.json")

            // 2- Use '.access' For Check If File Exists Or Not
            fs.access(product_path, (err) => {
                if (err) {
                    res.writeHead(200, { 'content-type': 'text/plain' });
                    res.end('File not found');
                    return
                }

                else {

                    // Write To File
                    fs.writeFile(
                        product_path,
                        JSON.stringify({
                            "products": [
                                { id: 3, name: "product3" }
                            ]
                        }, null, 2),
                        { flag: 'w' },
                        (err) => {
                            console.log(err)
                        })

                    // Read File And Send It To Client
                    fs.readFile(product_path, 'utf8', (err, data) => {
                        res.writeHead(200, { 'content-type': 'application/json' });
                        const content = data
                        res.write(content);

                        res.end();
                    })
                }

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