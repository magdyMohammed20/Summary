(1) Install Navigation Lib (React Navigation)
----------------------------
==> npx expo install react-native-screens react-native-safe-area-context
==> npm install @react-navigation/native-stack
==> npm install @react-navigation/elements

(2) Create Basic Navigation Configuration
---------------------------------------------

    App.tsx
    ----------

    import { StatusBar } from 'expo-status-bar';
    import { StyleSheet, View } from 'react-native';
    import { createNativeStackNavigator } from '@react-navigation/native-stack';
    import HomeScreen from './src/screens/HomeScreen';
    import { createStaticNavigation } from '@react-navigation/native';

    // 1- Create the Stack Navigator
    const RootStack = createNativeStackNavigator({
        screens: {
            Home: HomeScreen,
        }
    })

    // 2- Create the Navigation Component
    const Navigation = createStaticNavigation(RootStack);

    // 3- Use the Navigation Component in the App
    export default function App() {
        return (
            <View style={styles.container}>
                <Navigation />
                <StatusBar style="auto" />
            </View>
        );
    }


(3) If You add many screens you can set the initial or default screen to be shown first
-----------------------------------------------------------------------------------------

    const RootStack = createNativeStackNavigator({
        initialRouteName: 'Payment',
        screens: {
            Home: HomeScreen,
            Payment: PaymentScreen,
        }
    })


(4) for each screen can be object and add options like set the screen title
-----------------------------------------------------------------------------

    const RootStack = createNativeStackNavigator({
        initialRouteName: 'Home',
        screens: {
            Home: {
                screen: HomeScreen,
                options: {
                    title: 'Home Page'
                }
            },
            Payment: PaymentScreen,
        }
    })

(5) use 'screenOptions' to set default options for all screens
-----------------------------------------------------------------------------

    const RootStack = createNativeStackNavigator({
        initialRouteName: 'Home',
        screenOptions: {
            headerStyle: {
                backgroundColor: '#f4511e', // Change header background color
            },
            headerTitleStyle: {
                color: '#FFF' // Change header title color
            }
        },
        screens: {
            Home: {
                screen: HomeScreen,
                options: {
                    title: 'Home Page',
                }
            },
            Payment: {
                screen: PaymentScreen,
                options: {
                    title: 'Payment Page'
                }
            },
        }
    })


(6) First Way Of : Navigate Between Screens Using 'Button' or 'Link'
-------------------------------------------------------------------
==> After navigate occurs will note that in 'payment' screen the header back button is added automatically to go back to previous screen


            import { Link } from '@react-navigation/native';
            import { Button } from '@react-navigation/elements';

            <Link screen="Payment" params={{}}>
                Go to Payment
            </Link>

            <Button screen="Payment" params={{}}>
                Go to Payment
            </Button>


(7) second Way Of: Navigate Between Screens Using 'navigation' Object
-----------------------------------------------------------------------


    import { useNavigation } from '@react-navigation/native';
    import { Button } from '@react-navigation/elements';

    const HomeScreen = () => {

        const navigatation = useNavigation<any>();

        return (
            <Button onPress= {() => navigatation.navigate('Payment')}>
                Go to Payment
            </Button>
        )
    }

(8) Go Back To Previous Screen
---------------------------------

    import { useNavigation } from '@react-navigation/native';

    const BackButton = () => {
        const navigatation = useNavigation<any>();
        return (
            <TouchableOpacity onPress = {() => navigatation.goBack()}>
                <Entypo name="chevron-small-left" size = { 24} color = "black" />
            </TouchableOpacity>
        )
    }


(9) If Want To Go Back To First Screen In The Stack Or Go To Specific Previous Screen
---------------------------------------------------------------------------------------
==> navigation.popTo('Home') : Go back to a specific screen(in this case, Home)
==> navigation.popToTop() : Go back to the first screen in the stack