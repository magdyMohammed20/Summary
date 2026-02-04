(1) create the component
---------------------------

    src/components/button/AppButton.tsx
    ------------------------------------

    import { GestureResponderEvent, StyleSheet, Text, TouchableOpacity, TextStyle } from 'react-native'
    import { AppColors } from '../../styles/colors';
    import AppText from '../text/AppText';
    import { vs } from 'react-native-size-matters';

    interface Props {
        title: string;
        onPress?: (event: GestureResponderEvent) => void;
        backgroundColor?: string;
        textColor?: string,
        style?: TextStyle | TextStyle[],
        textStyle?: TextStyle,
        disabled?: boolean
    }

    const AppButton: React.FC<Props> = ({
        title,
        onPress,
        style,
        textStyle,
        backgroundColor = AppColors.primary,
        textColor = AppColors.white,
        disabled = false
    }) => {
        return (
            <TouchableOpacity activeOpacity= { .7} onPress = { onPress }
                style = {
                    [styles.button, style,
                    { backgroundColor: disabled ? AppColors.disabledGray : backgroundColor }]}
                disabled = { disabled } >
                <AppText style={ [{ color: textColor, ...textStyle }] }>
                    { title }
                </AppText>
            </TouchableOpacity>
            )
        }

    export default AppButton

    const styles = StyleSheet.create({
        button: {
            borderRadius: 100,
            height: vs(30),
            width: 100,
            justifyContent: "center",
            alignItems: "center"
        }
    })


    HomeScreen.tsx
    -----------------

    <View style={ styles.container }>
        <AppButton onPress={ () => showAlert() } title = 'Click' textStyle = {{ }} />
    </View>