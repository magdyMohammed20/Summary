(1) Query Params (localhost:3000/products?filter=title,price)
------------------
==> If Want To Return Specific Key From Api

    // First Shape localhost:3000/products?filter=title,price
    app.get('/products', (req: Request, res: Response) => {
        const query = req.query

        console.log(query) // { filter: 'title,price' }
        res.status(200).send({ code: 200, data: fakeProducts }).end()
    })

    // Second Shape http://localhost:3000/products?filter=title&filter=price
    app.get('/products', (req: Request, res: Response) => {
        const query = req.query

        console.log(query) // { filter: [ 'title', 'price' ] }
        res.status(200).send({ code: 200, data: fakeProducts }).end()
    })


(2) Sample For Return Products With Specific Keys
----------------------------------------------------

    import express, { type Request, type Response } from "express"
    import { generatesFakeProducts } from "./utils/fakeData.ts";
    import type { Product } from "./interfaces/index.js";

    const app = express()

    const fakeProducts = generatesFakeProducts()

    app.get('/products', (req: Request, res: Response) => {
        const query = req.query.filter as string

        // 1- If Request Something Like http://localhost:3000/products?filter=title,price
        if (query) {
            const propertiesToFilter = query.split(',')
            let filteredProducts: any = []

            // 2- Filter The Products To Return The Products With Specific Required Props
            filteredProducts = fakeProducts.map(product => {

                let filteredProduct: any = {}

                propertiesToFilter.forEach(property => {
                    if (property in product) {
                        filteredProduct[property] = product[property as keyof Product]
                    }

                })

                return filteredProduct
            })

            // 3- If User Request http://localhost:3000/products Return Normal All Products
            res.status(200).send({ code: 200, data: filteredProducts }).end()

        }

        res.status(200).send({ code: 200, data: fakeProducts }).end()
    })

    const PORT = 3000

    app.listen(PORT, () => {
        console.log(`Server Started At http://localhost:${PORT}`)
    })