(1) Http Request Logging
--------------------------
==> For Log The Data Of Each Request (Can Used For Dev And Prod Modes)
==> npm i morgan
==> npm i --save-dev @types/morgan
==> For Terminal In Each Request Will Get Something Like (GET /products 200 155.571 ms - 3027) Which Is Info About The Request


    server.ts
    -----------
    
    import morgan from "morgan"

    app.use(morgan("dev"))