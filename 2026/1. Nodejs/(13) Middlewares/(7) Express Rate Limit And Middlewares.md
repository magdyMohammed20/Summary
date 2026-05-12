(1) Express Rate Limit
-----------------------
==> For Disable Requests From Sepecific IP When Make Specific Number Of Requests In Specific Time
==> npm i express-rate-limit

    server.ts
    -----------

    import { rateLimit } from 'express-rate-limit'

    const limiter = rateLimit({
        windowMs: 5000, // If User Makes 2 Requests In 5 seconds prevent Access Any Route
        limit: 2, 
    })

    app.use(limiter)


(2) Compression Middleware
----------------------------
==> For Compress Each Request Size And Improve The SEO 
==> npm install compression
==> npm i --save-dev @types/compression

    server.ts
    -----------

    import compression from "compression"

    // Set Before All Middlewares
    app.use(compression())