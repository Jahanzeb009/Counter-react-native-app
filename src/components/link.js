import { Linking, Text, Vibration, View } from "react-native"
import React, { useState } from 'react'
import { useNavigation, useTheme } from "@react-navigation/native"
import { TouchableRipple } from "react-native-paper"


export let LinkInButton = ({ text, navigation, link, fontSize, underline, mb, ml, mr, mt, tf, b, br, m }) => {

    const { colors } = useTheme()

    const { navigate } = useNavigation()

    let font = fontSize ? fontSize : 16
    let under = underline ? 'none' : 'underline'

    const [color, setcolor] = useState('#3496cf')

    let OnPress = () => {
        if (navigation) {
            navigate(navigation)
        } else if (link) {
            Linking.openURL(link)
        }
        Vibration.vibrate([2, 2, 2, 2])
    }

    return (
        <TouchableRipple
            borderless
            activeOpacity={0.6}
            onPress={() => OnPress()}
            rippleColor="#13141530"
            style={{
                padding: 5,
                marginLeft: ml,
                marginTop: mt,
                marginRight: mr,
                marginBottom: mb,
                borderRadius: br ? br : 16,
                margin: m,
                alignItems: 'center',
                paddingHorizontal: 10,
                justifyContent: 'center',
                backgroundColor: colors.border + 60,
            }}
            onPressIn={() => (setcolor('#3465cf'))}
            onPressOut={() => setcolor('#3496cf')}
        >
            <View >
                <Text style={{ textDecorationLine: under, color: color, fontSize: font, textTransform: tf ? 'uppercase' : 'none', fontWeight: b ? 'bold' : 'normal' }} >
                    {text}
                </Text>
            </View>
        </TouchableRipple >
    )
}