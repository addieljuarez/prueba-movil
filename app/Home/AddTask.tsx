import { useRouter } from 'expo-router';
import { Button, Text } from "react-native";
import SafeAreaComponent from "../Components/SafeAreaComponent";

export default function AddTask(){

    const router = useRouter();
    return(
        <SafeAreaComponent>
            <Button 
                title="regresar"
                onPress={() => {
                    router.back()
                }}
            />
            <Text>agregar tarea</Text>
            

        </SafeAreaComponent>
    )
}