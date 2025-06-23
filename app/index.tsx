import SafeAreaComponent from '@/app/Components/SafeAreaComponent';
import { Redirect } from 'expo-router';
import LoginPage from './Login';
import useStoreLogin from './Stores/useStore';

export default function Index() {
    const isLoggedIn = useStoreLogin((state) => state.isLoggedIn);

    if (isLoggedIn) {
        return <Redirect href="/Home/ListTask" />;
    }
        
    return (
        <SafeAreaComponent>
            <LoginPage />
        </SafeAreaComponent>
    );
}