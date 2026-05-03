(1) Send Data From Service And Controller To Pug Page
------------------------------------------------------

    product.service.ts
    ---------------------

    import type { Product } from "../interfaces/index.js";

    class ProductsService {

        constructor(private products: Product[]) {
            this.products = products
        }

        findAll(): Product[] {
            return this.products
        }

        
    }

    export default ProductsService


    productsController.ts
    ----------------------

    import type { Request, Response } from "express";
    import ProductsService from "../services/product.service.ts";

    class ProductsController {


        constructor(private productsService: ProductsService) {
            this.productsService = productsService;
        }

        renderProducts(req: Request, res: Response) {
            res.render('products', {
                products: this.productsService.findAll()
            })
        }
    }

    export default ProductsController;


    server.ts
    ------------

    import express, { type Request, type Response } from "express"
    import { generatesFakeProducts } from "./utils/fakeData.ts";
    import ProductsService from "./services/product.service.ts";
    import ProductsController from "./controllers/productsController.ts";
    import path from 'path';
    import { fileURLToPath } from 'url';

    const app = express()

    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);
    app.set("views", path.join(__dirname, 'views'))

    app.set("view engine", "pug")

    app.use(express.static(path.join(__dirname, "public")))


    app.use(express.json())

    const productsService = new ProductsService(generatesFakeProducts())
    const productsController = new ProductsController(productsService)


    //////////////////// Send The Products Data To Products Page /////////////////////////
    app.get('/products', (req: Request, res: Response) => productsController.renderProducts(req, res))
