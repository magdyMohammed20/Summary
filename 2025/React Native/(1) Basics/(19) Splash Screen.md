(1) Add Image For Splash Screen
----------------------------------
==> npm install expo-splash-screen
==> Add The Following Plugin In 'app.json'
==> Note : Will See The Splash Screen When Create 'APK' For Your App

    {
        "expo": {
            "plugins": [
            [
                "expo-splash-screen",
                {
                "backgroundColor": "#232323",
                "image": "./assets/splash-icon.png",
                "dark": {
                    "image": "./assets/splash-icon-dark.png",
                    "backgroundColor": "#000000"
                },
                "imageWidth": 200
                }
            ]
            ],
        }
    }
