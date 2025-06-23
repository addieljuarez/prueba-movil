import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import { ActionStore, StateStore, } from '../Schemas/user';


const useStoreLogin = create(
    persist<StateStore & ActionStore>(
        (set, get) => ({
            isLoggedIn: false,
            setIsLoggedIn: (isLoggedIn: boolean) => set({ isLoggedIn }),
        }),
        {
            name: 'login-storage', // unique name for the storage
            storage: createJSONStorage(() => AsyncStorage)
        }
    ),
);

export default useStoreLogin;