(1) POST Request With Parsing The 'Req'
-----------------------------------------

    import express, { type Request, type Response } from "express"

    const app = express()

    // 1- Make Parse Here For Enable Access 'req' In The Next Request
    app.use(express.json())

    app.post('/products', (req: Request, res: Response) => {

        // 2- Here Can Access the req and any prop in it
        console.log(req.body)
        res.send(JSON.stringify(req.body)).end()

    })

    const PORT = 3000

    app.listen(PORT, () => {
        console.log(`Server Started At http://localhost:${PORT}`)
    })


(2) Can Test The POST Request By Using 'thunder client' extension in vscode 