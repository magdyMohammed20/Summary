(1) MVCS (Model - View - Controller - Service) Implementation
-----------------------
==> controllers Responsibilities
--------------------------------
1- Handle HTTP Requests
2- Delegates Complex Logic To Providers (Services)

==> Service
-------------
1- Responsibile For Data Storage And Retriveal

    src/services/products.service.ts
    ---------------

    import type { Product } from "../interfaces/index.js";
    import { generatesFakeProducts } from "../utils/fakeData.ts";

    class ProductsService {

        ////////////////////// Can Write This ////////////////////////////
        // 1- Assign The Data Store
        private readonly products: Product[] = generatesFakeProducts();

        ///////////////////// Or This Instead ////////////////////////////
        // 1- Assign The Data Store
        // But Here We Will Pass The Data In Service Instance Call
        constructor(private products: Product[]) {
            this.products = products
        }

        // 2- Enable Access Private Data
        findAll() {
            return this.products
        }
    }

    export default ProductsService



    src/controllers/productsController.ts
    ---------------

    import ProductsService from "../services/product.service.ts";

    class ProductsController {

        // 1- Define products service
        // 2- Initialize the service
        constructor(private productsService: ProductsService) {
            this.productsService = productsService;
        }

        // 3- Return The Data
        getProducts() {
            return this.productsService.findAll();
        }
    }

    export default ProductsController;


    src/server.ts
    ---------------

    import express, { type Request, type Response } from "express"
    import { generatesFakeProducts } from "./utils/fakeData.ts";
    import type { Product } from "./interfaces/index.js";
    import ProductsService from "./services/product.service.ts";
    import ProductsController from "./controllers/productsController.ts";


    const app = express()

    app.use(express.json())

    // 1- Call
    const productsService = new ProductsService() // Pass The generatesFakeProducts Here If Add Constructor For The Service File
    const productsController = new ProductsController(productsService)

    // 2- Return The Data
    app.get('/products', (req: Request, res: Response) => res.send(productsController.getProducts()))

