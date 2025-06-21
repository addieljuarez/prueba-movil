import { useState } from "react";
import { Button, Text, TextInput, View } from "react-native";
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { schemaLogin } from "./chemas/user";

export default function TestWindowPage1() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    

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

        console.log('userValidation', userValidation) 
    }    
  return (
    <SafeAreaProvider>
        <SafeAreaView style={{
        flex: 1
    }}>
            <View style={{ flex: 1, alignItems: 'center',justifyContent: 'center', borderColor: 'red', borderWidth:1 }}>
                <Text>Organizador de tareas</Text>
                <TextInput style={{
                        height: 40,
                        margin: 12,
                        borderWidth: 1,
                        padding: 10,
                    }}
                    onChangeText={onChangeEmail}
                    value={email}/>
                <TextInput style={{
                        height: 40,
                        margin: 12,
                        borderWidth: 1,
                        padding: 10,
                    }}
                    secureTextEntry={true}
                    onChangeText={onChangePass}
                    value={password}/>
                <Button
                    title="Entrar"
                    onPress={login}
                />
            </View>
            
        </SafeAreaView>
    </SafeAreaProvider>
    
  );
}