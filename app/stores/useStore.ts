import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import { ActionStore, StateStore, User, } from '../Schemas/user';


const useStoreLogin = create(
    persist<StateStore & ActionStore>(
        (set) => ({
            isLoggedIn: false,
            setIsLoggedIn: (isLoggedIn: boolean) => set({ isLoggedIn }),
            user: null,
            setUser: (user: User) => set({ user }),
            logout: () => set({ isLoggedIn: false, user: null })
        }),
        {
            name: 'login-storage', // unique name for the storage
            storage: createJSONStorage(() => AsyncStorage)
        }
    ),
);

export default useStoreLogin;