(1) Ways Of Set Title For Details Screen (EX: Product Details Screen)
-----------------------------------------------------------------------

    import { Stack, useLocalSearchParams, useNavigation } from 'expo-router'
    import { useEffect } from 'react'
    import { StyleSheet, Text, View } from 'react-native'

    const ChatDetails = () => {
        const { title } = useLocalSearchParams()

        // First Way
        const navigation = useNavigation()

        // First Way
        useEffect(() => {
            navigation.setOptions({ headerTitle: title })
        }, [title])

        return (
            <View>
                {/* Second Way */}
                <Stack.Screen options={{ title: String(title) || 'Messages' }} />
                <Text style={{ color: '#FFF' }}>{id}</Text>
                <Text style={{ color: '#FFF' }}>{title}</Text>
            </View>
        )
    }

    export default ChatDetails