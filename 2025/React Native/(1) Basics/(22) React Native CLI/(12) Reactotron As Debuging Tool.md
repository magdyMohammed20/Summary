(1) Use 'Reactotron' As Debuging Tool
-----------------------------------------
==> Search For 'react native reactotron' And Download The Desktop App Normally Then Install It
==> Run This (npm i --save-dev reactotron-react-native)
==> In Root Of Your Project Create This File 'ReactotronConfig.js' And Add The Initial Config Code In It
    And Use The Reactotron In Your App By Import Inside 'index.js' 
==> Then Restart Your Local Server (npm run start) ==> (npm run both)

    ReactotronConfig.js
    ----------------------

    import Reactotron from "reactotron-react-native";

    Reactotron.configure() // controls connection & communication settings
    .useReactNative() // add all built-in react native plugins
    .connect(); // let's connect!


    index.js
    ------------

    if (__DEV__) {
        require("./ReactotronConfig");
    }
