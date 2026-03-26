(1) Setup i18next and react i18 next
--------------------------------------
==> npm install react-i18next i18next --save
==> Create 'localization' Folder Inside 'src' And Create 'i18n.ts' Inside It And Export i18n Instance
==> Access 'useTranslation' Inside Any Component Or Page to Use 't' For Translate
==> Handle Change Of Language



    src/localization/i18n.ts (Basic Config File)
    -------------------------------

    import i18n from "i18next";
    import { initReactI18next } from "react-i18next";


    const LANGUAGES = {
        en: {
            translation: {
                "empty_cart": "Your Cart Is Empty"
            }
        },
        ar: {
            translation: {
                "empty_cart": "سلة التسوق الخاصة بك فارغة"
            }
        },
        fr: {
            translation: {
                "empty_cart": "Votre panier est vide"
            }
        }
    }

    i18n.use(initReactI18next).init({
        resources: LANGUAGES,
        fallbackLng: "ar",
        defaultNS: "translation",
        ns: ["translation"],
        react: {
            useSuspense: false,
        },
        interpolation: {
            escapeValue: false
        }

    })

    export default i18n


    App.tsx
    ---------

    import { I18nextProvider } from 'react-i18next'; // 1- Import I18nextProvider
    import i18n from './src/localization/i18n'; // 2- Import i18 From The Config File


    export default function App() {


        // 3- Wrap Presist And All With I18nextProvider
        return (
            <GestureHandlerRootView style={{ flex: 1 }}>
                <Provider store={store}>
                    <I18nextProvider i18n={i18n}>
                        <PersistGate loading={null} persistor={persistor}>
                            <SafeAreaContext>
                                <FlashMessage position={'top'} />
                                <NavigationContainer>
                                    <MainAppStack />
                                </NavigationContainer>
                            </SafeAreaContext>
                        </PersistGate>
                    </I18nextProvider>
                </Provider>
            </GestureHandlerRootView>
        );
    }



(2) Usage Of Translations
----------------------------

        import { useTranslation } from 'react-i18next';

        const { t } = useTranslation()

        <EmptyCart 
            title={t('empty_cart')} 
        />


(3) Get Current Language
---------------------------

        import i18n from '../../localization/i18n'


        <AppText>
            {i18n.language}
        </AppText>


(4) Change Language
------------------------

    import i18n from '../../localization/i18n'
    import { DevSettings, I18nManager, StyleSheet, View } from 'react-native'

    const [selectedLanguage, setSelectedLanguage] = useState < String > (i18n.language)

    const languages = [
        {
            title: 'English',
            code: 'en'
        },
        {
            title: 'Frensh',
            code: 'fr'
        }, {
            title: 'العربية',
            code: 'ar'
        }
    ]

    const handleSelectedLanguage = (lang: string) => {
        setSelectedLanguage(lang)
        bottomSheetRef.current?.close();
        await i18n.changeLanguage(selectedLanguage);


        const isRTL = selectedLanguage === 'ar';

        await i18n.changeLanguage(selectedLanguage);

        // For Change App Direction Between RTL And LTR
        if (I18nManager.isRTL !== isRTL) {
            I18nManager.allowRTL(isRTL);
            I18nManager.forceRTL(isRTL);

            // Reload Required For Change Direction
            DevSettings.reload();
        }

    }

    <LanguageBottomSheet       
        flatListProps={{
            data: languages,
            keyExtractor: (item) => item.code,
            renderItem: ({ item }) => (
                <RadioWithLabel 
                    label={item.title} 
                    selected={item.code == selectedLanguage} 
                    onPress={() => handleSelectedLanguage(item.code)} 
                />
            ),

        }}
    />


(5) Use AsyncStorage To Presist Language After Change The Language And After App Reloads
---------------------------------------------------------------------------------------

    import AsyncStorage from "@react-native-async-storage/async-storage";

  const handleConfirmLanguage = async () => {
        bottomSheetRef.current?.close();
        await i18n.changeLanguage(selectedLanguage);

        // 1- Add This Line
        await AsyncStorage.setItem('appLanguage', selectedLanguage);

        const isRTL = selectedLanguage === 'ar';

        if (I18nManager.isRTL !== isRTL) {
            I18nManager.allowRTL(isRTL);
            I18nManager.forceRTL(isRTL);


        }

        DevSettings.reload();
    }



    i18n.ts
    ---------

    import AsyncStorage from "@react-native-async-storage/async-storage";
    import i18n, { LanguageDetectorModule } from "i18next";
    import { initReactI18next } from "react-i18next";
    import en from './en.json'
    import ar from './ar.json'
    import fr from './fr.json'
    const LANGUAGES = {
        en: {
            translation: en
        },
        ar: {
            translation: ar
        },
        fr: {
            translation: fr
        }
    }

    const languageDetector: LanguageDetectorModule = {
        type: 'languageDetector',
        async: true,
        detect: async (callback: Function) => {
            const savedLanguage = await AsyncStorage.getItem('appLanguage');
            callback(savedLanguage || 'fr'); // default if nothing saved
        },
        init: () => { },
        cacheUserLanguage: async (lng: string) => {
            await AsyncStorage.setItem('appLanguage', lng);
        }
    };

    i18n.use(languageDetector).use(initReactI18next).init({
        resources: LANGUAGES,
        fallbackLng: "fr",
        defaultNS: "translation",
        ns: ["translation"],
        react: {
            useSuspense: false,
        },
        interpolation: {
            escapeValue: false
        }

    })

    export default i18n