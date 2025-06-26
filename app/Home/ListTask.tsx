import Pagination from '@cherry-soft/react-native-basic-pagination'
import { BottomSheetModal, BottomSheetModalProvider, BottomSheetView } from '@gorhom/bottom-sheet'
import { useRouter } from 'expo-router'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import { ImageBackground, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import Toast from 'react-native-toast-message'
import { getTasks } from '../API'
import ButtonCustom from '../Components/ButtonCustom'
import HeaderCustom from '../Components/HeaderCustom'
import SafeAreaComponent from '../Components/SafeAreaComponent'
import { Task } from '../Schemas/tasks'
import { useStoreLogin, useStoreTask } from '../Stores/useStore'
import ListEvenPage from './ListEven'
import StylesListTask from './ListTask.styles'



export default function HomePage(){

    const router = useRouter();
    const limitTask = 52
    const itemsToPage = 10
    const user = useStoreLogin(state => state.user)
    const [tasks, setTasks] = useState({
        success: false,
        data: [],
        message: ''
    })
    const [backgroundColor, setBackgroundColor] = useState('transparent')
    const [page, setPage] = useState(1);
    const [totalItems, setTotalItems] = useState(0)
    const [viewPagination, setViewPagination] = useState(true)

    const bottomSheetModalRef = useRef<BottomSheetModal>(null);

    const handlePresentModalPress = useCallback(() => {
        bottomSheetModalRef.current?.present();
        setBackgroundColor('rgba(0, 0, 0, 0.5)')
    }, []);
    
    const setData = useStoreTask(data => data.setData)
    const setIsLoading = useStoreTask(data => data.setLoading)
    const setSuccess = useStoreTask(data => data.setSuccess)
    const resetState = useStoreTask(data => data.resetState)
    const setError = useStoreTask(data => data.setError)
    const success = useStoreTask(data => data.success)
    const data = useStoreTask(data => data.data)

    useEffect(() => {
        const fetchTasks = async () => {

            await getTasks(limitTask, setData, setIsLoading, setError, setSuccess, resetState, user?.userId)
            
            if(success){
                const dataUser = data.filter((task: Task) => task.userId === user?.userId)
                setTotalItems(user && user.userId === 0 ? data.length : dataUser.length)
                setTasks({
                    success,
                    data: user && user.userId === 0 ? itemsPagination(data, page, itemsToPage) : itemsPagination(dataUser, page, itemsToPage),
                    message: 'Tareas obtenidas correctamente'
                })
            }else{
                setTasks({
                    success,
                    data: [],
                    message: 'No se encontraron tareas'
                })
            }
        }
        fetchTasks()
     
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [user, setData, setIsLoading, setSuccess, resetState, setError, success])


    useEffect(() => {
        if(data.length > 0) {
            const dataUser = data.filter((task: Task) => task.userId === user?.userId)
            setTotalItems(user && user.userId === 0 ? data.length : dataUser.length)
            setTasks({
                success: true,
                data: user && user.userId === 0 ? itemsPagination(data, page, itemsToPage) : itemsPagination(dataUser, page, itemsToPage),
                message: 'Tareas obtenidas correctamente'
            })
        }
    }, [data, user, page, itemsToPage])

    const onChangeSearch = (text: string) => {
        if (text.length === 0) {
            const dataUser = data.filter((task: Task) => task.userId === user?.userId)
            setTasks({
                success: true,
                data: user && user.userId === 0 ? data: dataUser,
                message: 'Tareas obtenidas correctamente'
            })
            setViewPagination(true)
            return
        }else if (text.length > 0) {
            // Filtrar por ID de usuario
            const userId = parseInt(text, 10)
            if(typeof userId === 'number' && !isNaN(userId)) {

                const filteredTasks = tasks.data.filter((task: Task) => task.userId === userId)
                setTasks({
                    data: filteredTasks,
                    success: filteredTasks.length > 0,
                    message: filteredTasks.length > 0 ? 'Tareas filtradas correctamente' : 'No se encontraron tareas para ese usuario'
                })
                setViewPagination(false)
                return
            }

            if(typeof text === 'string') {
                // Filtrar por estado de la tarea
                if(text.toLowerCase() === 'completada' || text.toLowerCase() === 'pendiente') {
                    const isCompleted = text.toLowerCase() === 'completada'
                    const filteredTasks = data.filter((task: Task) => task.userId === user?.userId)
                    const filteredTasks1 = user && user.userId === 0 ?
                        data.filter((task: Task) => task.completed === isCompleted):
                        filteredTasks.filter((task: Task) => task.completed === isCompleted)

                    setTasks({
                        data: filteredTasks1,
                        success: filteredTasks1.length > 0,
                        message: filteredTasks1.length > 0 ? 'Tareas filtradas correctamente' : 'No se encontraron tareas con ese estado'
                    })
                    setViewPagination(false)
                    return
                }else{
                    // Filtrar por titulo de la tarea
                    const filteredTasks = data.filter((task: Task) => 
                        task.title.toLowerCase().includes(text.toLowerCase())
                    )
                    setTasks({
                        data: filteredTasks,
                        success: filteredTasks.length > 0,
                        message: filteredTasks.length > 0 ? 'Tareas filtradas correctamente' : 'No se encontraron tareas con ese título'
                    })
                    setViewPagination(false)
                    return
                }
            }
        }
    }

    const addNewTask = () => {
        router.push('/Home/AddTask')
    }

    const handleSheetChanges = useCallback((index: number) => {
        if(index === -1){
            setBackgroundColor('transparent')
        }
    }, []);

    const itemsPagination = (_data, _page: number, _itemsToPage: number) => {
        const positionArray = _page * _itemsToPage
        const startIndex = positionArray  - _itemsToPage
        const finishIndex = positionArray 
        return _data.slice(startIndex, finishIndex)
    } 
    
    return (
        <>
            <SafeAreaComponent>
                <HeaderCustom
                    back={false}
                    title='Organizador de Tareas'
                    isList={false}
                >
                    <View style={StylesListTask.containerHeader}>
                        <TextInput
                            placeholder="Buscar Tareas"
                            style={StylesListTask.inputSearch}
                            onChangeText={onChangeSearch}
                        />
                        <ButtonCustom
                            onPressFunction={addNewTask}
                            title='Agregar'
                            styleButton={{top: 5}}
                        />
                        <TouchableOpacity onPress={handlePresentModalPress}>
                            <ImageBackground 
                                source={require('../../assets/even.png')}
                                style={StylesListTask.buttonEven}
                                resizeMode="center"
                                
                            />
                        </TouchableOpacity>
                    </View>
                </HeaderCustom>
                <Text 
                    style={StylesListTask.textTasks}
                >
                    {data.length} tareas registradas
                </Text>
                
                <ScrollView style={StylesListTask.containerList}>
                    {success ? (
                        tasks.data.map((task: Task, index) => (
                            <View key={index} style={StylesListTask.containerTask}>
                                <View style={StylesListTask.containerTextButtons}>
                                    <View style={StylesListTask.containerText}>
                                        <Text style={{ color: task.completed ? '#5F33E1' : '#9887CA' }}>
                                            {task.completed ? 'Completada' : 'Pendiente'} (ID: {task.id})
                                        </Text>
                                        <Text style={StylesListTask.textTitleTask}>Titulo: {task.title}</Text>
                                    </View>
                                    
                                    <View style={StylesListTask.containerButtons}>
                                        <TouchableOpacity onPress={() => router.push({
                                                pathname: '/Home/[idTask]',
                                                params: {
                                                    idTask: task.id
                                                }
                                            })} style={StylesListTask.buttonAction}>
                                            <ImageBackground 
                                                source={require('../../assets/edit.png')}
                                                style={StylesListTask.imageButton}
                                                resizeMode="contain"
                                            />
                                        </TouchableOpacity>
                                        <TouchableOpacity onPress={() => {
                                                useStoreTask.getState().removeTask(task.id)
                                                Toast.show({
                                                    type: 'success',
                                                    text1: 'Tarea eliminada correctamente',
                                                    position: 'top',
                                                    visibilityTime: 3000,
                                                    autoHide: true,
                                                    topOffset: 50,
                                                    bottomOffset: 40,
                                                })
                                            }} style={StylesListTask.buttonAction}>
                                            <ImageBackground 
                                                source={require('../../assets/trash.png')}
                                                style={StylesListTask.imageButton}
                                                resizeMode="contain"
                                            />
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </View>
                        ))
                    ) : (
                        <Text>{tasks.message}</Text>
                    )}
                </ScrollView>
                
                { viewPagination && (
                    <Pagination
                        totalItems={totalItems}
                        pageSize={itemsToPage}
                        currentPage={page}
                        onPageChange={setPage}
                    />
                )}
                
                <GestureHandlerRootView style={[StylesListTask.comtainerGesture, {
                    backgroundColor: backgroundColor
                }]}>
                        <BottomSheetModalProvider>
                            <BottomSheetModal
                                ref={bottomSheetModalRef}
                                onChange={handleSheetChanges}
                                style={StylesListTask.bottomSheet}
                            >
                                <BottomSheetView style={StylesListTask.bottomSheetView}>
                                    <ListEvenPage />
                                </BottomSheetView>
                            </BottomSheetModal>
                        </BottomSheetModalProvider>
                    </GestureHandlerRootView>
            </SafeAreaComponent>
        </>
    )
}