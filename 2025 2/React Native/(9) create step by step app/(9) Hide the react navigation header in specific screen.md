(1) Hide the react navigation header in specific screen
----------------------------------------------------------
==> here we set 'headerShown: false' for the Payment screen in the navigator configuration.


    const RootStack = createNativeStackNavigator({
        initialRouteName: 'Home',
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
                    title: 'Payment Page',
                    headerShown: false
                }
            },
        }
    })