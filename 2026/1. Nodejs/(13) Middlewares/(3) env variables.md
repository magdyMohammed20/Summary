(1) Installation
-------------------
==> npm i --save dotenv
==> Create ".env" In Root Folder
==> Configure In 'server.ts'
==> Use .env values In Something Like Middlewares

    server.ts
    -----------

    import dotenv from "dotenv" // Add This

    app.use(express.json())
    dotenv.config() // Call This


    .env
    ------

    NODE_ENV="development"  


    middlewares/Error.ts
    ------------------------

    import type { NextFunction, Request, Response } from "express";

    export default class ErrorMiddleware {
        static handle(err: Error, req: Request, res: Response, next: NextFunction) {
            if (req.originalUrl.startsWith('/products')) {
                res.status(500).json({
                    error: "Internal Server Error",
                    message: err.message,
                    stack: process.env.NODE_ENV == "development" ? err.stack : null // Show Error Details In Dev Mode Only
                })
            }

            next()
        }
    }