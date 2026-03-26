(1) Create APK
---------------
==> Run [eas init] : Will Note That 'owner' And 'project-id' Added Automatically To 'app.json'
==> Run [eas build:configure] : For Generates 'eas.json' File 
==> Run [npx expo install --check] : For Check The Packages And Versions Combitability
==> Run [eas build -p android --profile preview]

(2) After Build If Forgot Any Default Values In Your App You Can Handle It Using 'Dev' Condition For Prevent Appears In Production

    defaultValues:{
        email: __DEV__ ? 'magdy@gm.com' : ''
    }

(3) After Build End You Can Download The 'APK' From 'expo.dev' dashboard And Install On android / ios