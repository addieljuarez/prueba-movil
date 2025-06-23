import { useEffect, useState } from 'react'
import { Text, View } from 'react-native'
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

    return (
        <>
            <SafeAreaComponent>
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
            </SafeAreaComponent>
        </>
    )
}