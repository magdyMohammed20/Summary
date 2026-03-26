(1) Why React Natuve Cli Used Instead Of Expo
----------------------------------------------
==> Allow Full Access To Native Code (ios , android) Making It Easier To Integrate Third Party Libraries And Custom Native Modules
==> App With React Native Cli Have Better Performance As Companies Can Optimize Native Modules 
==> Smaller App Size


(2) React Native Cli VS Expo
--------------------------------

==> React Native Cli Pros
---------------------------
--> Full access to native Android & iOS code
--> Maximum flexibility
--> Easier to integrate custom native libraries
--> Better for apps needing deep hardware/system integration


==> React Native Cli Cons
---------------------------
--> More complex setup (Xcode + Android Studio required)
--> Manual configuration
--> Slower initial setup


==> Expo Pros
----------------
--> Very easy setup (no Xcode/Android Studio required initially)
--> Fast development with Expo Go
--> Built-in APIs (camera, location, notifications, etc.)
--> Over-the-air (OTA) updates
--> EAS Build handles app store builds in the cloud

==> Expo Cons
---------------
--> Limited access to custom native modules (though much better than before)
--> Slightly larger app size
--> If you need custom native code, you may need to "eject" (prebuild)


(3) What Is Different In Tools And Libs
-------------------------------------------
==> Use 'React Native vector icons' Instead Of 'Expo Icons'
==> Different In Use Fonts Which Expo Uses 'expo-fonts' But Cli Uses Another Way
==> Different In Linking Firebase Which cli Uses 'firebase-app' 