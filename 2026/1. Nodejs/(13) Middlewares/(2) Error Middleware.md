(1) Error Middleware
-----------------------

    src/middlewares/Error.ts
    ----------------------------

    import type { NextFunction, Request, Response } from "express";

    // 1- Create Error Class And Handle Error Method
    export default class ErrorMiddleware {
        static handle(err: Error, req: Request, res: Response, next: NextFunction) {
            if (req.originalUrl.startsWith('/products')) {
                res.status(500).json({
                    error: "Internal Server Error",
                    message: err.message,
                    stack: err.stack // For Show Fully Detailed Error But Use Only In Dev Mode
                })
            }

            next()
        }
    }

    src/server.ts
    --------------

        // 1- Throw Error Here For Make Test For Error
        app.get('/products', (req: Request, res: Response) => {
            throw new Error('Cant Get Products')

            return productsController.renderProducts(req, res)
        })


        // 2- Call The Handle Here At End Of File
        // 3- Now If Try TO Access 'http://localhost:3000/products' Will Get The Error
        app.use(ErrorMiddleware.handle)

        const PORT = 3000