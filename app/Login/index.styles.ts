import { StyleSheet } from "react-native";

const StyleLogin = StyleSheet.create({
    mainContainer : {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-end',
    },
    inputForm: {
        height: 60,
        margin: 12,
        borderWidth: 1,
        padding: 10,
        width: 300,
        borderRadius: 20,
        borderColor: '#5F33E1',
        fontSize: 12,
        backgroundColor: 'white'
    },
    textTitle:{
        fontStyle: "normal",
        fontWeight: 'bold',
        fontSize: 25,
        textShadowColor: 'rgba(0, 0, 0, 0.60)',
        textShadowOffset: {width: 0 , height: 1 },
        textShadowRadius: 4
    },
    container: {
        alignItems: 'center',
        bottom: 80,
    }
})

export default StyleLogin;