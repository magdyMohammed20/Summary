(1) Delete Record
---------------------

    import express, { type Request, type Response } from "express"
    import { generatesFakeProducts } from "./utils/fakeData.ts";
    import type { Product } from "./interfaces/index.js";


    const app = express()
    let fakeProducts = generatesFakeProducts()


    app.use(express.json())

    app.get('/products', (req: Request, res: Response) => {
        const query = req.query.filter as string

        if (query) {
            const propertiesToFilter = query.split(',')
            let filteredProducts: any = []

            filteredProducts = fakeProducts.map(product => {

                let filteredProduct: any = {}

                propertiesToFilter.forEach(property => {
                    if (property in product) {
                        filteredProduct[property] = product[property as keyof Product]
                    }

                })

                return filteredProduct
            })

            res.status(200).send({ code: 200, data: filteredProducts }).end()

        }

        res.status(200).send({ code: 200, data: fakeProducts }).end()
    })

    ///////////////////////// Delete /////////////////////////
    app.delete('/products/:id', (req: Request, res: Response) => {
        const productId = req.params.id

        // 1- Check If id Sended In Endpoint
        if (productId) {

            // 2- If Is Not A Number Return Error
            if (isNaN(+productId)) {
                return res.status(404).send({
                    message: 'Invalid Product Id',
                    code: 404
                })
            }

            // 3- Else Find The Product Index Using Id 
            const product = fakeProducts.find(item => item.id === +productId)

            // 4- If Product Exists Start To Filter The Data
            if (product) {

                fakeProducts = fakeProducts.filter(item => item.id != product.id)

                return res.status(200).send({
                    message: 'Product Deleted Successfully',
                    code: 200
                })
            }

            // 5- Else Return Not Found Error
            else {
                return res.status(400).send({
                    message: 'Product Not Found',
                    code: 400
                })
            }


        }

    })


    const PORT = 3000

    app.listen(PORT, () => {
        console.log(`Server Started At http://localhost:${PORT}`)
    })