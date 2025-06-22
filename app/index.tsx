// import Toast from 'react-native-toast-message';
// import HomePage from './Home';
import SafeAreaComponent from '@/components/ui/SafeAreaComponent';
import LoginPage from './Login';


export default function TestWindowPage1() {
     
  return (
    // <SafeAreaProvider>
        <SafeAreaComponent>
            <LoginPage />
        </SafeAreaComponent>
        // {/* <SafeAreaView 
        // style={{
        //     flex: 1,
        //     borderColor: 'blue',
        //     borderWidth: 5,
        // }}> */}
            
        
        // {/* <HomePage /> */}

        // {/* <Toast /> */}
        // {/* </SafeAreaView> */}
    // </SafeAreaProvider>
    
  );
}