import { ImageBackground, StyleSheet, Text, TouchableOpacity } from "react-native";

type ButtonCustomProps = {
    title: string;
    onPressFunction: () => void;
    image?: object
    styleButton?: object
}

export default function ButtonCustom(props: ButtonCustomProps){
    return(
        <ImageBackground 
            source={require('../../assets/Button.png')}
            resizeMode="contain"
            imageStyle={Style.back}
            style={[props.styleButton]}
        >
            <TouchableOpacity style={Style.touch} onPress={props.onPressFunction}>
                <Text style={Style.text}>{props.title}</Text>
                {props.image && (
                    <ImageBackground 
                        source={props.image }
                        style={Style.iconLeft}
                        resizeMode="contain"
                    />
                )}
            </TouchableOpacity>
        </ImageBackground>
    )
}

const Style = StyleSheet.create({
    touch: {
        height: 60,
        width: 300,
        borderRadius: 20,
        alignItems: 'center',
    },
    text: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
        lineHeight: 55,
    },
    iconLeft: {
        position: 'absolute',
        right: 20,
        top: 15,
        width: 25,
        height: 25,
        resizeMode: 'contain',
    },
    back: {
        borderRadius: 20,
    }
})