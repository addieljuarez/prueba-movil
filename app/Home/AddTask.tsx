import { useRouter } from 'expo-router';
import { Button, Text, TextInput, View } from "react-native";
import SafeAreaComponent from "../Components/SafeAreaComponent";
// import Collapsible from 'react-native-collapsible';
import { useState } from 'react';
import Collapsible from 'react-native-collapsible';
import { useStoreLogin, useStoreTask } from '../Stores/useStore';

export default function AddTask(){

    const router = useRouter();
    const [collapsed, setCollapsed] = useState(true);

    const sigOut = () => {
        useStoreLogin.setState({ isLoggedIn: false, user: null })
        useStoreTask.setState({ data: [], loading: false, success: false, error: false })
        router.replace('/Login')
    }

    return(
        <SafeAreaComponent>
            <Button 
                title="regresar"
                onPress={() => {
                    router.back()
                }}
            />
            <Button 
                title='cerrar sesion'
                onPress={sigOut}
            />
            <Text>agregar tarea</Text>
            <TextInput 
                placeholder='Nombre de la tarea'
            />
            <Button 
                title='Status de la tarea'
                onPress={() => {setCollapsed(!collapsed)}}
            />
            <Collapsible collapsed={collapsed} align="center">
                <View style={{
                    padding: 20,
                    backgroundColor: '#fff',
                    borderColor: 'red',
                    borderWidth: 2
                }}>
                    <Text>
                    Bacon ipsum dolor amet chuck turducken landjaeger tongue spare
                    ribs
                    </Text>
                </View>
                <View style={{
                    padding: 20,
                    backgroundColor: '#fff',
                    borderColor: 'red',
                    borderWidth: 2
                }}>
                    <Text>
                    Bacon ipsum dolor amet chuck turducken landjaeger tongue spare
                    ribs
                    </Text>
                </View>
            </Collapsible>


            <Button 
                title='Guardar'
                onPress={() => {}}
            />
            
            <Button 
                title='Cancelar'
                onPress={() => {router.back()}}
            />

        </SafeAreaComponent>
    )
}