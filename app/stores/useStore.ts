import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import { StoreTask } from '../Schemas/tasks';
import { ActionStore, StateStore, User, } from '../Schemas/user';


export const useStoreLogin = create(
    persist<StateStore & ActionStore>(
        (set) => ({
            isLoggedIn: false,
            setIsLoggedIn: (isLoggedIn: boolean) => set({ isLoggedIn }),
            user: null,
            setUser: (user: User) => set({ user }),
            logout: () => set({ isLoggedIn: false, user: null }),
        }),
        {
            name: 'login-storage', // unique name for the storage
            storage: createJSONStorage(() => AsyncStorage)
        }
    ),
)


export const useStoreTask = create(
    persist<StoreTask>(
        (set) => ({
            data: null,
            setData: (data) => set({ data }),
            limit: 30,
            setLimit: (limit: number) => set({ limit }),
            loading: false,
            setLoading: (loading) => set({ loading }),
            error: false,
            setError: (error) => set({ error }),
            errorData: null,
            setErrorData: (errorData) => set({ errorData }),
            success: false,
            setSuccess: (success) => set({ success }),
            resetState: () => set({
                data: null,
                limit: 30,
                loading: false,
                error: false,
                errorData: null,
                success: false
            }),
            addTask: (task) => set((state) => ({
                data: [...(state.data || []), task],
            })),
            removeTask: (taskId) => set((state) => ({
                data: state.data?.filter((task) => task.id !== taskId) || [],
            })),
            updateTask: (updatedTask) => set((state) => ({
                data: state.data?.map((task) =>
                    task.id === updatedTask.id ? updatedTask : task
                ) || [],
            })),
        }),
        {
            name: 'tasks-storage', // unique name for the storage
            storage: createJSONStorage(() => AsyncStorage)
        }
    ),
)