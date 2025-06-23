import { useEffect, useState } from 'react'
import { ScrollView, Text, TextInput, View } from 'react-native'
import { getTasks } from '../API'
import SafeAreaComponent from '../Components/SafeAreaComponent'
import { Task } from '../Schemas/tasks'


export default function HomePage(){

    const limitTask = 5
    const [tasks, setTasks] = useState({
        success: false,
        data: [],
        message: ''
    })
    useEffect(() => {
        const fetchTasks = async () => {
            const getAllTasks = await getTasks(limitTask)
            console.log('getAllTasks', getAllTasks)
            setTasks(getAllTasks)
        }
        fetchTasks()
    }, [])
    const onChangeSearch = (text: string) => {
        if (text.length > 0) {
            const filteredTasks = tasks.data.filter((task: Task) =>
                task.title.toLowerCase().includes(text.toLowerCase())
            )
            setTasks({
                ...tasks,
                data: filteredTasks,
                success: filteredTasks.length > 0,
                message: filteredTasks.length > 0 ? 'Tareas filtradas correctamente' : 'No se encontraron tareas'
            })
        } else {
            // Si el input está vacío, volvemos a cargar todas las tareas
            const fetchTasks = async () => {
                const getAllTasks = await getTasks(limitTask)
                setTasks(getAllTasks)
            }
            fetchTasks()
        }
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
                </View>
                <ScrollView style={{ flex: 1, padding: 10 }}>
                    {tasks.success ? (
                        tasks.data.map((task: Task, index) => (
                            // <Text key={index}>{task.title}</Text>
                            <View key={index} style={{ padding: 10, borderBottomWidth: 1, borderColor: '#ccc' }}>
                                <Text style={{ fontSize: 16, fontWeight: 'bold' }}>{task.id}</Text>
                                <Text style={{ fontSize: 16, fontWeight: 'bold' }}>{task.title}</Text>
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