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
} from 'react-native';
const { width, height } = Dimensions.get("window");

export default function PaginatedModalPicker({ value, modalType = 'Custom', isWorking = true, placeholder = 'Click Me!', data, onSelect, onEndReached, onEndReachedThreshold, isRequesting, textInputStyle, modalStyle, backDropOpacity, contentContainerStyle, flatListStyle, placeholderTextColor, listItemStyle, listItemTextStyle, ListEmptyComponent, isRequestingComponent }) {

    const [isVisible, setVisible] = useState(false);
    const [onScrollEnd, setOnScrollEnd] = useState(false);

    const isModalFullScreen = () => modalType == 'FullScreen';

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
                    onPress={() => setVisible(false)}>
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

            </Modal>
        </View>
    );

}