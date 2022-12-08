import React, { useState } from 'react';
import {
    View,
} from 'react-native';
import PaginatedModal from '../PaginatedModal';
import Input from '../Input';
export default function PaginatedModalPicker({ value, modalType = 'Custom', isWorking = true, placeholder = 'Click Me!', data, onSelect, onEndReached, onEndReachedThreshold, isRequesting, textInputStyle, modalStyle, backDropOpacity, contentContainerStyle, flatListStyle, placeholderTextColor, listItemStyle, listItemTextStyle, ListEmptyComponent, isRequestingComponent }) {

    const [isVisible, setVisible] = useState(false);


    return (
        <View>

            <Input
                value={value}
                isWorking={isWorking}
                placeholder={placeholder}
                textInputStyle={textInputStyle}
                placeholderTextColor={placeholderTextColor}
                onPress={() => setVisible(true)}
            />


            <PaginatedModal
                isVisible={isVisible}
                onHide={() => setVisible(false)}
                data={data}
                modalType={modalType}
                onSelect={onSelect}
                onEndReached={onEndReached}
                onEndReachedThreshold={onEndReachedThreshold}
                isRequesting={isRequesting}
                modalStyle={modalStyle}
                backDropOpacity={backDropOpacity}
                contentContainerStyle={contentContainerStyle}
                flatListStyle={flatListStyle}
                listItemStyle={listItemStyle}
                listItemTextStyle={listItemTextStyle}
                ListEmptyComponent={ListEmptyComponent}
                isRequestingComponent={isRequestingComponent}

            />


        </View>
    );

}