(1) Note: For Previous POST Request If User Set The header 'Content-Type' With Any Thing unless 'application/json'
    we can't access the req or will get 'req' object as empty

(2) So Here Will Specify the header 'content-type' If The client 'Front end' Sent It With the specificed value we will get the 'req' correctly
---------------------------------------------------

    import express, { type Request, type Response } from "express"

    const app = express()

    // 1- Here The Client 'Front End' Must Set The content-type with 'custom/header' For Enable Access The 'req' in app.post
    app.use(express.json({
        type: 'custom/header' // Default Value Is 'application/json'
    }))

    app.post('/products', (req: Request, res: Response) => {

        // 2- Will Success To Access With It's Values If content-type is 'custom/header'
        console.log(req.body)
        res.send(JSON.stringify(req.body)).end()

    })

    const PORT = 3000

    app.listen(PORT, () => {
        console.log(`Server Started At http://localhost:${PORT}`)
    })