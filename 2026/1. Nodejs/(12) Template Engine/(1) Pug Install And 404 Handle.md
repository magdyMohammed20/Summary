(1) Pug Install
------------------
==> npm i pug --save
==> In server.ts set the used template engine

    app.set('view engine', 'pug')

==> Create 'views' Folder That Contains 'index.pug'


    views/index.pug
    -----------

        html
            head
                title= title
            body
                h1= message

==> Render The index Page 

    src/server.ts
    ---------------

    import express, { type Request, type Response } from "express"

    const app = express()

    app.set("view engine", "pug")

    app.get('/', (req: Request, res: Response) => {
        res.render('index', { title: "Home Page", message: "Welcome To Home Page" })
    })

==> When Request '/' The Node Search For 'views' Folder In Project Root Directory But In Our Case We Set The 'views' In 'src' 
    So We Must Set The 'views' Directory In server.ts

    src/server.ts
    ----------------

    import express, { type Request, type Response } from "express"
    import path from 'path';
    import { fileURLToPath } from 'url';

    const app = express()

    /////////////////// Set Here ///////////////////////////
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);
    app.set("views", path.join(__dirname, 'views'))


    app.set("view engine", "pug")

    app.get('/', (req: Request, res: Response) => {
        res.render('index', { title: "Home Page", message: "Welcome To Home Page" })
    })


(2) Usage Of Style
--------------------
==> Inside src folder create 'public' Folder That Contains 'styles' Folder That Contains 'global.css'


    server.ts
    ----------

    import express from "express"
    import path from 'path';
    import { fileURLToPath } from 'url';

    const app = express()

    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);

    app.use(express.static(path.join(__dirname, "public")))


    views/index.pug
    ----------------

    html 
        head 
            link(rel="stylesheet" href="/styles/global.css")
            title= title   
        body 
            h1= message 


(3) Handle 404 Page In 'server.ts'
------------------------------------

    // 404 Page
    // notFound Is Pug File Inside 'Views' Folder
    app.use((req, res) => {
        res.status(404).render('notFound')
    });