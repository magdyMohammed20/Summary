(1) Append Data To JSON File From Html Form
---------------------------------------------

    import http = require('node:http');
    import fs = require('node:fs')
    import path = require('node:path');

    // 1- Create Function Fir Check File Exists
    const checkFileExist = (filePath: string) => {
        try {
            fs.accessSync(filePath)
            return true
        } catch {
            return false
        }
    }

    const formattedResponse = (res: http.ServerResponse, statusCode: number, contentType: string, message?: string) => {
        res.writeHead(statusCode, { 'content-type': contentType });
        res.end(message);
    }

    const server = http.createServer((req: http.IncomingMessage, res: http.ServerResponse) => {
        const product_path = path.join(__dirname, "data", "products.json")

        // 2- Fetch Products And Display In '/products' Route
        if (req.url === '/products' && req.method === 'GET') {


            if (checkFileExist(product_path)) {
                fs.readFile(product_path, 'utf8', (err, data) => {
                    const content = data

                    formattedResponse(res, 200, 'application/json', content)

                })
            } else {
                formattedResponse(res, 200, 'text/plain', 'File not found')
                return
            }

        }

        // 3- Form To Submit New Product
        else if (req.url === '/products/add' && req.method === 'GET') {

            formattedResponse(res, 200, 'text/html', `
        <h1>Add New Product</h1>
        <form method="POST" action="/products/add">
            <label>Name:</label><br/>
            <input type="text" name="name" required /><br/><br/>
            <label>Description:</label><br/>
            <textarea name="description" required></textarea><br/><br/>
            <button type="submit">Add Product</button>
        </form>
        `)

        }

        // 4- Receive The POST Request That Incomes From The Form
        // Then Read The File Data And Store New Product
        else if (req.url === '/products/add' && req.method === 'POST') {
            let body = '';

            req.on('data', (chunk) => {
                body += chunk.toString();
            });

            req.on('end', () => {
                const params = new URLSearchParams(body);
                const name = params.get('name');
                const description = params.get('description');

                const is_products_file_exist = checkFileExist(product_path)

                if (is_products_file_exist) {
                    const newProduct = {
                        id: Math.floor(Math.random() * 1000000),
                        name,
                        description
                    }

                    fs.readFile(product_path, 'utf8', (err, data) => {
                        let parsedProducts = [];

                        // check if data exists and is valid JSON
                        if (data) {
                            try {
                                const parsed = JSON.parse(data);
                                parsedProducts = parsed.products ?? [];
                            } catch {
                                parsedProducts = [];
                            }
                        }

                        parsedProducts.push(newProduct);

                        fs.writeFile(product_path, JSON.stringify({ products: parsedProducts }, null, 2), { flag: 'w' }, (err) => {
                            if (err) {
                                formattedResponse(res, 500, 'text/plain', 'Failed to save product');
                                return;
                            }
                            formattedResponse(res, 200, 'text/html', `<a href='/products'>View Products</a>`);
                        });
                    });
                }
                else {
                    formattedResponse(res, 404, 'text/plain', 'Products File Not Exists')
                }

            });
        }
        else {
            formattedResponse(res, 404, 'text/html', '<h1>404 NOT FOUND</h1>')

        }

    });

    const PORT = 8000;

    server.listen(PORT, () => {
        console.log(`Server running on http://localhost:${PORT}`);
    });