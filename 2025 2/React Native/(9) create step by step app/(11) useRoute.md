(1) useRoute
---------------
==> hook which gives access to route object. It's useful when you cannot pass down the route object from props to the component, or don't want to pass it in case of a deeply nested child.


    HomeScreen.tsx
    ----------------

            <Button onPress={() => navigatation.navigate('Payment', {
                name: 'HomeScreen'
            })}>
                Go to Details
            </Button>


    PaymentScreen.tsx
    ----------------

    import { useRoute } from '@react-navigation/native'

        const PaymentScreen = () => {
                
            const route = useRoute<any>();
           
             
                <Text style={styles.headerText}>
                    Comes From {route.params.name}
                            
                </Text>
                
        
                    