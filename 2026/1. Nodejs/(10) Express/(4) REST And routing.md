(1) REST (Representational State Transfer)
----------
==> Most Common used architectural Style For Building Web Services And Api's 

(2) Routing
--------------

    import express, { type Request, type Response } from "express"

    const app = express()

    app.get('/', (req, res) => {
        res.send('<h1>Hellow Home Page</h1>')
    })

    app.get('/products', (req: Request, res: Response) => {
        res.send([
            {
                id: 1, name: "Blue T-shirt"
            }
        ])
    })

    // Dynamic Url
    app.get('/products/:id', (req: Request, res: Response) => {
        res.send(req.params.id)
    })

    const PORT = 3000

    app.listen(PORT, () => {
        console.log(`Server Started At http://localhost:${PORT}`)
    })