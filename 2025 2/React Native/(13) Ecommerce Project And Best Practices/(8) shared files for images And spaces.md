(1) Create shared file for images
-----------------------------------

    src/constants/images-paths.ts
    -------------------------------

    export default {
        signInLogo: require('../assets/app-logo.png')
    }


(2) create shared file for padding and spaces
------------------------------------------------

    src/style/sharedStyle.ts
    ---------------------------

    import { vs } from "react-native-size-matters";

    export default {
        sharedHorizontalPadding: vs(25)
    }

(3) usage of shared utilities
-------------------------------

    import { Image, StyleSheet, View } from 'react-native'
    import IMAGES from '../../constants/images-paths'
    import {  vs } from 'react-native-size-matters'
    import sharedStyle from '../../styles/sharedStyle'



    const SignInScreen = () => {
        return (
            <View style= { styles.container } >
                <Image source={ IMAGES.signInLogo } style = { styles.logo } />
            </View>
        )
    }

    export default SignInScreen

    const styles = StyleSheet.create({
        container: {
            padding: sharedStyle.sharedHorizontalPadding
        }
    })