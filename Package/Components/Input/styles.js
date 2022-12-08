import {
    StyleSheet,
    Dimensions,
} from 'react-native';
const { width, height } = Dimensions.get('window');
const styles = StyleSheet.create({

    textInput: {
        borderRadius: 10,
        borderWidth: 1,
        width: width * 0.8,
        height: height * 0.05,
        padding: 10
    }

});

export default styles;
