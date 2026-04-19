(1) Nodejs Local Server
--------------------------
==> npm i --save-dev @types/node
==> Inside 'tsconfig.json' Add "node" In types Array 
==> Then Create The Server In 'index.js'

    {
        "compilerOptions": {
            // ...existing code...
            "types": ["node"]
            // ...existing code...
        }
        // ...existing code...
    }

    index.js (Can Run The Server With [node index.js])
    ----------

    const http = require('node:http');

    const server = http.createServer((req, res) => {
        res.writeHead(200, { "Content-Type": "text/plain" })
        res.end("Hellow , There !")
    })

    server.listen(8000)


(2) CommonJs VS Ecmascript Modules
--------------------------------------

    const http = require("node:http") // CommonJs Module

    import http from "http" // Ecmascript Module


    
(3) For Nodejs If Want To Use 'Commonjs' Or 'esmodule' In The Project You Can Define in 'package.json'

    "type" : "module" 
    or
    "type" : "commonjs"