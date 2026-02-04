(1) Use Fonts
---------------
==> First Download The Required Fonts ttf Files And Put It Inside 'src/assets/fonts' folder
==> Install 'expo fonts' For Load The Fonts 'npx expo install expo-font'
==> In App.tsx load the Files
==> Congratulations Now Can Use The Fonts Directly In App Using 'fontFamily' Property



    src/assets/fonts/Bungee-Regular.ttf
    -------------------------------------

    src/App.tsx
    -------------

    import { NavigationContainer } from '@react-navigation/native';
    import SafeAreaContext from './src/components/views/SafeAreaContext';
    import FlashMessage from 'react-native-flash-message';
    import MainAppStack from './src/navigation/MainAppStack';
    import { useFonts } from 'expo-font'; // 1- Import useFonts Hook
    import { ActivityIndicator } from 'react-native';
    import { AppColors } from './src/styles/colors';


    export default function App() {

        // 2- Use The useFonts Hook
        // Here We Can More Than 1 Font
        const [fontsLoaded] = useFonts({
            'Bingee-Regular': require('./src/assets/fonts/Bungee-Regular.ttf')
        })

        // 3- Show Loader While Font Is Loading
        if (!fontsLoaded) {
            return <ActivityIndicator size={20} color={AppColors.primary} />
        }
        return (
            <SafeAreaContext>
                <FlashMessage position={'bottom'} />
                <NavigationContainer>
                    <MainAppStack />
                </NavigationContainer>
            </SafeAreaContext>
        );
    }


    src/screens/HomeScreen.tsx
    ----------------------------

    <AppText style={{ marginVertical: vs(12), fontFamily: "Bungee" }}>
        Smart E-Commerce
    </AppText>



(2) Handle Fonts Usage To Be Global
-------------------------------------

    src/styles/fonts.ts
    ----------------------

        export default {

            BingeeReg: 'Bingee-Regular',
            FiraSansBold: 'FiraSans-Bold',
            FiraSansMed: 'FiraSans-Medium',
            FiraSansReg: 'FiraSans-Regular'

        }


    src/screens/HomeScreen.tsx
    ----------------------------

            import fonts from '../../styles/fonts'


            <AppText style={{ marginVertical: vs(20), fontFamily: fonts.BingeeReg }} variant='medium'>
                Smart E-Commerce
            </AppText>