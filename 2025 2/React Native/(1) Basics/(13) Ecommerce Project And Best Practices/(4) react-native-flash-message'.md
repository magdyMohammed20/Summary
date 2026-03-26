(1) install 'react-native-flash-message'
----------------------------------------
==> npm install --save react-native-flash-message

(2) Usage
-----------
==> Set <FlashMessage/> In 'App.tsx'
==> Show The Message Any Where In All App



    App.tsx
    ---------

    export default function App() {
        return (
            <SafeAreaContext style={{ justifyContent: "flex-start", alignItems: "center" }}>
                <FlashMessage position={'top'} />
                <NavigationContainer>
                    <HomeScreen />
                </NavigationContainer>
            </SafeAreaContext>
        );
    }


    HomeScreen.tsx
    ---------------

    import { View, Button } from 'react-native'

    import { showMessage } from 'react-native-flash-message'


    const HomeScreen = () => {

        const showAlert = () => {
            showMessage({
                message: "Hello World",
                type: "success",
            })
        }

        return (
            <View style= { styles.container } >
                <Button onPress={ () => showAlert() } title = 'Click' color = "#841584" />
            </View>
        )
    }

    export default HomeScreen

