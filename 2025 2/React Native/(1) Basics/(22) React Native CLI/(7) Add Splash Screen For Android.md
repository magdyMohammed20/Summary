(1) Android Splash Screen
----------------------------
==> We Will Usage 'react-native-bootsplash' Lib For Generates Splash Screen With Existed Image In The Project

==> Run This Command And Can Replace 'svgs/light-logo.svg' (EX: src/assets/logo.svg) With The Path Of The Required Image And Too Can Replace Or Change The 'background' And 'logo-width' Here

    yarn react-native-bootsplash generate svgs/light-logo.svg \
    --platforms=android,ios,web \
    --background=F5FCFF \
    --logo-width=100 \
    --assets-output=assets/bootsplash \
    --flavor=main \
    --html=public/index.html

    Or

    npx react-native-bootsplash generate svgs/light-logo.svg \
    --platforms=android,ios,web \
    --background=F5FCFF \
    --logo-width=100 \
    --assets-output=assets/bootsplash \
    --flavor=main \
    --html=public/index.html

==> In Repo Of 'react-native-bootsplash' There Are Many Usage Depending On React Native Version For initialize the splash Screen
    So Depending On The Version Copy The Function Of initialize From The Repo And Search For 'android/app/src/main/java/com/myapp/MainActivity.kt' File In Your Project
    And Paste The Code Of initialize Inside The class And Don't Forget The 'imports' At First Of File And Above The Class

    MainActivity.kt
    -----------------

    import android.os.Bundle
    import com.zoontek.rnbootsplash.RNBootSplash


    override fun onCreate(savedInstanceState: Bundle?) {
        RNBootSplash.init(this, R.style.BootTheme) // ⬅️ initialize the splash screen
        super.onCreate(savedInstanceState)
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