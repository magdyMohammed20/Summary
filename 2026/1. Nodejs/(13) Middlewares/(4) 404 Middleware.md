(1) Create Middleware For 404 Page Request
---------------------------------------------

    middlewares/NotFoundMiddleware.ts
    ------------------------------------

    import type { NextFunction, Request, Response } from "express";

    export default class NotFoundMiddleware {
        static handle(req: Request, res: Response, next: NextFunction) {
            if (req.originalUrl.startsWith('/api')) {
                res.status(404).json({
                    error: `API ${req.originalUrl} Endpoint Not Found`
                })
            }

            res.status(404).render("notFound", {
                pageTitle: "Page Not Found",
                message: `The Page You Are Looking For Is Not Found`
            })
            next()
        }
    }


    views/notFound.pug
    ---------------------

    html    
        body 
            h1 404 Not Found 

    server.ts
    ------------

    import NotFoundMiddleware from "./middlewares/NotFound.ts"; // Call This

    app.use(ErrorMiddleware.handle)
    app.use(NotFoundMiddleware.handle) // And This