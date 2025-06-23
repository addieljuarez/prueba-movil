import { useRouter } from 'expo-router'
import { useEffect, useState } from 'react'
import { Button, ScrollView, Text, TextInput, View } from 'react-native'
import { getTasks } from '../API'
import SafeAreaComponent from '../Components/SafeAreaComponent'
import { Task } from '../Schemas/tasks'
import useStoreLogin from '../Stores/useStore'



export default function HomePage(){
    
    const router = useRouter();
    const limitTask = 30
    const user = useStoreLogin(state => state.user)
    // console.log('user', user)
    const [tasks, setTasks] = useState({
        success: false,
        data: [],
        message: ''
    })
    const evenOrOdd = () => {
        console.log('evenOrOdd')
    }
    
    useEffect(() => {
        const fetchTasks = async () => {
            const getAllTasks = await getTasks(limitTask)
            // console.log('getAllTasks', getAllTasks)
            // Si el usuario es admin (userID: 0), se obtienen todas las tareas
            if (user && user.userId === 0) {
                // Aquí podrías implementar la lógica para obtener todas las tareas si el usuario es admin
                setTasks(getAllTasks)
            }else {
                // Si el usuario no es admin, se obtienen las tareas limitadas
                // console.log('user?.userId', user?.userId)
                // console.log('getAllTasks.data', getAllTasks.data)
                getAllTasks.data = getAllTasks.data.filter((task: Task) => task.userId === user?.userId)
                setTasks(getAllTasks)
            }
        }
        fetchTasks()
    }, [user])
    const onChangeSearch = (text: string) => {
        // - **Funcionalidad de Filtro**: 
        // Proporciona un botón que permita alternar la vista entre tareas con ID par o impar, 
        // filtrar tareas por ID de usuarios, y en caso de ser usuario  admin (userID: 0) mostrar todas las tareas.

        // Aquí puedes implementar la lógica de filtrado
        if (text.length === 0) {
            // Si el input está vacío, volvemos a cargar todas las tareas
            const fetchTasks = async () => {
                const getAllTasks = await getTasks(limitTask)
                // setTasks(getAllTasks)

                if (user && user.userId === 0) {
                // Aquí podrías implementar la lógica para obtener todas las tareas si el usuario es admin
                setTasks(getAllTasks)
                }else {
                    // Si el usuario no es admin, se obtienen las tareas limitadas
                    // console.log('user?.userId', user?.userId)
                    // console.log('getAllTasks.data', getAllTasks.data)
                    getAllTasks.data = getAllTasks.data.filter((task: Task) => task.userId === user?.userId)
                    setTasks(getAllTasks)
                }
            }
            fetchTasks()
            return
        }
        if (text.length > 0) {
            // Filtrar por ID de usuario
            const userId = parseInt(text, 10)
            if(typeof userId === 'number' && !isNaN(userId)) {
                const filteredTasks = tasks.data.filter((task: Task) => task.userId === userId)
                setTasks({
                    ...tasks,
                    data: filteredTasks,
                    success: filteredTasks.length > 0,
                    message: filteredTasks.length > 0 ? 'Tareas filtradas correctamente' : 'No se encontraron tareas para ese usuario'
                })
                return
            }
            // Filltar por titulo de la tarea
            if(typeof text === 'string') {
                const filteredTasks = tasks.data.filter((task: Task) => 
                    task.title.toLowerCase().includes(text.toLowerCase())
                )
                setTasks({
                    ...tasks,
                    data: filteredTasks,
                    success: filteredTasks.length > 0,
                    message: filteredTasks.length > 0 ? 'Tareas filtradas correctamente' : 'No se encontraron tareas con ese título'
                })
                return
            }
            
            
            
        }
    }

    const addNewTask = () => {
        router.push('/Home/AddTask')
    }
    const sigOut = () => {
        useStoreLogin.setState({ isLoggedIn: false, user: null })
        router.replace('/Login')
    }

       
        
    return (
        <>
            <SafeAreaComponent>
                {/* aqio va el input del buscador */}
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
                    {tasks.success ? (
                        tasks.data.map((task: Task, index) => (
                            // <Text key={index}>{task.title}</Text>
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