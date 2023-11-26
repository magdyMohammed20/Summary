(1) Create Next App (create-next-app fullstackApp)

(2) Folder Structure (Routing)
--------------------------------

    src
        -app
            -page.js (Home Page) (/)

            -dashboard
                -page.js (/dashboard)
                -settings
                    -page.js (/dashboard/settings)
            
            -about (/about)
                -page.js

            -product
                -product-details
                    -page.js (/product/product-details)

            -blog (Dynamic Routes) (/blog/45)
                -[blogs]
                    -page.js