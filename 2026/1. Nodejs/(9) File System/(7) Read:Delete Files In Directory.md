(1) Read Files In Directory
-------------------------------

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
           if (req.url === '/assets') {
                const assetsPath = path.join(__dirname, 'assets');
                const is_assets_exist = checkFileExist(assetsPath)

                if (is_assets_exist) {
                    const files = fs.readdirSync(assetsPath);

                    const listItems = files.map(file => `<li style='margin-top:12px'>
                            
                            <a href='/delete?file=${encodeURIComponent(file)}'>${file}</a>
                            
                            </li>`).join('');

                    formattedResponse(res, 200, 'text/html', `
                            <h1>Assets</h1>
                            <ul>${listItems}</ul>
                        `)

                } else {
                    formattedResponse(res, 404, 'text/html', '<h1>Folder Not Found</h1>')
                }


            }
            else {
                formattedResponse(res, 404, 'text/html', '<h1>404 NOT FOUND</h1>')

            }

    });

    const PORT = 8000;

    server.listen(PORT, () => {
        console.log(`Server running on http://localhost:${PORT}`);
    });


(2) Delete The File
-----------------------

    import http = require('node:http');
    import fs = require('node:fs')
    import path = require('node:path');
    const assetsPath = path.join(__dirname, 'assets');

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


        if (req.url === '/assets') {
            const is_assets_exist = checkFileExist(assetsPath)

            if (is_assets_exist) {
                const files = fs.readdirSync(assetsPath);

                const listItems = files.map(file => `<li style='margin-top:12px'>
                    
                    <a href='/delete?file=${encodeURIComponent(file)}'>${file}</a>
                    
                    </li>`).join('');

                formattedResponse(res, 200, 'text/html', `
                    <h1>Assets</h1>
                    <ul>${listItems}</ul>
                `)

            } else {
                formattedResponse(res, 404, 'text/html', '<h1>Folder Not Found</h1>')
            }


        }
        else if (req.method == 'GET' && req.url?.startsWith('/delete')) {

            // Add safety checks for each step
            const queryString = req.url.split('?')[1];
            if (queryString) {
                const fileParam = queryString.split('=')[1];
                if (fileParam) {
                    const fileName = decodeURIComponent(fileParam);
                    const filePath = path.join(__dirname, '/assets', `/${fileName}`)
                    // Use fileName here

                    if (checkFileExist(filePath)) {
                        fs.unlink(filePath, err => {
                            if (err) {
                                formattedResponse(res, 404, 'text/plain', `${err}`)
                                return
                            }

                            formattedResponse(res, 200, 'text/plain', 'File Deleted Successfully')


                        })
                    } else {
                        formattedResponse(res, 404, 'text/plain', 'File Not Exists')
                    }

                } else {
                    // Handle missing file parameter
                    res.writeHead(400, { "content-type": "text/plain" });
                    res.end('Error: No file parameter provided');
                }
            } else {
                // Handle missing query string
                res.writeHead(400, { "content-type": "text/plain" });
                res.end('Error: Invalid URL format');
            }

        }
        else {
            formattedResponse(res, 404, 'text/html', '<h1>404 NOT FOUND</h1>')

        }

    });

    const PORT = 8000;

    server.listen(PORT, () => {
        console.log(`Server running on http://localhost:${PORT}`);
    });