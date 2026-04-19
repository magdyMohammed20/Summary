(1) Use promises To Read/Write Files (fs.promises.readFile / fs.promises.writeFile)
-------------------------------------------------------------------------------------
==> Uses To Prevent Usage Of Callbacks


    import http = require('node:http');
    import fs = require('node:fs')
    import path = require('node:path');

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

    const server = http.createServer(async (req: http.IncomingMessage, res: http.ServerResponse) => {
        const product_path = path.join(__dirname, "data", "products.json")

        if (req.url === '/products' && req.method === 'GET') {


            if (checkFileExist(product_path)) {

                const jsonData = await fs.promises.readFile(product_path, 'utf8');
                const content = jsonData
                formattedResponse(res, 200, 'application/json', content)


            } else {
                formattedResponse(res, 200, 'text/plain', 'File not found')
                return
            }

        }

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


        else if (req.url === '/products/add' && req.method === 'POST') {
            let body = '';

            req.on('data', (chunk) => {
                body += chunk.toString();
            });

            req.on('end', async () => {
                const params = new URLSearchParams(body);
                const name = params.get('name');
                const description = params.get('description');

                const is_products_file_exist = checkFileExist(product_path)

                if (is_products_file_exist) {

                    // 1- Read File Using fs.promises Without Callback
                    const jsonData = await fs.promises.readFile(product_path, 'utf8')

                    let parsedProducts = [];

                    // 2- check if data exists and is valid JSON
                    if (jsonData) {
                        try {
                            const parsed = JSON.parse(jsonData);
                            parsedProducts = parsed.products ?? [];
                        } catch {
                            parsedProducts = [];
                        }
                    }

                    // 3- Create New Product Obj
                    const newProduct = {
                        id: parsedProducts.length + 1,
                        name,
                        description
                    }
                    parsedProducts.push(newProduct);

                    // 4- Use fs.promises with write file too
                    await fs.promises.writeFile(product_path, JSON.stringify({ products: parsedProducts }, null, 2), { flag: 'w' });

                    formattedResponse(res, 200, 'text/html', `<a href='/products'>View Products</a>`);
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
