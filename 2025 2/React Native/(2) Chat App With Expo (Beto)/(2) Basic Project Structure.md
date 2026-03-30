(1) Basic Project Structure
-------------------------------

    app
        - (auth)
            - index.tsx [Normal React Native Component]
            - _layout.tsx

        - (chat)
            - index.tsx [Normal React Native Component]
            - _layout.tsx

        - _layout.tsx [main layout That Can Control User Is Authed Or Not]


    - utils [Handle Clerk Cache]
        cache.ts



    app/_layout.tsx
    -----------------

    import { tokenCache } from '@/utils/cache';
    import { ClerkLoaded, ClerkProvider } from '@clerk/clerk-expo';
    import { DarkTheme, ThemeProvider } from '@react-navigation/native';
    import { Slot } from 'expo-router';

    export default function RootLayout() {
        const publishableKey = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY || undefined

        if (!publishableKey) {
            throw new Error("No Key Founded")

        }
        return (
            <ClerkProvider
                publishableKey={publishableKey}
                tokenCache={tokenCache}
            >
                <ClerkLoaded>
                    <ThemeProvider value={DarkTheme}>
                    <Slot />
                    </ThemeProvider>
                </ClerkLoaded>
            </ClerkProvider>
        );
    }



    utils/cache.ts
    ----------------

    import { TokenCache } from "@clerk/clerk-expo";
    import * as SecureStore from "expo-secure-store";
    import { Platform } from "react-native";

    export const createTokenCache = (): TokenCache => {
        return {
            async getToken(key: string) {
                try {
                    const item = await SecureStore.getItemAsync(key);

                    if (item) {
                        console.log(`${key} Was Used`)
                    } else {
                        console.log(`No Values Stored Under Key ${key}`)
                    }
                    return item;
                } catch (err) {
                    console.error("Error getting token from SecureStore", err);
                    return null;
                }
            },

            async saveToken(key: string, value: string) {
                try {
                    await SecureStore.setItemAsync(key, value);
                } catch (err) {
                    console.error("Error saving token to SecureStore", err);
                }
            },

            async clearToken(key: string) {
                try {
                    await SecureStore.deleteItemAsync(key);
                } catch (err) {
                    console.error("Error clearing token from SecureStore", err);
                }
            },
        }
    };

    // Secure Store Not Supported For Web
    export const tokenCache = Platform.OS !== "web" ? createTokenCache() : undefined


    app/(auth)/_layout.tsx
    -----------------------

    import { useUser } from '@clerk/clerk-expo';
    import { Redirect, Stack } from 'expo-router';

    export default function RootLayout() {

        const { isSignedIn } = useUser()

        if (isSignedIn) {
            return <Redirect href={'/(chat)'} />
        }


        return (
            <Stack>
                <Stack.Screen name='index' />
            </Stack>
        );
    }


    app/(chat)/_layout.tsx
    -----------------------

    import { useUser } from '@clerk/clerk-expo';
    import { Redirect, Stack } from 'expo-router';

    export default function RootLayout() {

        const { isSignedIn } = useUser()

        if (!isSignedIn) {
            return <Redirect href={ '/(auth)' } />
        }


        return (
            <Stack>
                <Stack.Screen name= 'index' />
            </Stack>
        );
    }


    app/(auth)/index.tsx
    ---------------------

    import React from 'react'
    import { StyleSheet, Text, View } from 'react-native'
    import { SafeAreaView } from 'react-native-safe-area-context'

    const index = () => {
        return (
            <SafeAreaView style= { styles.container } >
                <View>
                    <Text style={ { color: 'white' } }> Auth </Text>
                </View>
            </SafeAreaView>
        )
    }

    export default index

    const styles = StyleSheet.create({
        container: {
            flex: 1,
            justifyContent: "center",
            alignItems: "center"
        }
    })