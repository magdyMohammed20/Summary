(1) Compile The TS
--------------------
==> npm i -g typescript
==> npx tsc--ignoreConfig index.ts && node index.js


(2) Response write
----------------------

    const http = require('node:http');

    const server = http.createServer((req, res) => {
        res.writeHead(200, { "Content-Type": "text/plain" })

        ///// Can Write Many Writes Here //////
        res.write("This Is First One")
        res.write("This Is Second One")

        // Can Only One .end Here
        // And Must Set The End For End The Response Progress
        res.end("Hellow , There !")

    })

    const PORT = 8000

    server.listen(PORT)
