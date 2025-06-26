import { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { useStoreTask } from "../Stores/useStore";

export default function ListEvenPage() {

    const [even, setEven] = useState(true)
    const [backEven, setBackEven] = useState('#5F33E1')
    const [backOdd, setBackOdd] = useState('#C2B3EE')

    const ViewEven = () => {
        const data = useStoreTask(state => state.data);
        const filterData = data.filter((item) => item.id % 2 === 0);
        return (
            <>
                {filterData.map(item => (
                    <View key={item.id} style={Styles.containerTask}>
                        <View style={Styles.containerTextButtons}>
                            <View style={Styles.containerText}>
                                <Text style={{ color: item.completed ? '#5F33E1' : '#9887CA' }}>
                                    {item.completed ? 'Completada' : 'Pendiente'} (ID: {item.id})
                                </Text>
                                <Text style={Styles.textTitleTask}>Titulo: {item.title}</Text>
                            </View>
                        </View>
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
                    <View key={item.id} style={Styles.containerTask}>
                        <View style={Styles.containerTextButtons}>
                            <View style={Styles.containerText}>
                                <Text style={{ color: item.completed ? '#5F33E1' : '#9887CA' }}>
                                    {item.completed ? 'Completada' : 'Pendiente'} (ID: {item.id})
                                </Text>
                                <Text style={Styles.textTitleTask}>Titulo: {item.title}</Text>
                            </View>
                        </View>
                    </View>
                ))}
            </>
        );
    }

    return (
        <>
            <View>
                <View style={Styles.containerButtons}>
                    <TouchableOpacity style={[Styles.buttonSelect, {backgroundColor: backEven}]}
                        onPress={() => {
                            setEven(true)
                            setBackEven('#5F33E1')
                            setBackOdd('#C2B3EE')
                        }}
                    >
                        <Text style={Styles.textButton}>
                            Par
                        </Text>
    
                    </TouchableOpacity>

                    <TouchableOpacity style={[Styles.buttonSelect, {backgroundColor: backOdd}]}
                        onPress={() => {
                            setEven(false)
                            setBackEven('#C2B3EE')
                            setBackOdd('#5F33E1')
                        }}
                    >
                        <Text style={Styles.textButton}>
                            InPar
                        </Text>
    
                    </TouchableOpacity>
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

const Styles = StyleSheet.create({
    containerButtons: {
        flexDirection: 'row',
        justifyContent: 'center',
        padding: 10
    },
    buttonSelect: {
        padding: 20,
        flex: 1,      
        justifyContent: 'center'  ,
        alignItems: 'center',
        borderColor: '#5F33E1',
        borderRadius: 20
    },
    textButton: {
        color: 'white',
        fontSize: 13,
        fontWeight: 'bold'
    },
    containerTask: {
        borderBottomWidth: 1, 
        borderColor: '#DCDCDC',
        borderWidth: 1,
        borderRadius: 20,
        marginTop: 10
    },
    containerTextButtons: {
        flexDirection: 'row',
    },
    containerText: {
        flex: 2,
        padding: 10,
    },
    textTitleTask: {
        fontSize: 15, 
        top: 5
    },
})