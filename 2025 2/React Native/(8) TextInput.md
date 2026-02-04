(1) TextInput
---------------

    import { StatusBar } from 'expo-status-bar';
    import { useState } from 'react';
    import { StyleSheet, TextInput, View, Text } from 'react-native';


    export default function App() {

    ////////////// Controlled Text Input /////////////////
    const [text, setText] = useState<string>('')
    
    const handleChgText = (val:string) => {
        setText(val)
    }


    return (
        <View style={styles.container}>

            {/* keyboardType */}
            <TextInput placeholder='Enter Something' style={styles.input} keyboardType='url' />
            <TextInput placeholder='Enter Something' style={styles.input} keyboardType='numeric' />
            <TextInput placeholder='Enter Something' style={styles.input} keyboardType='numbers-and-punctuation' />


            {/* Password */}
            <TextInput placeholder='Enter Something' style={styles.input} keyboardType='default' secureTextEntry />
            
            {/* Textarea */}
            <TextInput placeholder='Enter Something' style={styles.input} keyboardType='default' multiline />
            
            {/* Disabled */}
            <TextInput placeholder='Enter Something' style={styles.input} keyboardType='default' editable={false} value='Magdy' />

            {/* Controlled Text Input */}
            <Text>{ text}</Text>
            <TextInput placeholder='Enter Something' style={styles.input} keyboardType='default'
                onChangeText={handleChgText}
                value={text} />

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
        input: {
            width: '80%',
            borderWidth: 1,
            borderColor: '#CCC',
            borderRadius: 3,
            paddingStart: 10

        }
    });
