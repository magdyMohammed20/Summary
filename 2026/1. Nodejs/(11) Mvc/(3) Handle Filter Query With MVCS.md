(1) Handle Filter Query With MVCS
-----------------------------------

    product.service.ts
    --------------------

    import type { Product } from "../interfaces/index.js";

    class ProductsService {

        constructor(private products: Product[]) {
            this.products = products
        }

        findAll(): Product[] {
            return this.products
        }

        // 1- Create Filter Logic
        filterByQuery(filterQuery?: string) {

            if (filterQuery) {
                const propertiesToFilter = filterQuery.split(',')
                let filteredProducts: any = []

                filteredProducts = this.findAll().map(product => {

                    let filteredProduct: any = {}

                    propertiesToFilter.forEach(property => {
                        if (property in product) {
                            filteredProduct[property] = product[property as keyof Product]
                        }

                    })

                    return filteredProduct
                })

                return filteredProducts

            }

            return this.findAll()
        }
    }

    export default ProductsService



    productsController.ts
    -----------------------

    import type { Request } from "express";
    import ProductsService from "../services/product.service.ts";

    class ProductsController {


        constructor(private productsService: ProductsService) {
            this.productsService = productsService;
        }

        // 1- Set The req as param
        getProducts(req: Request) {

            // 2- Access Query From Request
            const filterQuery = req.query.filter as string;

            // 3- If Query Exists Call filterByQuery Else Get All Products
            if (filterQuery) {
                return this.productsService.filterByQuery(filterQuery)
            }

            return this.productsService.findAll();
        }
    }

    export default ProductsController;

    server.ts
    ------------

    import express, { type Request, type Response } from "express"
    import ProductsService from "./services/product.service.ts";
    import ProductsController from "./controllers/productsController.ts";

    const app = express()

    app.use(express.json())

    // Call
    const productsService = new ProductsService(generatesFakeProducts())
    const productsController = new ProductsController(productsService)

    app.get('/products', (req: Request, res: Response) => {
        res.send(productsController.getProducts(req))
    })