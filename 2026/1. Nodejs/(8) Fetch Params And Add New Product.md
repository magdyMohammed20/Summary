(1) Fetch Params And Add New Product
--------------------------------------

    import http = require('node:http');

    const server = http.createServer((req: http.IncomingMessage, res: http.ServerResponse) => {
        // 1. Show the add product form
        if (req.url === '/products/add' && req.method === 'GET') {
            res.writeHead(200, { 'content-type': 'text/html' });
            res.write(`
        <h1>Add New Product</h1>
        <form method="POST" action="/products/add">
            <label>Name:</label><br/>
            <input type="text" name="name" required /><br/><br/>
            <button type="submit">Add Product</button>
        </form>
        `);
            res.end();
        }

        // 2. Receive form data from the request body
        else if (req.url === '/products/add' && req.method === 'POST') {
            let body = '';

            // 3. Collect incoming data chunks
            req.on('data', (chunk) => {
                body += chunk.toString();
            });

            // 4. Parse and respond when all data is received
            req.on('end', () => {
                const params = new URLSearchParams(body);
                const name = params.get('name');
                res.writeHead(200, { 'content-type': 'text/html' });
                res.write(`
            <h1>Product Added Successfully!</h1>
            <p>Product <strong>${name}</strong> has been added.</p>
            <a href="/products">Back to Products</a> |
            <a href="/products/add">Add Another</a>
        `);
                res.end();
            });
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