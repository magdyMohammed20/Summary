(1) Appwrite Basic Config
----------------------------

    .env.local
    -------------

    EXPO_PUBLIC_APPWRITE_APP_ID=69c8b291000595b01aa9
    EXPO_PUBLIC_APPWRITE_DATABASE_ID=69c8b2a5002b24b5d685


    utils/appwrite.ts
    --------------------

    import { Client, Databases } from 'appwrite'

    // ✅ validate env
    const PROJECT_ID = process.env.EXPO_PUBLIC_APPWRITE_APP_ID!
    const DATABASE_ID = process.env.EXPO_PUBLIC_APPWRITE_DATABASE_ID!

    if (!PROJECT_ID) {
        throw new Error("Appwrite App ID is not defined")
    }

    if (!DATABASE_ID) {
        throw new Error("Appwrite Database ID is not defined")
    }

    const appwriteConfig = {
        endpoint: 'https://nyc.cloud.appwrite.io/v1',
        projectId: PROJECT_ID,
        databaseId: DATABASE_ID,
        collections: {
            chatRooms: "chatrooms",
            messages: "messages",
        },
    }

    const client = new Client()
        .setEndpoint(appwriteConfig.endpoint)
        .setProject(appwriteConfig.projectId)


    const db = new Databases(client)

    export { appwriteConfig, client, db }


    index.tsx (Fetch Data From Appwrite)
    -------------

    import AppButton from '@/components/AppButton'
    import AppText from '@/components/AppText'
    import { appwriteConfig, db } from '@/utils/appwrite'
    import { colors } from '@/utils/colors'
    import { useAuth } from '@clerk/clerk-expo'
    import Entypo from '@expo/vector-icons/Entypo'
    import { Link } from 'expo-router'
    import { useEffect, useRef, useState } from 'react'
    import { Animated, FlatList, RefreshControl, StyleSheet, View } from 'react-native'
    import { Query } from 'react-native-appwrite'
    import { SafeAreaView } from 'react-native-safe-area-context'

    // 1- Skeleton Item
    const SkeletonItem = () => {
        const shimmer = useRef(new Animated.Value(0)).current

        useEffect(() => {
            Animated.loop(
                Animated.sequence([
                    Animated.timing(shimmer, { toValue: 1, duration: 900, useNativeDriver: true }),
                    Animated.timing(shimmer, { toValue: 0, duration: 900, useNativeDriver: true }),
                ])
            ).start()
        }, [])

        const opacity = shimmer.interpolate({ inputRange: [0, 1], outputRange: [0.3, 0.7] })

        return (
            <Animated.View style={[styles.roomContainer, { opacity }]}>
                <View style={{ gap: 8 }}>
                    <View style={styles.skeletonTitle} />
                    <View style={styles.skeletonDesc} />
                </View>
                <View style={styles.skeletonChevron} />
            </Animated.View>
        )
    }

    const index = () => {
        const { signOut } = useAuth()

        const [refreshing, setRefreshing] = useState(false)
        const [chatRooms, setChatRooms] = useState<any[]>([]) // 2- Chat Rooms State
        const [loading, setLoading] = useState(true) // 3- Loading State

        const handleRefresh = () => {
            setLoading(true)
            fetchChatRooms()

        }

        // 4- Fetch Chat Rooms From Appwrite
        const fetchChatRooms = async () => {
            try {
                const { documents, total } = await db.listDocuments(
                    appwriteConfig.databaseId,
                    appwriteConfig.collections.chatRooms,
                    [Query.limit(10)]
                )
                setChatRooms(documents)
            } catch (err) {
                console.log(err)
            } finally {
                setLoading(false)
            }
        }

        useEffect(() => {
            fetchChatRooms()
        }, [])

        // 5- Listen To Real-Time Changes In Chat Rooms
        return (
            <SafeAreaView style={{ flex: 1, backgroundColor: '#000' }}>
                <View style={{ flex: 1, paddingHorizontal: 12 }}>
                    {loading ? (
                        <View style={{ gap: 10, marginTop: 10 }}>
                            {Array.from({ length: 6 }).map((_, i) => (
                                <SkeletonItem key={i} />
                            ))}
                        </View>
                    ) : (
                        <FlatList
                            keyExtractor={(item) => String(item.$id)}
                            contentContainerStyle={{ gap: 10 }}
                            refreshControl={<RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />}
                            data={chatRooms}
                            renderItem={({ item }) => (
                                <Link
                                    style={{ color: '#FFF' }}
                                    href={{ pathname: `/[chat]`, params: { id: item.$id } }}
                                >
                                    <View style={styles.roomContainer}>
                                        <ItemTitleAndDesc title={item.title} description={item.description} />
                                        <AppText>
                                            <Entypo name="chevron-small-right" size={32} color={colors.gray} />
                                        </AppText>
                                    </View>
                                </Link>
                            )}
                        />
                    )}
                </View>
         
            </SafeAreaView>
        )
    }

    export default index


    const ItemTitleAndDesc = ({ title, description }: { title: string; description: string }) => {
        return (
            <View style={{ gap: 8 }}>
                <AppText style={{ color: colors.white, fontWeight: '600', fontSize: 16 }}>
                    {title}
                </AppText>
                <AppText style={{ color: colors.gray, fontWeight: '600', fontSize: 14 }}>
                    {description.slice(0, 30)}...
                </AppText>
            </View>
        )
    }


    new-room.tsx (Create New Room)
    -------------

    import AppInput from '@/components/AppInput'
    import AppText from '@/components/AppText'
    import { appwriteConfig, db } from '@/utils/appwrite'
    import { colors } from '@/utils/colors'
    import { ID } from 'appwrite'
    import { Stack } from 'expo-router'
    import { useState } from 'react'
    import { Platform, Pressable, StyleSheet, View } from 'react-native'

    const NewRoom = () => {
        const [roomDetails, setRoomDetails] = useState({ title: '', description: '' })

        const handleCreateRoom = async () => {
            try {
                const res = await db.createDocument(appwriteConfig.databaseId, appwriteConfig.collections.chatRooms, ID.unique(), roomDetails)
                console.log(JSON.stringify(res, null, 2))
            } catch (err) {
                console.log(err)
            }
        }
        return (
            <>
                <Stack.Screen options={{
                    headerRight: () => <>
                        <Pressable onPressIn={handleCreateRoom} disabled={roomDetails?.title.trim() === ''} onPress={() => console.log(roomDetails)} style={{ paddingHorizontal: 12, ...(Platform.OS == 'android' && styles.androidBtnStyle) }}>
                            <AppText style={{ color: colors.white, fontSize: 14, fontWeight: '600' }}>
                                Create
                            </AppText>
                        </Pressable></>
                }} />
                <View style={styles.container}>
                    <AppText style={styles.title}>New room</AppText>

                    <View style={styles.formContainer}>
                        <View style={styles.inputsContainer}>
                            <AppInput
                                placeholder="Type room title..."
                                value={roomDetails.title}
                                onChangeText={(text) => setRoomDetails({ ...roomDetails, title: text })}
                            />

                            <AppInput
                                containerStyle={{ height: 150 }}

                                placeholder="Type a description..."
                                value={roomDetails.description}
                                onChangeText={(text) => setRoomDetails({ ...roomDetails, description: text })}
                            />
                        </View>


                    </View>
                </View></>
        )
    }

    export default NewRoom
