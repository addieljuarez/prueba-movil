import { DefaultTheme, ThemeProvider, } from '@react-navigation/native';
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from 'react';
import Toast from 'react-native-toast-message';
import { useStoreTask } from './Stores/useStore';

export default function RootLayout() {
  const [visible, setVisible] = useState(false)

  const isLoading = useStoreTask(state => state.loading)
  
  useEffect(() => {
    setVisible(isLoading)
  }, [isLoading])
  return (
    <ThemeProvider value={DefaultTheme}>
      <Stack>
        <Stack.Screen name="index"options={{ headerShown: false }}/>
        <Stack.Screen name="Login/index"options={{ headerShown: false }}/>
        <Stack.Screen name="Home/ListTask" options={{ headerShown: false }}/>
        <Stack.Screen name="Home/AddTask" options={{ headerShown: false }}/>
        <Stack.Screen name="Home/[idTask]" options={{ headerShown: false }}/>
      </Stack>
      <StatusBar style="auto" />
      {/* <Spinner
          visible={visible}
          textContent={'Cargando...'}
          textStyle={{
            color: '#F0E946'
          }}
        /> */}
      <Toast />
    </ThemeProvider>
  )
}
