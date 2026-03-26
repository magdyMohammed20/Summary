(1) 3 Ways To Handle Dimensions Of Views
-------------------------------------------
==> Percentage
==> Dimensions
==> Libs

(2) Percentage
------------------
==> Will Make Red View That Have 'width' And Height Using Percentage From Screen
    
    import { StatusBar } from 'expo-status-bar';
    import { StyleSheet, View } from 'react-native';

    export default function App() {
        return (
                <View style={styles.container}>
                
                    <View style={{
                        backgroundColor: 'red',
                        width: '100%',
                        height: '50%'
                    }}>

                    </View>
                    <StatusBar style="auto" />

                </View>
            );
    }

    const styles = StyleSheet.create({
        container: {
            flex: 1,
            alignItems: 'center'
        },
    });


(2) Dimensions
---------------------

    import { StatusBar } from 'expo-status-bar';
    import { Dimensions, StyleSheet, View } from 'react-native';

    export default function App() {

        const PHONE_HEIGHT = Dimensions.get('screen').height;
        const PHONE_WIDTH = Dimensions.get('screen').width
            return (
                <View style= { styles.container } >

                    <View style={
                        {
                            backgroundColor: 'red',
                                width: PHONE_WIDTH / 2, // Like 50%
                                    height: PHONE_HEIGHT / 2 // Like 50%
                        }
                    }>

                    </View>
                    <StatusBar style = "auto" />

                </View>
        );
    }

    const styles = StyleSheet.create({
        container: {
            flex: 1,
            alignItems: 'center'
        },
    });


(4) Libs : (react-native-size-matters)
------------------------------------------
==> npm i react-native-size-matters
==> Here Will Make (width And Height) Same In All Different Screens Sizes


    import { StatusBar } from 'expo-status-bar';
    import { Dimensions, StyleSheet, View } from 'react-native';
    import { scale, verticalScale } from 'react-native-size-matters'

    export default function App() {


        return (
            <View style= { styles.container } >

                <View style={
                    {
                        backgroundColor: 'red',
                            width: scale(300),
                                height: verticalScale(500)
                    }
                }>

                </View>
                <StatusBar style = "auto" />

            </View>
        );
    }

    const styles = StyleSheet.create({
        container: {
            flex: 1,
            alignItems: 'center'
        },
    });


(5) In (react-native-size-matters) We Can Replace 'scale' With 's' And 'verticalScale' With 'vs'
--------------------------------------------------------------------------------------------------

    import { s, vs } from 'react-native-size-matters'

    <View style={
        {
            backgroundColor: 'red',
            width: s(300),
            height: vs(500)
        }
    }>

    </View>