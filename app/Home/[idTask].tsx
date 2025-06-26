import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { Button, Text, TextInput, TouchableOpacity } from "react-native";
import Collapsible from "react-native-collapsible";
import Toast from "react-native-toast-message";
import SafeAreaComponent from "../Components/SafeAreaComponent";
import { useStoreLogin, useStoreTask } from "../Stores/useStore";

export default function EditTask(){
    const { idTask } = useLocalSearchParams();
    const router = useRouter();
    const [collapsed, setCollapsed] = useState(true);
    const [nametask, setNametask] = useState('')
    const [selectedComplete, setSelectedCompleted ] = useState(false);
    const [selectedPending, setSelectedPending ] = useState(false);
    const task = useStoreTask.getState().data?.find(task => task.id === Number(idTask))


    useEffect(() => {
        if(task){
            console.log('task', task.completed)
            setCollapsed(false)
            setNametask(task.title)
            setSelectedCompleted(task.completed)
            setSelectedPending(!task.completed)
        }
    }, [task])

    const sigOut = () => {
        useStoreLogin.setState({ isLoggedIn: false, user: null })
        useStoreTask.setState({ data: [], loading: false, success: false, error: false })
        router.replace('/Login')
    }

    const upadteOnData = () => {
        if(nametask.trim() === ''){
            Toast.show({
                type: 'error',
                text1: 'El nombre de la tarea es requerido',
                position: 'top',
                visibilityTime: 3000,
                autoHide: true,
                topOffset: 50,
                bottomOffset: 40,
            })
            return
        }
        
        if(!selectedComplete && !selectedPending){
            Toast.show({
                type: 'error',
                text1: 'Debe seleccionar el estado de la tarea',
                position: 'top',
                visibilityTime: 3000,
                autoHide: true,
                topOffset: 50,
                bottomOffset: 40,
            })
            return
        }
        const updatedTask = {
            id: Number(idTask),
            userId: useStoreLogin.getState().user?.userId || 0,
            title: nametask,
            completed: selectedComplete
        }
        useStoreTask.getState().updateTask(updatedTask)
        Toast.show({
            type: 'success',
            text1: 'Tarea actualizada correctamente',
            position: 'top',
            visibilityTime: 3000,
            autoHide: true,
            topOffset: 50,
            bottomOffset: 40,
        })
        setNametask('')
        setSelectedCompleted(false)
        setSelectedPending(false)
        setCollapsed(true)
        useStoreTask.getState().setSuccess(true)
        useStoreTask.getState().setLoading(false)
        router.back()
    }

    const onChangeNameText = (text: string) => {
        setNametask(text)
    }

    const deleteData = () => {
        useStoreTask.getState().removeTask(Number(idTask))
        router.back()
        Toast.show({
            type: 'success',
            text1: 'Tarea eliminada correctamente',
            position: 'top',
            visibilityTime: 3000,
            autoHide: true,
            topOffset: 50,
            bottomOffset: 40,
        })
        useStoreTask.getState().setSuccess(true)
        useStoreTask.getState().setLoading(false)
    }
    return(
        <>
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
                <Text>
                    Editar Tarea
                </Text>
                <TextInput 
                placeholder='Nombre de la tarea'
                value={nametask}
                onChangeText={onChangeNameText}
            />
                <Button 
                    title='Status de la tarea'
                    onPress={() => {setCollapsed(!collapsed)}}
                />
                <Collapsible collapsed={collapsed} align="center">
                
                    <TouchableOpacity style={{
                        padding: 20,
                        backgroundColor: '#fff',
                        borderColor: 'red',
                        borderWidth: 2
                    }}
                    onPress={() => {
                        setSelectedCompleted(true)
                        setSelectedPending(false)
                    }}
                    >
                        <Text>
                            Completada
                        </Text>
                        {selectedComplete && (
                            <>
                                <Text>
                                    Seleccionado
                                </Text>
                            </>
                        )}

                    </TouchableOpacity>
                    <TouchableOpacity style={{
                            padding: 20,
                            backgroundColor: '#fff',
                            borderColor: 'red',
                            borderWidth: 2
                            
                        }}
                        onPress={() => {
                            setSelectedCompleted(false)
                            setSelectedPending(true)
                        }}
                    >
                        <Text>
                            Pendiente
                        </Text>
                        {selectedPending && (
                            <>
                                <Text>
                                    Seleccionado
                                </Text>
                            </>
                        )}
                    </TouchableOpacity>
                </Collapsible>
                <Button 
                    title='Guardar'
                    onPress={upadteOnData}
                />
                <Button 
                    title='Eliminar'
                    onPress={deleteData}
                />
            </SafeAreaComponent>
        </>
    )
}



