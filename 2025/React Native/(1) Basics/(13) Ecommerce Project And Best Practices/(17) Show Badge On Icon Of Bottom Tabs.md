(1) Show Badge For Bottom Tabs
---------------------------------
==> here we will show cart length on cart icon


    const BottomTabs = () => {
        const Tab = createBottomTabNavigator()
        const { cart } = useSelector((state: RootState) => state.cart)

        return (
            <Tab.Navigator>
                <Tab.Screen name='Home' component={HomeScreen} />
                <Tab.Screen name='Cart' component={CartScreen} options={{
                    tabBarBadge: cart.length
                }} />
                <Tab.Screen name='Profile' component={ProfileScreen} />

            </Tab.Navigator>
        )
    }

    export default BottomTabs

