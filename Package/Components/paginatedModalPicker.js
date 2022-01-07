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
    StyleSheet
} from 'react-native';
const { width, height } = Dimensions.get("window");

export default function PaginatedModalPicker({ isWorking = true, placeholder = 'Click Me!', data, onSelect, onEndReached, onEndReachedThreshold, isRequesting, textInputStyle, modalStyle, contentContainerStyle, flatListStyle, placeholderTextColor, listItemStyle, listItemTextStyle, ListEmptyComponent, isRequestingComponent }) {

    const [isVisible, setVisible] = useState(false);
    const [onScrollEnd, setOnScrollEnd] = useState(false);
    const [selectedValue, setSelectedValue] = useState('');


    return (
        <View>


            <TouchableOpacity disabled={!isWorking} onPress={() => setVisible(true)} >
                <View pointerEvents='none'>

                    <TextInput
                        style={{ borderRadius: 10, borderWidth: 1, width: width * 0.8, height: height * 0.05, padding: 10, ...textInputStyle }}
                        editable={false}
                        placeholder={placeholder}
                        value={selectedValue}
                        placeholderTextColor={placeholderTextColor}
                    />
                </View>

            </TouchableOpacity>

            <Modal

                visible={isVisible}
            >

                <TouchableOpacity activeOpacity={0} style={styles.modalContainer} onPress={() => setVisible(false)}>
                    <TouchableOpacity activeOpacity={1} >
                        <View style={{ borderRadius: 10, width: width * 0.8, height: height * 0.3, backgroundColor: 'white', alignSelf: 'center', ...modalStyle }}>
                            <FlatList
                                style={{ padding: 10, ...flatListStyle }}
                                contentContainerStyle={{ ...contentContainerStyle }}
                                ListEmptyComponent={
                                    ListEmptyComponent ??
                                    <View style={{ justifyContent: 'center', alignSelf: 'center', flex: 1 }}>
                                        <Text style={{ fontSize: 14, textAlign: 'center' }}>
                                            No Content Found
                                        </Text>
                                    </View>
                                }
                                ListFooterComponent={
                                    isRequestingComponent ? (isRequesting && isRequestingComponent) :
                                        (isRequesting &&
                                            <View>
                                                <ActivityIndicator size="large" />
                                            </View>)

                                }
                                data={data}
                                renderItem={(data) => {
                                    return (
                                        <TouchableOpacity
                                            style={{ padding: 10, ...listItemStyle }}
                                            onPress={() => {
                                                setVisible(false)
                                                const selectedObj = { value: data.item.value, label: data.item.label }
                                                onSelect?.(selectedObj);
                                                setSelectedValue(selectedObj.label)

                                            }
                                            }>

                                            <Text style={{ fontSize: 16, ...listItemTextStyle }}>{data.item.label}</Text>

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

                {/* <TouchableOpacity
                    activeOpacity={0}
                    style={{ backgroundColor: 'black', flex: 1, opacity: 0.65 }}
                    onPress={() => setVisible(false)}>
                   
                </TouchableOpacity> */}

            </Modal>
        </View>
    );

}

const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'black', opacity: 0.65
    },
    modal: {
        width: 155,
        height: 300
    },
});