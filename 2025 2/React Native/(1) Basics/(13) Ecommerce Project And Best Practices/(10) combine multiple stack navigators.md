(1) now if we have screens for 'auth' and another screens So we can combine the stacks With Another Stack Or With Bottom Tabs in another main stack
---------------------------------------------------------------------------------------------------------------------------------------------------------

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
            }}>
                <Stack.Screen name="SignIn" component={SignInScreen} />
                <Stack.Screen name="SignUp" component={SignUpScreen} />
            </Stack.Navigator>
        )
    }

    export default AuthStack


    src/navigation/BottomTabs.tsx
    -------------------------------

    import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
    import { Ionicons } from '@expo/vector-icons'
    import ProfileScreen from '../screens/profile/ProfileScreen'
    import HomeScreen from '../screens/home/HomeScreen'
    import SettingsScreen from '../screens/settings/SettingsScreen'

    const BottomTabs = () => {
        const Tab = createBottomTabNavigator()

        return (
            <Tab.Navigator screenOptions={({ route }) => ({

                sceneStyle: { backgroundColor: '#eee' },
                tabBarIcon: ({ focused, color, size }) => {
                    let iconName: keyof typeof Ionicons.glyphMap;
                    switch (route.name) {
                        case 'Home':
                            iconName = focused ? 'home' : 'home-outline';
                            break;
                        case 'Settings':
                            iconName = focused ? 'settings' : 'settings-outline';
                            break;
                        case 'Profile':
                            iconName = focused ? 'person' : 'person-outline';
                            break;
                        default:
                            iconName = 'home';
                    }

                    return <Ionicons name={iconName} size={size} color={color} />;
                }

            })}>
                <Tab.Screen name='Home' component={HomeScreen} />
                <Tab.Screen name='Profile' component={ProfileScreen} />
                <Tab.Screen name='Settings' component={SettingsScreen} />

            </Tab.Navigator>
        )
    }

    export default BottomTabs


    src/navigation/MainAppStack.tsx (here we combine the AuthStack and BottomTabs)
    ---------------------------------

    import { createNativeStackNavigator } from '@react-navigation/native-stack'
    import BottomTabs from './BottomTabs';
    import AuthStack from './AuthStack';

    const MainAppStack = () => {
        const Stack = createNativeStackNavigator();


        return (
            <Stack.Navigator initialRouteName='AuthStack' screenOptions={{
                headerShown: false
            }} >
                <Stack.Screen name="AuthStack" component={AuthStack} />
                <Stack.Screen name="MainStack" component={BottomTabs} />
            </Stack.Navigator>
        )
    }

    export default MainAppStack


    App.tsx (call the MainAppStack Only in App.tsx for make all screens available)
    ----------

    import { NavigationContainer } from '@react-navigation/native';
    import SafeAreaContext from './src/components/views/SafeAreaContext';
    import FlashMessage from 'react-native-flash-message';
    import AuthStack from './src/navigation/AuthStack';
    import BottomTabs from './src/navigation/BottomTabs';
    import MainAppStack from './src/navigation/MainAppStack';


    export default function App() {
        return (
            <SafeAreaContext>
                <FlashMessage position={'bottom'} />
                <NavigationContainer>
                    <MainAppStack />
                </NavigationContainer>
            </SafeAreaContext>
        );
    }
