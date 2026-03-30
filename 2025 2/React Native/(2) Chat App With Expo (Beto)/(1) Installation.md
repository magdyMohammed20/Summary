(1) Install bun For Create Expo App
-------------------------------------
==> curl -fsSL https://bun.sh/install | bash
==> source ~/.zshrc
==> bun --version

(2) Create The React Native Project Using bun
------------------------------------------------
==> bun create expo-app chat-rooms-app
==> npm i
==> (npm run ios) Or (expo start)


(3) Change The App Theme Style In 'app.json'
----------------------------------------------

    "userInterfaceStyle": "dark",


(4) Add Clerk And Some Packages
---------------------------------
==> bun add @clerk/clerk-expo @clerk/types @clerk/expo-passkeys 
    npx expo install expo-secure-store expo-auth-session expo-crypto expo-web-browser expo-build-properties

(5) Add Appwrite
------------------
==> npx expo install react-native-appwrite@0.7.0 react-native-url-polyfill 

(6) Add legend app list for A high-performance list component
---------------------------------------------------------------
==> npx expo install @legendapp/list 

(7) Go To Clerk Site And Login With Github Then Crate New Application And Select Auth With 'Email' And After Create Go To 'Configure' Tab And Enable 'passkey' 
And In 'Configure' Too Inside 'Email' Disable 'Email verification code' 

(8) In Clerk Too Search For 'Native applications' In Sidebar And Ensure That 'Enable Native API' Is Enabled Then In The Vscode Run 'npx expo prebuild' Then Go To 'app.json' And Copy The Value Of 'bundleIdentifier' Which Is 'Bundle ID'  
And Go To Clerk Site Again Then Click On 'Add ios App' Button Then Enter The Data 

    App ID Prefix (Team ID) : Follow The Instructions
    Bundle ID : Value Of 'bundleIdentifier' That You Get

(9) Inside Clerk Too Search For 'SSO Connections' And 'Add New Connection' And Select 'Google' 
    Then Click On 'Google' Then Enable All Options Except (Use custom credentials)

(10) In Clerk Site Too Search For 'api keys' And Open It Then From Dropdown Select 'expo' Then Copy '.env' Value
     And Go To Vscode And Create '.env.local' File The Paste The Copied Code

(11) In Clerk Site Search For 'native applications' And Copy 'Frontend Api' Value Then Go To Vscode And in 'app.json' Add This In "ios" Key

    "ios" : {
        "associatedDomains" : [
            "applinks:(paste Frontend Api value)" ,
            "webcredentials:(paste Frontend Api value)" 
        ]
    }

(12) In 'app.json' Search For 'expo-build-properties' And Convert It To Array Like The Following To Ensure Passkey Working For '16.0'

        [
            "expo-build-properties",
            {
                "ios": {
                    "deploymentTarget": "16.0"
                }
            }
        ]


(13) Finally Run Again (npx expo prebuild) Then (npx expo start) Then Select (i)