// import { useRouter } from 'expo-router';
// import { useState } from 'react';
// import { Button, Text, TextInput, TouchableOpacity } from "react-native";
// import Collapsible from 'react-native-collapsible';
// import Toast from 'react-native-toast-message';
// import SafeAreaComponent from "../Components/SafeAreaComponent";
// import { useStoreLogin, useStoreTask } from '../Stores/useStore';

// export default function AddTask(){

//     const router = useRouter();
//     const [collapsed, setCollapsed] = useState(true);
//     const [nametask, setNametask] = useState('')
//     const [selectedComplete, setSelectedCompleted ] = useState(false);
//     const [selectedPending, setSelectedPending ] = useState(false);

//     

//     const onChangeNameText = (text: string) => {
//         setNametask(text)
//     }

//     const saveOnData = () => {
//         if(nametask.trim() === ''){
//             Toast.show({
//                 type: 'error',
//                 text1: 'El nombre de la tarea es requerido',
//                 position: 'top',
//                 visibilityTime: 3000,
//                 autoHide: true,
//                 topOffset: 50,
//                 bottomOffset: 40,
//             })
//             return
//         }
        
//         if(!selectedComplete && !selectedPending){
//             Toast.show({
//                 type: 'error',
//                 text1: 'Debe seleccionar el estado de la tarea',
//                 position: 'top',
//                 visibilityTime: 3000,
//                 autoHide: true,
//                 topOffset: 50,
//                 bottomOffset: 40,
//             })
//             return
//         }
//         const newTask = {
//             id: useStoreTask.getState().data?.length ? useStoreTask.getState().data.length + 1 : 1,
//             userId: useStoreLogin.getState().user?.userId || 0,
//             title: nametask,
//             completed: selectedComplete
//         }
//         useStoreTask.getState().addTask(newTask)
//         Toast.show({
//             type: 'success',
//             text1: 'Tarea agregada correctamente',
//             position: 'top',
//             visibilityTime: 3000,
//             autoHide: true,
//             topOffset: 50,
//             bottomOffset: 40,
//         })
//         setNametask('')
//         setSelectedCompleted(false)
//         setSelectedPending(false)
//         setCollapsed(true)
//         useStoreTask.getState().setSuccess(true)
//         useStoreTask.getState().setLoading(false)
//         router.back()
//     }

//     return(
//         <SafeAreaComponent>
//             <Button 
//                 title="regresar"
//                 onPress={() => {
//                     router.back()
//                 }}
//             />
//             <Button 
//                 title='cerrar sesion'
//                 onPress={sigOut}
//             />
//             <Text>agregar tarea</Text>
//             <TextInput 
//                 placeholder='Nombre de la tarea'
//                 value={nametask}
//                 onChangeText={onChangeNameText}
//             />
//             <Button 
//                 title='Status de la tarea'
//                 onPress={() => {setCollapsed(!collapsed)}}
//             />
//             <Collapsible collapsed={collapsed} align="center">
            
//                 <TouchableOpacity style={{
//                     padding: 20,
//                     backgroundColor: '#fff',
//                     borderColor: 'red',
//                     borderWidth: 2
//                 }}
//                 onPress={() => {
//                     setSelectedCompleted(true)
//                     setSelectedPending(false)
//                 }}
//                 >
//                     <Text>
//                         Completada
//                     </Text>
//                     {selectedComplete && (
//                         <>
//                             <Text>
//                                 Seleccionado
//                             </Text>
//                         </>
//                     )}

//                 </TouchableOpacity>
//                 <TouchableOpacity style={{
//                         padding: 20,
//                         backgroundColor: '#fff',
//                         borderColor: 'red',
//                         borderWidth: 2
                        
//                     }}
//                     onPress={() => {
//                         setSelectedCompleted(false)
//                         setSelectedPending(true)
//                     }}
//                 >
//                     <Text>
//                         Pendiente
//                     </Text>
//                     {selectedPending && (
//                         <>
//                             <Text>
//                                 Seleccionado
//                             </Text>
//                         </>
//                     )}
//                 </TouchableOpacity>
//             </Collapsible>
//             <Button 
//                 title='Guardar'
//                 onPress={saveOnData}
//             />
            
//             <Button 
//                 title='Cancelar'
//                 onPress={() => {router.back()}}
//             />

//         </SafeAreaComponent>
//     )
// }