(1) create the textInput component
------------------------------------

    src/components/input/AppTextInput.tsx
    ----------------------------------------

    import { KeyboardType, StyleProp, StyleSheet, Text, TextInput, TextStyle, View } from 'react-native'
    import React from 'react'
    import { s, vs } from 'react-native-size-matters';
    import { AppColors } from '../../styles/colors';

    interface Props {
        value: string;
        onChangeText: (text: string) => void;
        placeholder: string;
        secureTextEntry?: boolean;
        keyboardType?: KeyboardType;
        style?: StyleProp<TextStyle>
    }
    const AppTextInput: React.FC<Props> = ({ value, onChangeText, placeholder, secureTextEntry, keyboardType, style }) => {
        return (
            <TextInput
                value={value}
                onChangeText={onChangeText}
                placeholder={placeholder}
                secureTextEntry={secureTextEntry}
                keyboardType={keyboardType}
                style={[style, styles.textInput]}
            />
        )
    }

    export default AppTextInput

    const styles = StyleSheet.create({
        textInput: {
            fontSize: s(14),
            borderWidth: s(1),
            borderColor: AppColors.blueGray,
            height: vs(30),
            width: '100%',
            paddingVertical: vs(5),
            paddingHorizontal: s(10),
            borderRadius: s(20),
            marginTop: vs(10)
        }
    })


    HomeScreen.tsx
    ----------------

    const [userName, setUserName] = useState<string>('');

    <AppTextInput placeholder='Enter User Name' keyboardType='default' value={userName} onChangeText={(text) => setUserName(text)} />