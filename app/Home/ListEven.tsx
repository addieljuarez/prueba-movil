import { useState } from "react";
import { Button, Text, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { useStoreTask } from "../Stores/useStore";

export default function ListEvenPage() {

    const [even, setEven] = useState(true)

    const ViewEven = () => {
        const data = useStoreTask(state => state.data);
        const filterData = data.filter((item) => item.id % 2 === 0);
        return (
            <>
                {filterData.map(item => (
                    <View key={item.id} style={{ padding: 10, borderBottomWidth: 1, borderColor: '#ccc' }}>
                        <Text style={{ fontSize: 16, fontWeight: 'bold' }}>ID: {item.id}</Text>
                        <Text style={{ fontSize: 16, fontWeight: 'bold' }}>UserId: {item.userId}</Text>
                        <Text style={{ fontSize: 16, fontWeight: 'bold' }}>Titulo: {item.title}</Text>
                        <Text style={{ color: item.completed ? 'green' : 'red' }}>
                            {item.completed ? 'Completada' : 'Pendiente'}
                        </Text>
                    </View>
                ))}
            </>
        );
    }

    
    const ViewOdd = () => {
        const data = useStoreTask(state => state.data);
        const filterData = data.filter((item) => item.id % 2 !== 0);
        return (
            <>
                {filterData.map(item => (
                    <View key={item.id} style={{ padding: 10, borderBottomWidth: 1, borderColor: '#ccc' }}>
                        <Text style={{ fontSize: 16, fontWeight: 'bold' }}>ID: {item.id}</Text>
                        <Text style={{ fontSize: 16, fontWeight: 'bold' }}>UserId: {item.userId}</Text>
                        <Text style={{ fontSize: 16, fontWeight: 'bold' }}>Titulo: {item.title}</Text>
                        <Text style={{ color: item.completed ? 'green' : 'red' }}>
                            {item.completed ? 'Completada' : 'Pendiente'}
                        </Text>
                    </View>
                ))}
            </>
        );
    }

    return (
        <>
            <View>
                <View style={{
                    flexDirection: 'row'
                }}>
                    <Button 
                        title="Par"
                        onPress={() => setEven(true)}
                    />
                    <Button 
                        title="Inpar"
                        onPress={() => setEven(false)}
                    />
                    
                </View>
                <ScrollView>
                    {even ? (
                        <ViewEven />
                    ) : (
                        <ViewOdd />
                    )}
                </ScrollView>
                
            </View>
        </>
    );
}