(1) First Is to create safe area context provider component
--------------------------------------------------------------

    src/views/SafeAreaContext.tsx
    -------------------------------

    import { Platform, StatusBar, StyleProp, StyleSheet, Text, ViewStyle, View } from 'react-native'
    import React from 'react'
    import { SafeAreaProvider } from 'react-native-safe-area-context'
    import { AppColors } from '../../styles/colors'

    interface Props {
        children: React.ReactNode,
        style?: ViewStyle
    }
    const SafeAreaContext: React.FC<Props> = ({ children, style }) => {
        return (
            <SafeAreaProvider style= { styles.safeArea } >
                <View style={ [styles.container, style] }>
                    { children }
                </View>
            </SafeAreaProvider>
        )
    }

    export default SafeAreaContext

    const styles = StyleSheet.create({
        safeArea: {
            flex: 1,
            backgroundColor: AppColors.white,
            paddingTop: Platform.OS == 'android' ? StatusBar.currentHeight || 0 : 0

        },
        container: {
            flex: 1
        }
    })

(2) second step is to wrap the root with the provider
-------------------------------------------------------

    App.tsx
    ---------

    import { Text, View } from 'react-native';
    import SafeAreaContext from './src/components/views/SafeAreaContext';


    export default function App() {
        return (
            <SafeAreaContext style= {{ justifyContent: "flex-start", alignItems: "center" }}>
                <View>
                    <Text>ddd </Text>
                </View>
            </SafeAreaContext>
        );
    }

(3) Improvement: Create Constant For Check The Platform
---------------------------------------------------------

    src/constants/constants.ts
    ---------------------------

    import { Platform } from "react-native";

    export const IS_ANDROID = Platform.OS === 'android'
    export const IS_IOS = Platform.OS === 'ios'


    src/view/SafeAreaContext.tsx
    ------------------------------

    const styles = StyleSheet.create({
        safeArea: {
            flex: 1,
            backgroundColor: AppColors.white,
            paddingTop: IS_ANDROID ? StatusBar.currentHeight || 0 : 0
        },
        container: {
            flex: 1
        }
    })


(4) Final Version Of SafeAreaContext
----------------------------------------

    
    src/views/SafeAreaContext.tsx
    -------------------------------
    
    import { StyleSheet, View, ViewStyle } from 'react-native'
    import React from 'react'
    import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context'
    import { AppColors } from '../../styles/colors'

    interface Props {
        children: React.ReactNode,
        style?: ViewStyle
    }
    const SafeAreaContext: React.FC<Props> = ({ children, style }) => {
        return (
            <SafeAreaProvider style={styles.safeArea}>
                <SafeAreaView style={[styles.container, style]}>
                    {children}
                </SafeAreaView>
            </SafeAreaProvider>
        )
    }

    export default SafeAreaContext

    const styles = StyleSheet.create({
        safeArea: {
            flex: 1,
            backgroundColor: AppColors.white,
            //paddingTop: IS_ANDROID ? StatusBar.currentHeight || 0 : 0

        },
        container: {
            flex: 1
        }
    })
