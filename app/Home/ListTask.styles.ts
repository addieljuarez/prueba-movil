import { StyleSheet } from 'react-native'
const StylesListTask = StyleSheet.create({
    comtainerGesture: {
        padding: 24,
        justifyContent: 'center',
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        top: 0,
        flex: 1,
    },
    bottomSheetView: {
        flex: 1,
    },
    containerHeader: { 
        padding: 10,
        alignItems: 'center',
    },
    inputSearch: {
        height: 60,
        margin: 5,
        borderWidth: 1,
        padding: 10,
        width: 300,
        borderRadius: 20,
        borderColor: '#5F33E1',
        fontSize: 12,
        backgroundColor: 'white'
    },
    buttonEven: {
        width: 25,
        height: 25,
        resizeMode: 'contain',
        justifyContent: 'center',
        alignItems: 'center',
        top: 5
    },
    textTasks:{
        alignSelf: 'center',
        fontSize: 12                  
    },
    containerList: {
        flex: 1, 
        paddingLeft: 20,
        paddingRight: 20,
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
        flex: 1
    },
    containerText: {
        borderColor: 'red',
        borderWidth: 1,
        flex: 1
    },
    containerButtons: {
        borderColor: 'gren',
        borderWidth: 1,
        flex: 1
    }
})


// borderColor: '#DCDCDC',
//         borderWidth: 1,
//         borderRadius: 20
export default StylesListTask