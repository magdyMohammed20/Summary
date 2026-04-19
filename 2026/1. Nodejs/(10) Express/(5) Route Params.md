(1) Route Params
------------------

    import express, { type Request, type Response } from "express"

    const app = express()

    // Dynamic Url
    app.get('/products/:id', (req: Request, res: Response) => {
        const productId = req.params.id;

        if (productId && isNaN(+productId)) {
            res.status(404).send({ code: 404, message: "Product id not valid" })
            return
        }


        res.status(200).send({
            code: 200,
            data: { id: 1, name: "Blue T-shirt" }
        })

    })

    const PORT = 3000

    app.listen(PORT, () => {
        console.log(`Server Started At http://localhost:${PORT}`)
    })