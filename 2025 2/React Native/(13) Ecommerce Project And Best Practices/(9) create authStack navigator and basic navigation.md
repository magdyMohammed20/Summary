(1) First Is Normally Install React Navigation From Previous Lessons

(2) create the 'AuthStack' For 'Sign in' And 'Sign Up' screens
-----------------------------------------------------------------

    src/navigation/AuthStack.tsx
    ------------------------------

    import { createNativeStackNavigator } from '@react-navigation/native-stack'
    import SignInScreen from '../screens/auth/SignInScreen';
    import SignUpScreen from '../screens/auth/SignUpScreen';

    const AuthStack = () => {
        const Stack = createNativeStackNavigator();


        return (
            <Stack.Navigator initialRouteName='SignIn' screenOptions={{
                headerShown: false
            }} >
                <Stack.Screen name="SignIn" component={SignInScreen} />
                <Stack.Screen name="SignUp" component={SignUpScreen} />
            </Stack.Navigator>
        )
    }

    export default AuthStack


(3) In 'App.tsx' Use the AuthStack
-------------------------------------

    import { NavigationContainer } from '@react-navigation/native';
    import SafeAreaContext from './src/components/views/SafeAreaContext';
    import FlashMessage from 'react-native-flash-message';
    import AuthStack from './src/navigation/AuthStack';


    export default function App() {
        return (
            <SafeAreaContext>
                <FlashMessage position={'bottom'} />
                <NavigationContainer>
                    <AuthStack />
                </NavigationContainer>
            </SafeAreaContext>
        );
    }

