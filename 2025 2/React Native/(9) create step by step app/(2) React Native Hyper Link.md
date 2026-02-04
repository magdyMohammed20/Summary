(1) Handle Open hyper link
----------------------------

    import { Linking, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
    import SendSvg from '../assets/SendSvg'
    import { s } from 'react-native-size-matters'
    import { SocialSectionProps } from '../types/contactTypes'

    const SocialButton = ({ link }: SocialSectionProps) => {
        // 1- Create handleOpenLink function For opening the link
        const handleOpenLink = () => {
            if (link) {
                Linking.openURL(link)
            }
        }

        // 2- Use the handleOpenLink function in the onPress event of TouchableOpacity
        return (
            <TouchableOpacity style={styles.sendBtn} onPress={handleOpenLink}>
                <SendSvg />
            </TouchableOpacity>
        )
    }

    export default SocialButton

    const styles = StyleSheet.create({
        sendBtn: {
            backgroundColor: "#1077AF",
            width: s(46),
            height: s(46),
            borderRadius: s(23),
            alignItems: "center",
            justifyContent: "center"
        }
    })