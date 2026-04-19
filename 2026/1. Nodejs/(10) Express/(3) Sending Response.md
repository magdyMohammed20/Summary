(1) Sending Response
----------------------

    src/server.ts
    --------------

    import express from "express"

    const app = express()

    app.get('/', (req, res) => {
        res.send('<h1>Hellow Home Page</h1>')
    })

    const PORT = 3000

    app.listen(PORT, () => {
        console.log(`Server Started At http://localhost:${PORT}`)
    })