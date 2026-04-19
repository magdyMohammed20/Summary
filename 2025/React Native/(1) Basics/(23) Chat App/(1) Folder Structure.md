(1) Folder Structure
------------------------

    src
        - assets
            - icons
                - 
        - components
        - constants
            - platform.ts
        - helpers
        - keys
        - screens
        - styles
            - colors.ts


    styles/colors.ts
    -----------

        export const COLORS = {
            primary: '#3498db',
            secondary: '#2ecc71',
            background: '#ecf0f1',
            text: '#2c3e50',
        };


    constants/platform.ts
    -------------

    import {Platform} from 'react-native';

    export const IS_IOS = Platform.OS === 'ios';
    export const IS_ANDROID = Platform.OS === 'android';


(2) Install 'react-native-size-matters' (npm i react-native-size-matters)

(3) Can Add Useful Scripts In 'Package.json'
------------------------------------------------

    "scripts":{
         // For Run Server For Ios And Android
        "both" : "react-native run-android && react-native run-ios",

        // For Gradlew Clean And Run
        "g-c-run" : "cd android && ./gradlew clean && cd .. && react-native run-android", 

        // For Clean Gradlew Only
        "g-c" : "cd android && ./gradlew clean && cd .."        

        // For Install Pods
        "pod" : "cd ios && pod install && cd .."

        // Open Your Project In Xcode
        "open-xcode" : "xed -b ios"

        // Remove And Clean Node Modules , package lock File And Pod Files
        "new-blod" : "rm -rf node_modules && rm -rf package-lock.json && cd ios && rm -rf Podfile.lock && cd .. && npm i && cd ios && pod install && cd .."


    }