import React, { useState } from 'react';
import {
    View,
    Platform,
    FlatList,
    TouchableOpacity,
    ActivityIndicator,
    Modal,
    Text,
    Dimensions,
    TextInput,
    Image
} from 'react-native';
import useUpdateEffect from '../Helpers/useUpdateEffectHook'
const { width, height } = Dimensions.get("window");

export default function PaginatedMultipleModalPicker({ value, modalType = 'Custom', isWorking = true, placeholder = 'Click Me!', data, onSelect, onEndReached, onEndReachedThreshold, isRequesting, textInputStyle, modalStyle, backDropOpacity, contentContainerStyle, flatListStyle, placeholderTextColor, listItemStyle, listItemTextStyle, saveButtonStyle, saveButtonTitleStyle, saveButtonTitle, selectedItemIconStyle, ListEmptyComponent, isRequestingComponent, selectedItemIconComponent }) {

    const [isVisible, setVisible] = useState(false);
    const [onScrollEnd, setOnScrollEnd] = useState(false);

    const [dataItems, setDataItems] = useState([]);


    const isModalFullScreen = () => modalType == 'FullScreen';

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

    useUpdateEffect(() => {


        setDataItems(data)

    }, [data])

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

            <TouchableOpacity disabled={!isWorking} onPress={() => setVisible(true)} >
                <View pointerEvents='none'>

                    <TextInput
                        style={{ borderRadius: 10, borderWidth: 1, width: width * 0.8, height: height * 0.05, padding: 10, ...textInputStyle }}
                        editable={false}
                        placeholder={placeholder}
                        value={value}
                        placeholderTextColor={placeholderTextColor}
                    />
                </View>

            </TouchableOpacity>

            <Modal

                visible={isVisible}
            >

                <TouchableOpacity
                    activeOpacity={0}
                    style={{
                        flex: 1,
                        justifyContent: 'center',
                        alignItems: 'center',
                        backgroundColor: 'black',
                        opacity: backDropOpacity ?? 0.65
                    }}
                    onPress={handleOnSelect}>
                    <TouchableOpacity activeOpacity={1} >
                        <View style={{ backgroundColor: 'white', borderRadius: 10, paddingTop: isModalFullScreen() && Platform.OS == 'ios' ? height * 0.06 : 0, width: isModalFullScreen() ? width : width * 0.8, height: isModalFullScreen() ? height : height * 0.3, alignSelf: 'center', ...modalStyle }}>
                            <FlatList
                                ListHeaderComponent={isModalFullScreen() && <TouchableOpacity
                                    onPress={() => setVisible(false)}
                                    style={{
                                        width: 30,
                                        height: 30,
                                        justifyContent: 'center',
                                        alignItems: 'center'

                                    }}>
                                    <Text style={{ fontSize: 20 }}>✕</Text>
                                </TouchableOpacity>
                                }
                                style={{ padding: 10, ...flatListStyle }}
                                contentContainerStyle={{ paddingBottom: height * 0.05, ...contentContainerStyle }}
                                ListEmptyComponent={
                                    ListEmptyComponent ??
                                    <View style={{ justifyContent: 'center', alignSelf: 'center', flex: 1 }}>
                                        <Text style={{ fontSize: 14, textAlign: 'center' }}>
                                            No Content Found
                                        </Text>
                                    </View>
                                }
                                ListFooterComponent={
                                    <>
                                        {
                                            isRequesting ?
                                                (
                                                    isRequestingComponent ? (isRequestingComponent) :
                                                        (
                                                            <View>
                                                                <ActivityIndicator size="large" />
                                                            </View>

                                                        )
                                                ) :

                                                (
                                                    <View
                                                    >
                                                        <TouchableOpacity
                                                            style={{ borderRadius: 30, minHeight: height * 0.04, width: width * 0.3, backgroundColor: 'black', justifyContent: "center", alignItems: 'center', alignSelf: "center", marginTop: 20, marginHorizontal: width * 0.015, ...saveButtonStyle }}
                                                            onPress={() => {
                                                                if (dataItems.filter(item => item.selected == true)?.length > 0) {
                                                                    handleOnSelect()
                                                                }

                                                            }}

                                                        >
                                                            <Text style={{ color: "white", fontSize: width * 0.04, ...saveButtonTitleStyle }}>{saveButtonTitle ?? 'Save'}</Text>
                                                        </TouchableOpacity>
                                                    </View>
                                                )

                                        }

                                    </>

                                }

                                data={dataItems}
                                renderItem={(data) => {
                                    return (
                                        <TouchableOpacity
                                            style={{ padding: 10, ...listItemStyle }}
                                            onPress={() => selectItem(data.item.value)}>


                                            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                                <Text style={{ fontSize: 16, ...listItemTextStyle }}>{data.item.label}</Text>

                                                {data.item.selected && (selectedItemIconComponent ? selectedItemIconComponent : <Image
                                                    source={require('../Images/check.png')}
                                                    style={{ height: 15, width: 15, alignSelf: 'center', ...selectedItemIconStyle }}
                                                />)}
                                            </View>

                                        </TouchableOpacity>
                                    );
                                }}
                                keyExtractor={(item, index) => index.toString()}
                                onEndReached={() => onEndReached && setOnScrollEnd(true)}
                                onMomentumScrollEnd={() => {
                                    onScrollEnd && onEndReached?.()
                                    setOnScrollEnd(false)
                                }}
                                onEndReachedThreshold={onEndReachedThreshold ?? (Platform.OS == 'ios') ? 0 : 3}

                            />
                        </View>
                    </TouchableOpacity>
                </TouchableOpacity>

            </Modal>
        </View >
    );

}