(1) Maps In React Native
--------------------------
==> npm i react-native-maps
==> cd ios && pod install
==> Open 'AppDelegate.swift' And Add The Import On Top Of File
    And Add The Second Line Inside 'AppDelegate' Class

    // This Import At Top Of File
    import GoogleMaps


    // This Inside The Class
    GMSServices.provideAPIKey("_YOUR_API_KEY_");


==> Add This Line Below The 'pod' Lines In 'Podfile' In The Project
    Then Run 'pod install' In The Terminal

    rn_maps_path = '../node_modules/react-native-maps'
    pod 'react-native-maps/Google', : path => rn_maps_path



==> For Android Just Go To 'android/app/src/main/AndroidManifest.xml' And Add This Line Inside The '<Application>' Tag

        <meta-data
            android:name="com.google.android.geo.API_KEY"
            android:value="Your Google maps API Key Here"/>


(2) At Above There Are Lines Needs For 'Google Key' So We Will Go To 'Google Cloud' To Generate The Api Key 
But It's Not Free