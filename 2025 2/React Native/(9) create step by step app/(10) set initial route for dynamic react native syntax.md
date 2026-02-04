(1) here if want to set specific screen as start screen just move it at first
------------------------------------------------------------------------------

    import { createNativeStackNavigator } from '@react-navigation/native-stack'
    import PaymentScreen from '../screens/PaymentScreen';
    import HomeScreen from '../screens/HomeScreen';

    const MainStackNavigator = () => {
        const Stack = createNativeStackNavigator();

        // here 'Home' screen will be the initial screen
        return (
            <Stack.Navigator>
                <Stack.Screen name="Home" component={HomeScreen} />
                <Stack.Screen name="Payment" component={PaymentScreen} options={{ headerShown: false }} />
            </Stack.Navigator>
        )
    }

    export default MainStackNavigator

