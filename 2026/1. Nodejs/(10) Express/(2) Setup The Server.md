(1) Install
-------------
==> npm i express @types/express

(2) Create 'server.ts'
-------------------------

    src/server.ts
    ---------------

    import express from "express" // In package.json change 'type' To "module"

    const app = express()

    // Here Can Pass PORT Previous The Callback Function
    app.listen(() => {
        console.log(`Server Started At http://localhost:5000`)
    })

(3) Change The 'dev' Command In 'package.json'
-----------------------------------------------

    package.json
    ---------------

    "scripts": {
        "dev": "nodemon src/server.ts",
        "build": "tsc -p ."
    },