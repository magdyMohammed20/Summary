(1) Create AppText Component
------------------------------

    src/components/text/AppText.tsx
    -----------------------------------

    import React from 'react'
    import { StyleSheet, Text, TextProps, TextStyle } from 'react-native'
    import { s } from 'react-native-size-matters'

    interface Props extends TextProps {
        children: React.ReactNode,
        style?: TextStyle | TextStyle[],
        variant?: "bold" | "medium" | "thin"
    }

    const AppText: React.FC<Props> = ({ children, style, variant = "medium" }) => {
        return (
            <Text style= { [style, styles[variant]]} >
                { children }
            </Text>
            )
    }

    export default AppText

    const styles = StyleSheet.create({
        bold: {
            fontSize: s(18),
            fontWeight: "bold"
        },
        medium: {
            fontSize: s(16),
            fontWeight: "medium"
        },
        thin: {
            fontSize: s(12),
            fontWeight: "thin"
        }
    })