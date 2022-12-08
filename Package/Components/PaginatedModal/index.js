
import React, { useState } from 'react';
import {
    View,
    Platform,
    FlatList,
    TouchableOpacity,
    ActivityIndicator,
    Modal,
    Text,
    Dimensions
} from 'react-native';
import styles from './styles';
const { width, height } = Dimensions.get('window');
export default function PaginatedModal({ isVisible, onHide, data, modalType, onSelect, onEndReached, onEndReachedThreshold, isRequesting, modalStyle, backDropOpacity, contentContainerStyle, flatListStyle, listItemStyle, listItemTextStyle, ListEmptyComponent, isRequestingComponent }) {

    const [onScrollEnd, setOnScrollEnd] = useState(false);

    const isModalFullScreen = () => modalType == 'FullScreen';


    return (

        <Modal

            visible={isVisible}
        >


            <TouchableOpacity
                activeOpacity={0}
                style={{ ...styles.backDropContainer, opacity: backDropOpacity ?? 0.65 }}
                onPress={onHide}>
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
                                            onHide()
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


    )

}
