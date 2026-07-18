(1) Install 'pg' for bring up connection in nodejs project
------------------------------------------------------------
==> npm i pg dotenv
==> Create Folder Called 'models' and create 'db.ts' Inside it
==> Create '.env' In Root Folder 
==> Create 'interfaces' Folder and create 'index.ts' Inside it
==> Create 'services' Folder and create 'authors.service.ts' Inside it
==> Create 'controllers' Folder and create 'authorsController.ts' Inside it
==> Update 'server.ts' to add authors route
==> Run the server and test the route


    .env
    ------

    NODE_ENV="development"
    DB_HOST = 127.0.0.1
    DB_PORT = 5432
    DB_USER = postgres
    DB_PASSWORD = 123456
    DB_NAME = books_store


    models/db.ts
    ---------------

    import pkg from "pg";
    import dotenv from "dotenv";

    dotenv.config();

    const { Pool } = pkg;

    const pool = new Pool({
        host: "127.0.0.1",
        port: 5432,
        user: "postgres",
        password: "123456",
        database: "books_store",
    });

    export default pool;


    interfaces/index.ts
    ----------------------

    export interface Author {
        id: Number;
        name: String;
        num_of_books: Number
    }


    services/authors.service.ts
    ---------------------------------

    import type { Author } from "../interfaces/index.ts"
    import pool from "../models/db.ts"

    class AuthorService {


        async findAll(): Promise<Author[]> {
            const res = await pool.query('SELECT * FROM authors')
            return res.rows
        }
    }

    export default AuthorService

    controllers/authorsController.ts
    --------------------------------------

    import type { Request, Response } from "express";
    import type AuthorService from "../services/author.service.ts";

    export default class AuthorsController {
        constructor(private authorsService: AuthorService) {
            this.authorsService = authorsService
        }

        async getAuthors(req: Request, res: Response) {

            try {
                const authors = await this.authorsService.findAll()
                return res.status(200).send({ data: authors, message: "Authors fetched successfully", code: 200 })
            } catch (err) {
                return res.status(500).send({ error: "Failed to fetch authors", code: 500 })
            }
        }
    }

    server.ts
    ------------------------

    import AuthorsController from "./controllers/authorsController.ts";
    import AuthorService from "./services/author.service.ts";

    const authorsService = new AuthorService()
    const authorsController = new AuthorsController(authorsService)

    // Main Authors Page
    app.get('/authors', (req: Request, res: Response) => {
        return authorsController.getAuthors(req, res)
    })