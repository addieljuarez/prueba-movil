import { ImageBackground } from "expo-image";
import { useRouter } from 'expo-router';
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useStoreLogin, useStoreTask } from "../Stores/useStore";

type HeaderCustomProps = {
    back?: boolean;
    title?: string
    logOut?: boolean
    children?: React.ReactNode;
    isList?: boolean
}

export default function HeaderCustom(props: HeaderCustomProps){
    const router = useRouter();

    const backPage = () => {
        router.back()
    }

    const logout = () => {
        useStoreLogin.setState({ isLoggedIn: false, user: null })
        useStoreTask.setState({ data: [], loading: false, success: false, error: false })
        router.replace('/Login')
    }

    return(
        <ImageBackground
            source={require('../../assets/header1.png')}
            style={Style.backImage}
        >
            <View style={Style.containerBar}>
                {props.back && (
                    <TouchableOpacity 
                        onPress={backPage} 
                        style={Style.buttons}
                    >
                        <ImageBackground 
                            source={require('../../assets/back.png')}
                            style={Style.back}
                            resizeMode="contain"
                        />
                    </TouchableOpacity>
                )}
                {!props.back && (
                    <View style={Style.buttons}/>
                )}
                <Text style={Style.title}>
                    {props.title}
                </Text>
                <TouchableOpacity onPress={logout} style={[ Style.signout]}>
                    <ImageBackground 
                        source={require('../../assets/logout.png')}
                        style={Style.back}
                        resizeMode="contain"
                    />
                </TouchableOpacity>
            </View>
            {props.isList && (
                <>
                    <View style={Style.viewImages}>
                        <ImageBackground 
                            source={require('../../assets/clock.png')}
                            style={Style.imagesCenter}
                            resizeMode="contain"
                        />
                        <ImageBackground 
                            source={require('../../assets/calendar.png')}
                            style={Style.imagesCenter}
                            resizeMode="contain"
                        />
                    </View>
                </>
            )}
            {!props.isList && (
                <>
                    <View style={Style.viewImageDetail}>
                        <ImageBackground 
                            source={require('../../assets/backHeader.png')}
                            style={Style.imageDetail}
                            resizeMode="contain"
                        />
                    </View>
                </>
            )}
            {props.children}
        </ImageBackground>
    )
}


const Style = StyleSheet.create({
    backImage: {
        shadowColor: 'rgba(0, 0, 0, 0.60)',
        shadowOffset: {width: -2, height: 10},
        shadowOpacity: 0.2,
        shadowRadius: 3,
        height: 300,
    },
    back: {
        width: 18,
        height: 18,
        resizeMode: 'contain',
    },
    buttons: {
        height: 30,
        width: 30,
        alignItems: 'center',
        justifyContent: 'center',
        left: 10
    },
    containerBar: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    title: {
        fontSize: 15,
        fontWeight: 'bold',
    },
    signout: {
        height: 30,
        width: 30,
        alignItems: 'center',
        justifyContent: 'center',
        right: 10
    },
    viewImages: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 15
    },
    imagesCenter: {
        width: 45,
        height: 45,
        resizeMode: 'contain',
        justifyContent: 'center',
        alignItems: 'center'
    },
    viewImageDetail: {
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1
    },
    imageDetail: {
        width: 180,
        height: 180,
        resizeMode: 'contain',
        justifyContent: 'center',
        alignItems: 'center'
    }
})