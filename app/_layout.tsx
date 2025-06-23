import { DefaultTheme, ThemeProvider, } from '@react-navigation/native';
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import Toast from 'react-native-toast-message';

export default function RootLayout() {

  return (
    <ThemeProvider value={DefaultTheme}>
      <Stack>
        <Stack.Screen name="index"options={{ headerShown: false }}/>
        <Stack.Screen name="Login/index"options={{ headerShown: false }}/>
        <Stack.Screen name="Home/ListTask" options={{ headerShown: false }}/>
        <Stack.Screen name="Home/AddTask" options={{ headerShown: false }}/>
      </Stack>
      <StatusBar style="auto" />
      <Toast />
    </ThemeProvider>
  )
}
