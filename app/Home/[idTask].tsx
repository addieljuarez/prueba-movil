import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { ImageBackground, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import Collapsible from "react-native-collapsible";
import Toast from "react-native-toast-message";
import ButtonCustom from "../Components/ButtonCustom";
import HeaderCustom from "../Components/HeaderCustom";
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
                <HeaderCustom
                    back={true}
                    title='Editar tarea'
                    isList={false}
                />
                <View style={Styles.container}>
                    <View>
                        <TextInput
                            style={Styles.inputName}
                            placeholder='Nombre de la tarea'
                            value={nametask}
                            onChangeText={onChangeNameText}
                        />
                        <TouchableOpacity style={Styles.buttonStatus}
                            onPress={() => {setCollapsed(!collapsed)}}
                        >
                            <Text style={Styles.textButton}>Status de la tarea</Text>
                            <ImageBackground 
                                source={require('../../assets/arrow.png')}
                                style={Styles.imageButton}
                                resizeMode="contain"
                            />
                        </TouchableOpacity>
                        <Collapsible collapsed={collapsed} style={Styles.collapsible}>
                            <TouchableOpacity style={[Styles.containerSelect, {
                                backgroundColor: selectedComplete ? '#5F33E1': 'white'
                            }]}
                                onPress={() => {
                                    setSelectedCompleted(true)
                                    setSelectedPending(false)
                                }}
                            >
                                <Text>
                                    Completada
                                </Text>
                            </TouchableOpacity>
    
                            <TouchableOpacity style={[Styles.containerSelect, {
                                backgroundColor: selectedPending ? '#5F33E1': 'white'
                            }]}
                                onPress={() => {
                                    setSelectedCompleted(false)
                                    setSelectedPending(true)
                                }}
                            >
                                <Text>
                                    Pendiente
                                </Text>
                            </TouchableOpacity>
                        </Collapsible>
                    </View>
                    <View>
                        <ButtonCustom
                            title='Guardar'
                            onPressFunction={upadteOnData}
                        />
                        <ButtonCustom
                            title='Eliminar'
                            onPressFunction={deleteData}
                            buttonWhite={true}
                        />
                    </View>
                </View>
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

const Styles = StyleSheet.create({
    container: {
        justifyContent: 'space-between',
        flex: 1,
        alignItems:'center'
    },
    inputName: {
        height: 60,
        margin: 12,
        borderWidth: 1,
        padding: 10,
        width: 300,
        borderRadius: 20,
        borderColor: '#5F33E1',
        fontSize: 12,
        backgroundColor: 'white',
    },
    buttonStatus: {
        height: 60,
        margin: 12,
        borderWidth: 1,
        padding: 10,
        width: 300,
        borderRadius: 20,
        borderColor: '#5F33E1',   
        backgroundColor: 'white',
        justifyContent: 'center'           
    },
    textButton: {
        color: 'gray'
    },
    imageButton: {
        position: 'absolute',
        right: 20,
        width: 18,
        height: 18,
        resizeMode: 'contain',
    },
    containerSelect: {
        height: 60,
        borderWidth: 1,
        padding: 10,
        width: 300,
        borderRadius: 20,
        borderColor: '#5F33E1',   
        justifyContent: 'center'    
    },
    collapsible: {
        justifyContent: 'center',
        alignItems: 'center'
    }
})