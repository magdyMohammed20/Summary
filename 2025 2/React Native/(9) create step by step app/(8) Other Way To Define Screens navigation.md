(1) Other Way To Define Screens And Options
---------------------------------------------

    src/navigation/MainStackNavigator.tsx
    ---------------------------------------

    import { createNativeStackNavigator } from '@react-navigation/native-stack'
    import PaymentScreen from '../screens/PaymentScreen';
    import HomeScreen from '../screens/HomeScreen';

    const MainStackNavigator = () => {
        const Stack = createNativeStackNavigator();


        return (
            <Stack.Navigator>
                <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
                <Stack.Screen name="Payment" component={PaymentScreen} options={{ headerShown: false }} />
            </Stack.Navigator>
        )
    }

    export default MainStackNavigator


    App.tsx
    ------------

    import { StatusBar } from 'expo-status-bar';
    import { StyleSheet, View } from 'react-native';
    import { NavigationContainer } from '@react-navigation/native';
    import MainStackNavigator from './src/navigation/MainStackNavigator';


    export default function App() {
        return (
            <View style={styles.container}>
                <NavigationContainer>
                    <MainStackNavigator />
                </NavigationContainer>
                <StatusBar style="auto" />
            </View>
        );
    }

(2) at start of react navigation usage will note that all screen background colors are changed so we can handle it manually
-----------------------------------------------------------------------------------------------

    import { StatusBar } from 'expo-status-bar';
    import { StyleSheet, View } from 'react-native';
    import { DefaultTheme, NavigationContainer } from '@react-navigation/native';
    import MainStackNavigator from './src/navigation/MainStackNavigator';

    const MyTheme = {
        ...DefaultTheme,
        colors: {
            ...DefaultTheme.colors,
            background: '#ffffff',
        },
    };
    export default function App() {
        return (
            <View style={styles.container}>

                <NavigationContainer theme={MyTheme}>
                    <MainStackNavigator />
                </NavigationContainer>

                <StatusBar style="auto" />
            </View>
        );
    }