(1) Bottom Tabs
-----------------
==> npm install @react-navigation/bottom-tabs


    navigation/BottomTabs.tsx
    ---------------------------

        import { StyleSheet } from 'react-native'
        import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
        import HomeScreen from '../screens/HomeScreen';
        import PaymentScreen from '../screens/PaymentScreen';

        const BottomTabs = () => {

            const Tab = createBottomTabNavigator();
            return (
                <Tab.Navigator>
                    <Tab.Screen name="Home" component={HomeScreen} />
                    <Tab.Screen name="Payment" component={PaymentScreen} />
                </Tab.Navigator>
            )
        }

        export default BottomTabs

        const styles = StyleSheet.create({})


    App.tsx
    --------------

    import { StatusBar } from 'expo-status-bar';
    import { StyleSheet, View } from 'react-native';
    import PaymentScreen from './src/screens/PaymentScreen';
    import HomeScreen from './src/screens/HomeScreen';
    import {  NavigationContainer } from '@react-navigation/native';
    import BottomTabs from './src/navigation/BottomTabs';

    export default function App() {
        return (
            <View style={styles.container}>
                <NavigationContainer>
                    <BottomTabs />
                </NavigationContainer>
                <StatusBar style="auto" />
            </View>
        );
    }


(2) Add Icons for Bottom Tabs
-----------------------------

    navigation/BottomTabs.tsx
    ---------------------------

        <Tab.Navigator
            screenOptions={({ route }) => ({
                sceneStyle: { backgroundColor: '#ffffff' },
                tabBarIcon: ({ focused, color, size }) => {
                    let iconName: keyof typeof Ionicons.glyphMap;

                    switch (route.name) {
                        case 'Home':
                            iconName = focused ? 'home' : 'home-outline';
                            break;
                        case 'Payment':
                            iconName = focused ? 'card' : 'card-outline';
                            break;
                        default:
                            iconName = 'home';
                    }

                    return <Ionicons name={iconName} size={size} color={color} />;
                },
                headerShown: false,
            })}
        >

(3) Style Title of Bottom Tabs
--------------------------------

    navigation/BottomTabs.tsx
    ---------------------------

            screenOptions={({ route }) => ({
                tabBarLabelStyle: { color: '#444', fontSize: 12 }


(4) Set Title for Each Bottom Tab
--------------------------------
==> By Use options and title property


    navigation/BottomTabs.tsx
    ---------------------------

            <Tab.Screen name="Home" component={HomeScreen} options={{ title: "Home Screen Man" }} />
            <Tab.Screen name="Payment" component={PaymentScreen} options={{ title: "Payment Screen Man" }} />


(5) Set Active Tint Color for Bottom Tabs Icons
--------------------------------
==> By Use tabBarActiveTintColor And tabBarInactiveTintColor properties inside screenOptions  
==> Note That This will change the label and icon colors but if use 'tabBarLabelStyle' The label color not applied and 'tabBarLabelStyle' will taken
            
            screenOptions={({ route }) => ({               
                tabBarActiveTintColor: 'tomato',
                tabBarInactiveTintColor: 'blue',
            })}


(6) Add Padding to Bottom Tabs
--------------------------------
==> By Use tabBarStyle property inside screenOptions

            screenOptions={({ route }) => ({
                tabBarStyle: {
                    paddingTop: 12
                },
            })}