(1) Get Current Platform Name In Template And Style
---------------------------------------------------------

    import { StatusBar } from 'expo-status-bar';
    import { StyleSheet, View, Text, ScrollView, Platform } from 'react-native';

    export default function App() {
        return (
            <View >
                <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
                    <Text>{Platform.OS == 'android' ? 'Android' : Platform.OS}</Text>
                </ScrollView>
                
                <StatusBar style="auto" />

            </View>
        );
    }

    const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Platform.OS == 'android' ? "#F00" : "#00F",
        alignItems: 'center',
        justifyContent: 'center',
    },
    });
