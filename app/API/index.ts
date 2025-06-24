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

    res.length = limitTask;
    res.forEach((task, index) => {
        task.userId = task.userId || 1; 
        task.id = task.id || index + 1;
        task.title = task.title || `Tarea ${index + 1}`;
        task.completed = task.completed || false;
    });

    setData(resLimit);
    setIsLoading(false);
    setSuccess(true);
    setError(false);
};