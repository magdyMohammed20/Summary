(1) Patch An Existing Record
------------------------------

    import express, { type Request, type Response } from "express"
    import { generatesFakeProducts } from "./utils/fakeData.ts";
    import type { Product } from "./interfaces/index.js";


    const app = express()
    const fakeProducts = generatesFakeProducts()


    app.use(express.json())

    app.post('/products', (req: Request, res: Response) => {

        const newProduct = req.body

        fakeProducts.push({ id: fakeProducts.length + 1, ...newProduct })
        res.status(201).send(JSON.stringify(req.body)).end()

    })

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

    ///////////////////////// Patch /////////////////////////
    app.patch('/products/:id', (req: Request, res: Response) => {
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

            // 3- Else Find The Product Index Using Id And Access Request Body To Update
            const productIndex = fakeProducts.findIndex(item => item.id === +productId)
            const productBody = req.body

            // 4- If Product Exists Start To Update The Data
            if (productIndex !== -1) {

                fakeProducts[productIndex] = { ...fakeProducts[productIndex], ...productBody }

                return res.status(200).send({
                    message: 'Product Updated Successfully',
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