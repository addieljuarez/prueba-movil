import { Task } from "../Schemas/tasks";

export const getTasks = async (
    limitTask: number,
    setData: (data: Task[]) => void,
    setIsLoading: (loading: boolean) => void,
    setError: (error: boolean) => void,
    setSuccess: (success: boolean) => void,
    resetState: () => void
): Promise<void> => {

    setIsLoading(true);
    const urlTasks = 'https://jsonplaceholder.typicode.com/todos';
    const req = await fetch(urlTasks, {
        method: 'get',
        headers: {
            'Content-Type': 'application/json'
        }
    });

    const res = await req.json() as Task[];
    const resLimit = res.slice(0, limitTask);

    if (!req.ok) {
        setError(true)
        setIsLoading(false);
        setSuccess(false);
        resetState();
    }

    if (resLimit.length === 0) {
        setIsLoading(false);
        setSuccess(false);
        resetState();
        setData([]);
        setError(false);
    }

    // Mapear los datos para que coincidan con el esquema Task
    res.length = limitTask;
    res.forEach((task, index) => {
        task.userId = task.userId || 1; // Asignar un userId por defecto si no existe
        task.id = task.id || index + 1; // Asignar un id por defecto si no existe
        task.title = task.title || `Tarea ${index + 1}`; // Asignar un título por defecto si no existe
        task.completed = task.completed || false; // Asignar completed por defecto si no existe
    });

    setData(resLimit);
    setIsLoading(false);
    setSuccess(true);
    setError(false);
};