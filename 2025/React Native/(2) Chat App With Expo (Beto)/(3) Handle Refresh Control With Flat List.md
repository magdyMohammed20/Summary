(1) Handle Refresh Control With Flat List
---------------------------------------------

    import { chatRooms } from '@/utils/test-data'
    import { useAuth } from '@clerk/clerk-expo'
    import { Link } from 'expo-router'
    import { useState } from 'react'
    // 1- Import RefreshControl
    import { FlatList, RefreshControl, StyleSheet, View } from 'react-native'
    import { SafeAreaView } from 'react-native-safe-area-context'

    const index = () => {
        const { signOut } = useAuth()
        // 2- Create refreshing state
        const [refreshing, setRefreshing] = useState(false)
        const handleSignOut = async () => {
            try {
                await signOut()
            } catch (err) {
                console.log(err)
            }
        }

        // 3- Create handleRefresh function
        const handleRefresh = () => {
            setRefreshing(true)

            setTimeout(() => {
                setRefreshing(false)
            }, 2000)
        }

        // 4- Pass refreshing and handleRefresh to RefreshControl in FlatList
        return (
            <SafeAreaView style={{ flex: 1, backgroundColor: '#000' }}>
                <View style={{ flex: 1, padding: 20 }}>
                    <FlatList
                        keyExtractor={(item) => String(item.id)}
                        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />}
                        data={chatRooms} renderItem={({ item }) => <Link style={{ color: '#FFF' }} href={
                            {
                                pathname: `/[chat]`,
                                params: {
                                    id: item.id
                                }
                            }
                        }

                        >{item.title}</Link>}
                    />
                </View>
                
            </SafeAreaView>
        )
    }

    export default index

