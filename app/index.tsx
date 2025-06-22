import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import Toast from 'react-native-toast-message';
import LoginPage from './Login';


export default function TestWindowPage1() {
     
  return (
    <SafeAreaProvider>
        <SafeAreaView 
        style={{
            flex: 1,
            borderColor: 'blue',
            borderWidth: 5,
    }}>
            
        <LoginPage />

        <Toast />
        </SafeAreaView>
    </SafeAreaProvider>
    
  );
}