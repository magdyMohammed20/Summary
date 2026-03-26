(1) Basic Scroll View
--------------------------

    import { StatusBar } from 'expo-status-bar';
    import { StyleSheet, Button, View, Alert, TouchableOpacity, Text, Pressable, Image, ScrollView } from 'react-native';

    export default function App() {
    return (
        <View>
            <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
                <Button title='Click' onPress={() => Alert.alert('Hellow Me')} />
                <TouchableOpacity>
                    <Image source={require('./assets/icon.png')} style={styles.imgStyle} />
                        </TouchableOpacity>
                        
                <Pressable>
                    <Text>Click</Text>
                </Pressable>

                <TouchableOpacity>
                    <Image source={require('./assets/icon.png')} style={styles.imgStyle} />
                </TouchableOpacity>
                        
                <Pressable>
                    <Text>Click</Text>
                </Pressable>
                        
            </ScrollView>
                        
            <StatusBar style="auto" />
        </View>
    );
    }

    const styles = StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: '#fff',
            alignItems: 'center',
            justifyContent: 'center',
            marginTop: 50
        },
        imgStyle: { width: 300, height: 400, marginTop: 20 }
    });
