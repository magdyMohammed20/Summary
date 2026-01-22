(1) Expo Icons
----------------
==> In React Native We Use 'Expo Vector Icons' 

(2) Usage
-----------

    import { StatusBar } from 'expo-status-bar';
    import { useState } from 'react';
    import { Button, Modal, StyleSheet, Text, View } from 'react-native';
    import AntDesign from '@expo/vector-icons/AntDesign';


    export default function App() {

        const [counter, setCounter] = useState(0)
        const [modalVisible, setmodalVisible] = useState(false)
        
        const increase = () => setCounter(prevCounter => prevCounter + 1)

        const decrease = () => {
            if (counter == 0) {
                setmodalVisible(true)
            } else {
                setCounter(prevCounter => prevCounter - 1)
            }
        }

        return (
            <View style={styles.container}>
            
                <Button title='Increase' onPress={increase}/>
                <Text style={{marginVertical: 20 , fontSize: 30}}>{ counter}</Text>
                <Button title='Decrease' onPress={decrease} />
                
                <Modal visible={modalVisible} animationType='fade'>
                    <AntDesign name="close-circle" size={24} color="black" onPress={() => setmodalVisible(false)}/>
                    <Text>Can't Decrease</Text>
                </Modal>
                <StatusBar style="auto" />

                </View>
            );
    }

    const styles = StyleSheet.create({
        container: {
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center'
        },
    });
