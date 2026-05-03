(1) Sending Response Must Be Handled By Controller
------------------------------------------------------

    src/services/products.service.ts
    ---------------------------------

    import type { Product } from "../interfaces/index.js";

    class ProductsService {

        constructor(private products: Product[]) {
            this.products = products
        }

        findAll(): Product[] {
            return this.products
        }

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

        getProductById(productId: string) {
            return this.findAll().find(product => product.id == +productId)
        }
    }

    export default ProductsService


    src/controllers/productsController.ts
    --------------------------------------

    import type { Request, Response } from "express";
    import ProductsService from "../services/product.service.ts";
    import type { Product } from "../interfaces/index.ts";

    class ProductsController {


        constructor(private productsService: ProductsService) {
            this.productsService = productsService;
        }

        getProducts(req: Request, res: Response) {

            const filterQuery = req.query.filter as string;

            if (filterQuery) {
                return res.status(200).send({
                    data: this.productsService.filterByQuery(filterQuery),
                    code: 200
                });
            }

            return res.status(200).send({ data: this.productsService.findAll(), code: 200 });
        }

        // 1- Create Get Product By Id To Filter And Response
        getProductById(req: Request, res: Response) {
            const productId = req.params.id;

            if (productId && isNaN(+productId)) {
                res.status(404).send({ code: 404, message: "Product id not valid" }).end()

            }

            if (productId) {
                const findProduct: Product | undefined = this.productsService.getProductById(productId as string)

                if (findProduct) {
                    res.status(200).send({
                        code: 200,
                        data: findProduct
                    }).end()
                } else {
                    res.status(404).send({
                        code: 404,
                        data: null
                    }).end()
                }
            }
        }
    }

    export default ProductsController;


    src/ServiceWorkerRegistration.ts
    ----------------------------------------

    import express, { type Request, type Response } from "express"
    import { generatesFakeProducts } from "./utils/fakeData.ts";
    import ProductsService from "./services/product.service.ts";
    import ProductsController from "./controllers/productsController.ts";


    const app = express()

    app.use(express.json())

    // Call
    const productsService = new ProductsService(generatesFakeProducts())
    const productsController = new ProductsController(productsService)

    app.get('/products', (req: Request, res: Response) => productsController.getProducts(req, res))

    app.get('/products/:id', (req: Request, res: Response) => productsController.getProductById(req, res))

