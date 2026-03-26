(1) Splash Screen For ios
----------------------------
==> First Run (npm install --save react-native-bootsplash)

==> Then Open 'ios' Folder In terminal And Run 'pod install'

==> Then We Are Set The Splash Image Inside '/src/assets/splash.svg' 

==> Then Run This

    yarn react-native-bootsplash generate src/assets/appsplash.png \
    --platforms=android,ios,web \
    --background=F5FCFF \
    --logo-width=100 \
    --assets-output=assets/bootsplash \
    --flavor=main \
    --html=public/index.html

    Or

    npx react-native-bootsplash generate src/assets/appsplash.png \
    --platforms=android,ios,web \
    --background=F5FCFF \
    --logo-width=100 \
    --assets-output=assets/bootsplash \
    --flavor=main \
    --html=public/index.html

==> Then Search For 'AppDelegate.swift' In Your Project 

    import RNBootSplash // ⬅️ add this import


    // Inside The Class Add This Function
    override func customize(_ rootView: RCTRootView) {
        super.customize(rootView)
        RNBootSplash.initWithStoryboard("BootSplash", rootView: rootView) // ⬅️ initialize the splash screen
    }


==> Now Splash Screen Works But Don't Disappears So We Can Hide It After Loading Using This Code

    import { useEffect } from "react";
    import { Text } from "react-native";
    import BootSplash from "react-native-bootsplash";

    const App = () => {
        useEffect(() => {
            const init = async () => {
                // …do multiple sync or async tasks
            };

            init().finally(async () => {
                await BootSplash.hide({ fade: true });
                console.log("BootSplash has been hidden successfully");
            });
        }, []);

        return <Text>My awesome app</Text>;
    };