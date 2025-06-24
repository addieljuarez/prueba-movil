import { useStoreLogin } from '@/app/Stores/useStore';
import { useRouter } from 'expo-router';
import { useState } from "react";
import { Button, Text, TextInput, View } from "react-native";
import Toast from 'react-native-toast-message';
import { schemaLogin } from "../Schemas/user";
import users from '../Stores/usuarios.json';
import StyleLogin from './index.styles';

export default function LoginPage() {
    const router = useRouter();
    // const [email, setEmail] = useState('admin@example.com')
    // const [password, setPassword] = useState('th1s1sadm1n')
    const [email, setEmail] = useState('user1@example.com')
    const [password, setPassword] = useState('password123')


    const updateLogin = useStoreLogin((state) => state.setIsLoggedIn)
    const setUser = useStoreLogin(state => state.setUser)

    const onChangeEmail = (text: string) => {
        setEmail(text)
    }

    const onChangePass = (text: string) => {
        setPassword(text)
    }

    const login = () => {
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
            return
        }
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

        return  
    }   
    return (
        <View style={StyleLogin.mainContainer}>
            <Text>Organizador de tareas</Text>
            <TextInput style={StyleLogin.inputForm}
                onChangeText={onChangeEmail}
                value={email}/>
            <TextInput style={StyleLogin.inputForm}
                secureTextEntry={true}
                onChangeText={onChangePass}
                value={password}/>
            <Button
                title="Entrar"
                onPress={login}
            />
        </View>
    )
}
