(1) Routing
-------------

    import http = require('node:http');

    const server = http.createServer((req: http.IncomingMessage, res: http.ServerResponse) => {

        // localhost://8000/products
        if (req.url == "/products") {
            res.writeHead(200, { "content-type": "application/json" });
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

            res.write(JSON.stringify(products))
            res.end();

        } 
        // localhost://8000/
        else if (req.url == "/") {
            res.writeHead(200, { "content-type": "text/plain" })
            res.write("Home Page")
            res.end()
        } 
        // For Any Unknown route
        else {
            res.writeHead(400, { "content-type": "text/html" })
            res.write("<h1>404 NOT FOUND</h1>")
            res.end()
        }

    });

    const PORT = 8000;

    server.listen(PORT, () => {
        console.log(`Server running on http://localhost:${PORT}`);
    });


(2) Formatting products with any format 
------------------------------------------

    // localhost://8000/products
    if (req.url == "/products") {
        res.writeHead(200, { "content-type": "application/json" });
        const data = {
            products: [
                {
                    id: 1,
                    name: "first 1"
                },
                {
                    id: 2,
                    name: "second 2"
                }
            ]
        }

        res.write(JSON.stringify(data))
        res.end();

    }