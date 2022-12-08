import React, { useState, useEffect } from 'react';
import {
    View,
} from 'react-native';
import useUpdateEffect from '../../Helpers/useUpdateEffectHook'
import PaginatedMultipleModal from '../PaginatedMultipleModal'
import Input from '../Input'

export default function PaginatedMultipleModalPicker({ value, modalType = 'Custom', isWorking = true, placeholder = 'Click Me!', data, onSelect, onEndReached, onEndReachedThreshold, isRequesting, textInputStyle, modalStyle, backDropOpacity, contentContainerStyle, flatListStyle, placeholderTextColor, listItemStyle, listItemTextStyle, saveButtonStyle, saveButtonTitleStyle, saveButtonTitle, selectedItemIconStyle, ListEmptyComponent, isRequestingComponent, selectedItemIconComponent }) {

    const [isVisible, setVisible] = useState(false);

    const [dataItems, setDataItems] = useState([]);



    useEffect(() => {

        setDataItems(data)

    }, [data])


    useUpdateEffect(() => {

        if (Array.isArray(value) && value.length) {
            let currentData = data
            const selectedLabels = value.split(',')
            for (let item of currentData) {
                if (selectedLabels.includes(item.label)) {
                    item.selected = true
                }
            }
            setDataItems(currentData)
        }
    }, [value])


    const selectItem = (id) => {

        let currentData = [...dataItems];

        for (let data of currentData) {
            if (data.value == id) {
                data.selected = (data.selected == null) ? true : !data.selected;
                break;
            }
        }
        setDataItems(currentData)

    }

    const getSelected = (key) => dataItems.filter(item => item.selected == true).map(itm => itm[key])

    const handleOnSelect = () => {
        setVisible(false);

        const selectedObj = {
            values: getSelected('value')
            , labels: getSelected('label')
        }
        onSelect?.(selectedObj);

    }


    return (
        <View>

            <Input
                value={value}
                placeholder={placeholder}
                placeholderTextColor={placeholderTextColor}
                isWorking={isWorking}
                style={textInputStyle}
                onPress={() => setVisible(true)}

            />

            <PaginatedMultipleModal
                isVisible={isVisible}
                dataItems={dataItems}
                selectItem={selectItem}
                handleOnSelect={handleOnSelect}
                onHide={() => setVisible(false)}
                isRequesting={isRequesting}
                isRequestingComponent={isRequestingComponent}
                saveButtonTitle={saveButtonTitle}
                saveButtonStyle={saveButtonStyle}
                saveButtonTitleStyle={saveButtonTitleStyle}
                modalStyle={modalStyle}
                flatListStyle={flatListStyle}
                contentContainerStyle={contentContainerStyle}
                backDropOpacity={backDropOpacity}
                listItemStyle={listItemStyle}
                listItemTextStyle={listItemTextStyle}
                selectedItemIconStyle={selectedItemIconStyle}
                selectedItemIconComponent={selectedItemIconComponent}
                ListEmptyComponent={ListEmptyComponent}
                onEndReached={onEndReached}
                onEndReachedThreshold={onEndReachedThreshold}
                modalType={modalType}

            />

        </View>
    );

}