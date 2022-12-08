
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
    Image
} from 'react-native';
import styles from './styles';
const { width, height } = Dimensions.get('window');
export default function PaginatedMultipleModal({ isVisible, dataItems, selectItem, handleOnSelect, onHide, isRequesting, isRequestingComponent, saveButtonTitle, saveButtonStyle, saveButtonTitleStyle, modalStyle, flatListStyle, listItemStyle, listItemTextStyle, contentContainerStyle, selectedItemIconStyle, ListEmptyComponent, selectedItemIconComponent, backDropOpacity, modalType, onEndReached, onEndReachedThreshold }) {

    const [onScrollEnd, setOnScrollEnd] = useState(false);

    const isModalFullScreen = () => modalType == 'FullScreen';

    return (

        <Modal

            visible={isVisible}
        >

            <TouchableOpacity
                activeOpacity={0}
                style={{ ...styles.backDropContainer, opacity: backDropOpacity ?? 0.65 }}
                onPress={handleOnSelect}>
                <TouchableOpacity activeOpacity={1} >
                    <View style={{ ...styles.modalContainer, paddingTop: isModalFullScreen() && Platform.OS == 'ios' ? height * 0.06 : 0, width: isModalFullScreen() ? width : width * 0.8, height: isModalFullScreen() ? height : height * 0.3, ...modalStyle }}>
                        <FlatList
                            ListHeaderComponent={isModalFullScreen() && <TouchableOpacity
                                onPress={onHide}
                                style={styles.closeModalButtonContainer}>
                                <Text style={{ fontSize: 20 }}>✕</Text>
                            </TouchableOpacity>
                            }
                            style={{ padding: 10, ...flatListStyle }}
                            contentContainerStyle={{ paddingBottom: height * 0.05, ...contentContainerStyle }}
                            ListEmptyComponent={
                                ListEmptyComponent ??
                                <View style={styles.noDataContainer}>
                                    <Text style={styles.noDataText}>
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
                                                        style={{ ...styles.saveButtonContainer, ...saveButtonStyle }}
                                                        onPress={() => {
                                                            if (dataItems.filter(item => item.selected == true)?.length > 0) {
                                                                handleOnSelect()
                                                            }

                                                        }}

                                                    >
                                                        <Text style={{ ...styles.saveButtonText, ...saveButtonTitleStyle }}>{saveButtonTitle ?? 'Save'}</Text>
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
                                                source={require('../../Images/check.png')}
                                                style={{ ...styles.selectedItemIcon, ...selectedItemIconStyle }}
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


    )

}
