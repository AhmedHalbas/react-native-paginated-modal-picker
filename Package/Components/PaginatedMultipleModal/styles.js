import {
    StyleSheet,
    Dimensions,
} from 'react-native';
const { width, height } = Dimensions.get('window');
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
    },
    saveButtonContainer: {
        borderRadius: 30,
        minHeight: height * 0.04,
        width: width * 0.3,
        backgroundColor: 'black',
        justifyContent: "center",
        alignItems: 'center',
        alignSelf: "center",
        marginTop: 20,
        marginHorizontal: width * 0.015
    },
    saveButtonText: {
        color: "white",
        fontSize: width * 0.04
    },
    selectedItemIcon: {
        height: 15, width: 15, alignSelf: 'center'
    }
});

export default styles;
