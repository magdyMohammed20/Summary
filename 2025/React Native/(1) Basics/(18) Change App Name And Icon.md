(1) Change App Name And Icon
-------------------------------
==> In The Project There are file called 'app.json' 


    app.json
    -------------

    {
        "expo": {
            "name": "e-commerce app", // Here For Change App Name
            "icon": "./assets/appicon.png", // Here For Change App Icon
        
            "android": {
                "adaptiveIcon": {
                    "foregroundImage": "./assets/appicon.png", // And Here For Change App Icon
                    "backgroundColor": "#ffffff"
                },
            
            },
        }
    }