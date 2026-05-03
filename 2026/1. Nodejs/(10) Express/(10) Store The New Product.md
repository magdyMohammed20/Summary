(1) Store The New Product
---------------------------
==> Can Test Using 'thunder client' By Make POST Request First Then Create GET Request


import express, { type Request, type Response } from "express"
import { generatesFakeProducts } from "./utils/fakeData.ts"; // 1- Import Generates Function
import type { Product } from "./interfaces/index.js";


const app = express()
const fakeProducts = generatesFakeProducts()


    // 1- Here The Client 'Front End' Must Set The content-type with 'custom/header' For Enable Access The 'req' in app.post
    app.use(express.json({
        type: 'custom/header' // Default Value Is 'application/json'
    }))

    app.post('/products', (req: Request, res: Response) => {

        // 2- Access Req Body Or Data Of New Product
        const newProduct = req.body

        // 3- Push The New Product
        fakeProducts.push({ id: fakeProducts.length + 1, ...newProduct })

        // 4- Note Here 201 Code For Establish Creation 
        res.status(201).send(JSON.stringify(req.body)).end()

    })

    app.get('/products', (req: Request, res: Response) => {
        res.status(200).send({ code: 200, data: fakeProducts }).end()
    })

    const PORT = 3000

    app.listen(PORT, () => {
        console.log(`Server Started At http://localhost:${PORT}`)
    })