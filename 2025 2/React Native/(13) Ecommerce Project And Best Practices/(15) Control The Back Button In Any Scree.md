(1) Control The Back Button In Any Screen
--------------------------------------------

        <Stack.Navigator initialRouteName='MainStack' screenOptions={{
                    headerShown: false,
                    headerBackButtonDisplayMode: "generic", // Set This For Remove The Stack Title From Beside Of The Back Button In Header
                    headerBackVisible: false, // Set This For Hide The Back Button In Header 
                    headerBackTitle: 'Return' // Change The Text Title Of Back Button 
        }} >
            <Stack.Screen name="AuthStack" component={AuthStack} />
            <Stack.Screen name="MainStack" component={BottomTabs} />
            <Stack.Screen name="checkoutScreen" component={CheckoutScreen} options={{ headerShown: true, title: 'Checkout', headerLeft: () => null, }} />


        </Stack.Navigator>