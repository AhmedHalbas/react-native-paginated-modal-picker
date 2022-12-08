import {
    StyleSheet,

} from 'react-native';
const styles = StyleSheet.create({

    backDropContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'black',
    },

    modalContainer: {
        backgroundColor: 'white',
        borderRadius: 10,
        alignSelf: 'center'
    },

    closeModalButtonContainer: {
        width: 30,
        height: 30,
        justifyContent: 'center',
        alignItems: 'center'

    },
    noDataContainer: {
        justifyContent: 'center',
        alignSelf: 'center',
        flex: 1
    },
    noDataText: {
        fontSize: 14,
        textAlign: 'center'
    }

});

export default styles;
