import React, { useState, useEffect } from 'react'
import {
  View,
  Text,
  Dimensions,
  Image
} from 'react-native';
import { PaginatedModalPicker, PaginatedMultipleModalPicker } from 'react-native-paginated-modal-picker'
import axios from 'axios';
const { width, height } = Dimensions.get("window");
export default function App() {

  const [users, setUsers] = useState({ data: [], pageNumber: 1, isLoading: false })

  const pages = 2
  const [selectedUser, setSelectedUser] = useState({
    name: '', id: '',
  })

  const [selectedUsers, setSelectedUsers] = useState({
    names: [], ids: [],
  })

  const getCountriesData = async (page) => {

    const response = await axios.get(`https://reqres.in/api/users?page=${page}`, {
      headers: {
        "Content-Type": "application/json"
      }
    })

    return response.data.data;
  }

  useEffect(() => {

    getCountriesData(users.pageNumber).then((response) => {
      const usersLabeled = response.map((data) => Object.assign({}, { label: data.first_name, value: data.id }))
      setUsers({ ...users, data: [...users.data, ...usersLabeled], isLoading: false })

    })


  }, [users.pageNumber])


  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'space-around', }}>


      <PaginatedModalPicker
        textInputStyle={{ paddingLeft: 5 }}
        // modalStyle={{ height: height * 0.4 }}
        flatListStyle={{ padding: 6 }}
        listItemStyle={{ borderRadius: 5, borderColor: 'black', borderWidth: 0.4, marginTop: 20 }}
        listItemTextStyle={{ color: 'blue' }}
        placeholderTextColor="#9b9b9b"
        placeholder={"Select a User"}
        isRequestingComponent={<Text>Loading Component</Text>}
        ListEmptyComponent={<Text>Empty Component</Text>}
        isWorking={true}
        data={users.data}
        // modalType={'FullScreen'}
        backDropOpacity={0.6}
        onSelect={(item) => {
          setSelectedUser({ id: item.value, name: item.label });

        }}
        value={selectedUser.name}
        onEndReached={() => pages > users.pageNumber && setUsers({ ...users, pageNumber: users.pageNumber + 1, isLoading: true })}
        isRequesting={users.isLoading}
        onEndReachedThreshold={0}
      />

      <PaginatedMultipleModalPicker
        textInputStyle={{ paddingLeft: 5 }}
        // modalStyle={{ height: height * 0.4 }}
        flatListStyle={{ padding: 6 }}
        listItemStyle={{ borderRadius: 5, borderColor: 'black', borderWidth: 0.4, marginTop: 20 }}
        listItemTextStyle={{ color: 'blue' }}
        //new props start
        saveButtonStyle={{ backgroundColor: '#1259a1' }}
        saveButtonTitleStyle={{ fontSize: 17 }}
        saveButtonTitle='Confirm'
        selectedItemIconStyle={{ width: 13, height: 13 }}
        selectedItemIconComponent={<Image
          source={require('./images/correct.png')}
          style={{ height: 20, width: 20, }}
        />}

        //new props end
        placeholderTextColor="#9b9b9b"
        placeholder={"Select Multiple Users"}
        isRequestingComponent={<Text>Loading Component</Text>}
        ListEmptyComponent={<Text>Empty Component</Text>}
        isWorking={true}
        data={users.data}
        // modalType={'FullScreen'}
        backDropOpacity={0.6}
        onSelect={(item) => {
          setSelectedUsers({ ids: item.values, names: item.labels });

        }}
        value={selectedUsers?.names?.toString()}
        onEndReached={() => pages > users.pageNumber && setUsers({ ...users, pageNumber: users.pageNumber + 1, isLoading: true })}
        isRequesting={users.isLoading}
        onEndReachedThreshold={0}
      />

    </View >

  )


}
