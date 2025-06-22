import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import { ActionStore, StateStore, } from '../Schemas/user';

// const devtoolsConfig: DevtoolsOptions = {
//   name: 'my-storage-name',
//   enabled: process.env.NODE_ENV === 'development'
// };

const useStoreLogin = create(
    // persist<StateStore & ActionStore>(
    //     (set) => ({
    //         isLoggedIn: false,
    //         setIsLoggedIn: (isLoggedIn: boolean) => set({ isLoggedIn }),
    //         user: null,
    //         setUser: (user: any) => set({ user }),
    //         // token: null,
    //         // setToken: (token: string) => set({ token }),
    //         logout: () => set({ isLoggedIn: false, user: null}),
    //         isLoading: false,
    //         setIsLoading: (isLoading: boolean) => set({ isLoading })
    //     }),
    //     {
    //         name: 'user-storage', // unique name for the storage
    //     }
    // )
    persist<StateStore & ActionStore>(
    (set, get) => ({
    //   bears: 0,
        isLoggedIn: false,
        // addABear: () => set({ bears: get().bears + 1 }),
        setIsLoggedIn: (isLoggedIn: boolean) => set({ isLoggedIn }),
    }),
    {
    //   name: 'food-storage', // name of the item in the storage (must be unique)
        name: 'login-storage', // unique name for the storage
        // storage: createJSONStorage(() => sessionStorage), // (optional) by default, 'localStorage' is used
        // storage: createJSONStorage(() => sessionStorage), // (opti
        // partialize: (state) => ({
        //     isLoggedIn: state.isLoggedIn,
        // }), // (optional) to persist only a part of the state
        // version: 1, // (optional) version of the storage, useful for migrations
        // getStorage: () => AsyncStorage, // (optional) specify the storage to use, default is localStorage
        storage: createJSONStorage(() => AsyncStorage)
    }
  ),
);

export default useStoreLogin;