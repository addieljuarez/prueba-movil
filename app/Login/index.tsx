import { useStoreLogin, useStoreTask } from '@/app/Stores/useStore';
import { useRouter } from 'expo-router';
import { useState } from "react";
import { ImageBackground, Text, TextInput, View } from "react-native";
import Toast from 'react-native-toast-message';
import ButtonCustom from '../Components/ButtonCustom';
import { schemaLogin } from "../Schemas/user";
import users from '../Stores/usuarios.json';
import StyleLogin from './index.styles';

export default function LoginPage() {
    const router = useRouter();
    const [email, setEmail] = useState('admin@example.com')
    const [password, setPassword] = useState('th1s1sadm1n')
    // const [email, setEmail] = useState('user1@example.com')
    // const [password, setPassword] = useState('password123')


    const updateLogin = useStoreLogin((state) => state.setIsLoggedIn)
    const setUser = useStoreLogin(state => state.setUser)
    const setIsLoading = useStoreTask(state => state.setLoading)

    const onChangeEmail = (text: string) => {
        setEmail(text)
    }

    const onChangePass = (text: string) => {
        setPassword(text)
    }

    const login = () => {
        setIsLoading(true)
        const dataValidation = {
            email: email,
            password: password
        }

        const userValidation = schemaLogin.safeParse(dataValidation)

        if (!userValidation.success) {
            userValidation.error?.errors.map((error) => {
                Toast.show({
                    type: 'error',
                    text1: error.message,
                    position: 'top',
                    visibilityTime: 3000,
                    autoHide: true,
                    topOffset: 50,
                    bottomOffset: 40,
                })
            })
            setIsLoading(false)
            return
        }

        const user = users.find((user) => user.email === email && user.password === password)
        if (!user) {
            Toast.show({
                type: 'error',
                text1: 'Usuario o contraseña incorrectos',
                position: 'top',
                visibilityTime: 3000,
                autoHide: true,
                topOffset: 50,
                bottomOffset: 40,
            })
            setIsLoading(false)
            return
        }

        setTimeout(() => {

            Toast.show({
                type: 'success',
                text1: `Bienvenido ${user.email}`,
                position: 'top',
                visibilityTime: 3000,
                autoHide: true,
                topOffset: 50,
                bottomOffset: 40,
            });
            
            router.replace('/Home/ListTask');
            updateLogin(true);
            setUser(user)
            setIsLoading(false)
            return  
        }, 3000)
       
    }   
    return (
        <ImageBackground 
            style={StyleLogin.mainContainer}
            source={require('@/assets/backLogin.png')}
            
        >
            <View style={StyleLogin.container}>
                <Text style={StyleLogin.textTitle}>Organizador</Text>
                <Text style={StyleLogin.textTitle}>de Tareas</Text>
                <TextInput style={StyleLogin.inputForm}
                    placeholder='Correo electrónico'
                    onChangeText={onChangeEmail}
                    value={email}/>
                <TextInput style={StyleLogin.inputForm}
                    placeholder='Contraseña'
                    secureTextEntry={true}
                    onChangeText={onChangePass}
                    value={password}/>
                <ButtonCustom 
                    onPressFunction={login} 
                    title='Entrar' 
                    image={require('../../assets/ArrowLeft.png')}
                    styleButton={{top: 5}}
                />
            </View>
            
        </ImageBackground>
    )
}
