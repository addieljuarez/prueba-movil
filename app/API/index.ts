import { Task } from "../Schemas/tasks";

export const getTasks = async(limitTask: number) => {
    
    const urlTasks = 'https://jsonplaceholder.typicode.com/todos'
    const req = await fetch(urlTasks, {
        method: 'get',
        headers: {
            'Content-Type': 'application/json'
        }
    })

    const res = await req.json() as Task[];
    const resLimit = res.slice(0, limitTask);
    
    if (!req.ok) {
        return {
            success: false,
            data: [],
            message: 'Error al obtener las tareas'
        }
    }

    if (resLimit.length === 0) {
        return {
            success: false,
            data: [],
            message: 'No hay tareas disponibles'
        }
    }

    // Mapear los datos para que coincidan con el esquema Task
    res.length = limitTask;
    res.forEach((task, index) => {
        task.userId = task.userId || 1; // Asignar un userId por defecto si no existe
        task.id = task.id || index + 1; // Asignar un id por defecto si no existe
        task.title = task.title || `Tarea ${index + 1}`; // Asignar un título por defecto si no existe
        task.completed = task.completed || false; // Asignar completed por defecto si no existe
    });
    return {
        success: res.length > 0? true : false,
        data: resLimit,
        message: res.length > 0? 'Tareas obtenidas correctamente' : 'No hay tareas disponibles'
    }
}