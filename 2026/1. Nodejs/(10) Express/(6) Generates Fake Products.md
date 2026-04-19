(1) Generates Fake Products
----------------------------
==> npm install @faker-js/faker --save-dev


    src/utils/fakeData.ts
    -----------------------

    import { faker } from '@faker-js/faker';

    export const generatesFakeProducts = () => {

        return Array.from({ length: 25 }, (_, idx) => {
            return {
                id: idx + 1,
                title: faker.commerce.productName(),
                price: +faker.commerce.price()
            }
        })
    }


    src/server.ts
    ----------------

    import express, { type Request, type Response } from "express"
    import { generatesFakeProducts } from "./utils/fakeData.js"; // 1- Import Generates Function

    const app = express()

    // 2- Generates Fake Products
    const fakeProducts = generatesFakeProducts()


    app.get('/products/:id', (req: Request, res: Response) => {
        const productId = req.params.id;

        if (productId && isNaN(+productId)) {
            res.status(404).send({ code: 404, message: "Product id not valid" }).end()

        }

        // 3- Filter The Products Depending In The ID
        const findProduct = fakeProducts.find(product => product.id == +productId)

        if (findProduct) {
            res.status(200).send({
                code: 200,
                data: findProduct
            }).end()
        } else {
            res.status(404).send({
                code: 404,
                data: null
            })
        }



    })


    // 4- Return All Generated Products
    app.get('/products', (req: Request, res: Response) => {

        res.status(200).send({ code: 200, data: fakeProducts }).end()
    })

    const PORT = 3000

    app.listen(PORT, () => {
        console.log(`Server Started At http://localhost:${PORT}`)
    })

