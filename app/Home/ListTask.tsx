import { useRouter } from 'expo-router'
import { useEffect, useState } from 'react'
import { Button, ScrollView, Text, TextInput, View } from 'react-native'
import { getTasks } from '../API'
import SafeAreaComponent from '../Components/SafeAreaComponent'
import { Task } from '../Schemas/tasks'
import { useStoreLogin, useStoreTask } from '../Stores/useStore'



export default function HomePage(){

    
    
    const router = useRouter();
    const limitTask = 30
    const user = useStoreLogin(state => state.user)
    const [tasks, setTasks] = useState({
        success: false,
        data: [],
        message: ''
    })

    const evenOrOdd = () => {
        console.log('evenOrOdd')
    }
    
    const setData = useStoreTask(data => data.setData)
    const setIsLoading = useStoreTask(data => data.setLoading)
    const setSuccess = useStoreTask(data => data.setSuccess)
    const resetState = useStoreTask(data => data.resetState)
    const setError = useStoreTask(data => data.setError)
    // const isLoading = useStoreTask(data => data.loading)
    const success = useStoreTask(data => data.success)
    const data = useStoreTask(data => data.data)

    useEffect(() => {
        const fetchTasks = async () => {

            await getTasks(limitTask, setData, setIsLoading, setError, setSuccess, resetState, user?.userId)
            
            if(success){
                const dataUser = data.filter((task: Task) => task.userId === user?.userId)
                setTasks({
                    success,
                    data: user && user.userId === 0 ? data : dataUser,
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

    const onChangeSearch = (text: string) => {
        if (text.length === 0) {
            const dataUser = data.filter((task: Task) => task.userId === user?.userId)
            setTasks({
                success: true,
                data: user && user.userId === 0 ? data: dataUser,
                message: 'Tareas obtenidas correctamente'
            })
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
                    return
                }else{
                    // Filtrar por titulo de la tarea
                    const filteredTasks = tasks.data.filter((task: Task) => 
                        task.title.toLowerCase().includes(text.toLowerCase())
                    )
                    setTasks({
                        data: filteredTasks,
                        success: filteredTasks.length > 0,
                        message: filteredTasks.length > 0 ? 'Tareas filtradas correctamente' : 'No se encontraron tareas con ese título'
                    })
                    return
                }
            }
        }
    }

    const addNewTask = () => {
        router.push('/Home/AddTask')
    }
    const sigOut = () => {
        useStoreLogin.setState({ isLoggedIn: false, user: null })
        useStoreTask.setState({ data: [], loading: false, success: false, error: false })
        router.replace('/Login')
    }

       
        
    return (
        <>
            <SafeAreaComponent>
                <View style={{ padding: 10, backgroundColor: '#f8f8f8', borderRadius: 5, marginBottom: 10 }}>
                    <TextInput
                        placeholder="Buscar Tareas"
                        style={{ height: 40, borderColor: '#ccc', borderWidth: 1, paddingHorizontal: 10 }}
                        onChangeText={onChangeSearch}
                    />
                    <Text style={{ fontSize: 18, fontWeight: 'bold' }}>Buscar Tareas</Text>
                    <Button
                        title="Agregar Tarea"
                        onPress={addNewTask}
                        color="#007BFF"
                        accessibilityLabel="Agregar Tarea"
                        testID="add-task-button"
                    />
                    <Button 
                        title='Cerrar Sesión'
                        onPress={sigOut}
                    />
                    <Button 
                        title='Par o Inpar'
                        onPress={evenOrOdd}
                    />
                </View>
                <ScrollView style={{ flex: 1, padding: 10 }}>
                    {success ? (
                        tasks.data.map((task: Task, index) => (
                            <View key={index} style={{ padding: 10, borderBottomWidth: 1, borderColor: '#ccc' }}>
                                <Text style={{ fontSize: 16, fontWeight: 'bold' }}>ID: {task.id}</Text>
                                <Text style={{ fontSize: 16, fontWeight: 'bold' }}>UserId: {task.userId}</Text>
                                <Text style={{ fontSize: 16, fontWeight: 'bold' }}>Titulo: {task.title}</Text>
                                <Text style={{ color: task.completed ? 'green' : 'red' }}>
                                    {task.completed ? 'Completada' : 'Pendiente'}
                                </Text>
                            </View>
                        ))
                    ) : (
                        <Text>{tasks.message}</Text>
                    )}
                </ScrollView>
                
            </SafeAreaComponent>
        </>
    )
}