(1) Keybpard Avoiding View Sample
------------------------------------

    import AppInput from '@/components/AppInput'
    import { colors } from '@/utils/colors'
    import { useHeaderHeight } from '@react-navigation/elements'
    import { useLocalSearchParams, useNavigation } from 'expo-router'
    import { useEffect } from 'react'
    import { FlatList, KeyboardAvoidingView, Platform, StyleSheet, Text, View } from 'react-native'
    import { SafeAreaView } from 'react-native-safe-area-context'

    const ChatDetails = () => {
        const { id, title } = useLocalSearchParams()
        const headerHeight = Platform.OS === 'ios' ? useHeaderHeight() + 45 : 0
        
        const navigation = useNavigation()

        useEffect(() => {
            navigation.setOptions({ headerTitle: title + ' Chat' })
        }, [title])

        return (
            <SafeAreaView style={{ flex: 1 }} edges={['bottom']}>

                <KeyboardAvoidingView style={{ flex: 1 }} behavior='padding' keyboardVerticalOffset={headerHeight}>
                    <FlatList data={[]} renderItem={({ item }) => <Text>{item.content}</Text>} />

                    <View>
                        <AppInput placeholder='Type A Message' style={{ height: 22, color: colors.gray }} />
                    </View>
                </KeyboardAvoidingView>

            </SafeAreaView>
        )
    }

    export default ChatDetails

