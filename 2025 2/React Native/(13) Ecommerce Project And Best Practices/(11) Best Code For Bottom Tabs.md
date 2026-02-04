(1) Best Code For Bottom Tabs
------------------------------

    src/navigation/BottomTabs.tsx
    -------------------------------

    import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
    import { Ionicons } from '@expo/vector-icons'
    import ProfileScreen from '../screens/profile/ProfileScreen'
    import HomeScreen from '../screens/home/HomeScreen'
    import SettingsScreen from '../screens/settings/SettingsScreen'
    import { s, vs } from 'react-native-size-matters'
    import { AppColors } from '../styles/colors'

    const BottomTabs = () => {
        const Tab = createBottomTabNavigator()

        return (
            <Tab.Navigator screenOptions={({ route }) => ({
                headerShown: false,
                tabBarStyle: {
                    paddingTop: 8,
                    height: vs(65)
                },
                tabBarLabelStyle: { color: '#444', fontSize: s(12), marginTop: 4 },
                tabBarActiveTintColor: AppColors.primary,
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
