
import React from 'react';
import {
    View,
    TextInput,
    TouchableOpacity,
} from 'react-native';
import styles from './styles';

export default function Input({ value, onPress, isWorking, placeholder, textInputStyle, placeholderTextColor }) {


    return (
        <TouchableOpacity disabled={!isWorking} onPress={onPress} >
            <View pointerEvents='none'>

                <TextInput
                    style={{ ...styles.textInput, ...textInputStyle }}
                    editable={false}
                    placeholder={placeholder}
                    value={value}
                    placeholderTextColor={placeholderTextColor}
                />
            </View>

        </TouchableOpacity>

    )

}
