(1) Create Bottom Sheet That Contains All Languages Radios
-------------------------------------------------------------
==> yarn add react-native-modalize react-native-gesture-handler
==> Create Component Of Bottom Action Sheet
==> Call The Component And Pass Required Props



    LanguageBottomSheet.tsx
    ----------------------------

    import React, { forwardRef, useImperativeHandle, useRef } from 'react';
    import { StyleSheet, View } from 'react-native';
    import { Modalize } from 'react-native-modalize';
    import { FlatListProps } from 'react-native';
    import AppText from '../text/AppText';

    // 1- Types Of Props
    interface BottomSheetToggleProps<ItemT> {
        title?: string; // ✅ This Is Added For Enable Pass 'title' For Bottom Sheet
        modalHeight?: number;
        content?: React.ReactNode;
        flatListProps?: FlatListProps<ItemT>;
    }

    // 2- Exported To Use In Place Of Calling This Component
    export interface BottomSheetToggleRef {
        open: () => void;
        close: () => void;
    }

    const LanguageBottomSheet = forwardRef<
        BottomSheetToggleRef,
        BottomSheetToggleProps<any>
    >(({ title, modalHeight = 300, content, flatListProps }, ref) => {
        const modalizeRef = useRef<Modalize>(null);

        useImperativeHandle(ref, () => ({
            open: () => modalizeRef.current?.open(),
            close: () => modalizeRef.current?.close(),
        }));

        return (
            <Modalize
                ref={modalizeRef}
                modalHeight={modalHeight}
                flatListProps={flatListProps}
                adjustToContentHeight={!flatListProps}
                HeaderComponent={
                    title ? (
                        <View>
                            <AppText variant="bold">{title}</AppText>
                        </View>
                    ) : null
                }
            >
                {!flatListProps && content}
            </Modalize>
        );
    });

    export default LanguageBottomSheet;


    Profile.tsx
    -------------

    import { StyleSheet, View } from 'react-native'
    import React, { useRef } from 'react'
    import AppHeader from '../../components/home/AppHeader'
    import AppText from '../../components/text/AppText'
    import sharedStyle from '../../styles/sharedStyle'
    import ProfileSectionButton from '../../components/profile/ProfileSectionButton'
    import { vs } from 'react-native-size-matters'
    import fonts from '../../styles/fonts'
    import { AppColors } from '../../styles/colors'
    import { useNavigation } from '@react-navigation/native'
    import { useDispatch } from 'react-redux'
    import { AppDispatch, persistor } from '../../store/store'
    import { logout } from '../../store/slices/AuthSlice'
    import LanguageBottomSheet, { BottomSheetToggleRef } from '../../components/global/LanguageBottomSheet'

    const ProfileScreen = () => {
        const navigation = useNavigation<any>()
        const dispatch = useDispatch<AppDispatch>()

        // 1- Ref Of Bottom Sheet
        const bottomSheetRef = useRef<BottomSheetToggleRef>(null);
        const languages = ['En', 'Fr', 'Ar']
        const handleLogout = async () => {
            dispatch(logout())
            await persistor.purge();
        }

        // 2- Handle Open Bottom Sheet
        const handleOpen = () => {
            bottomSheetRef.current?.open()
        }

        return (
            <View style= {{ flex: 1 }
    }>
        <AppHeader />
        < View >
        <View style={ styles.container }>
            <AppText style={ styles.helloStyle }> Hello, Ahmed </AppText>
                </View>

                < View style = { styles.buttonsContainer } >
                    <ProfileSectionButton title="My Orders" onPress = {() => navigation.navigate('myOrdersScreen')} />
                        < ProfileSectionButton title = "Language" onPress = { handleOpen } />
                            <ProfileSectionButton title="Logout" onPress = { handleLogout } />
                                </View>
                                </View>

    {/* BottomSheet MUST be here at the END of the screen */ }
    <LanguageBottomSheet
                    title='Title'
    ref = { bottomSheetRef }
    modalHeight = { 350}
    flatListProps = {{
        data: languages,
            keyExtractor: (item: string) => item,
                renderItem: ({ item }) => (
                    <ProfileSectionButton
                                title= { item }
        onPress = {() => console.log(item)
    }
                            />
                        ),

                    }}
                />
        </View>

        )
    }

    export default ProfileScreen



(2) Animation Config
-----------------------

        <Modalize
            openAnimationConfig={{ spring: { speed: 14, bounciness: 7 }, timing: { duration: 2 } }}

(3) Add 'modalStyle' For Prevent Content Cut
-----------------------------------------------

        <Modalize
            modalStyle={{ paddingBottom: 50 }}