<h1 align="center">Welcome to react-native-paginated-modal-picker 👋</h1>
<p>
  <a href="https://www.npmjs.com/package/react-native-paginated-modal-picker" target="_blank">
    <img alt="Version" src="https://img.shields.io/npm/v/react-native-paginated-modal-picker.svg">
  </a>
  <a href="#" target="_blank">
    <img alt="License: MIT" src="https://img.shields.io/badge/License-MIT-yellow.svg" />
  </a>
</p>

> Simple React Native Modal Picker With Pagination!

## Install

```sh
npm i react-native-paginated-modal-picker
```

## Basic Usage

```jsx
import React, { useState, useEffect } from 'react';
import { View, Dimensions, Text } from 'react-native';
import { PaginatedModalPicker } from 'react-native-paginated-modal-picker';
import axios from 'axios';
const { width, height } = Dimensions.get('window');

export default function App() {
  const [users, setUsers] = useState({
    data: [],
    pageNumber: 1,
    isLoading: false,
  });

  const pages = 2;
  const [user, setSelectedValue] = useState({
    name: '',
    id: '',
  });

  const getCountriesData = async (page) => {
    const response = await axios.get(
      `https://reqres.in/api/users?page=${page}`,
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    return response.data.data;
  };

  useEffect(() => {
    getCountriesData(users.pageNumber).then((response) => {
      const usersLabeled = response.map((data) =>
        Object.assign({}, { label: data.first_name, value: data.id })
      );
      setUsers({
        ...users,
        data: [...users.data, ...usersLabeled],
        isLoading: false,
      });
    });
  }, [users.pageNumber]);

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <PaginatedModalPicker
        textInputStyle={{ paddingLeft: 5 }}
        modalStyle={{ height: height * 0.4 }}
        flatListStyle={{ padding: 6 }}
        listItemStyle={{
          borderRadius: 5,
          borderColor: 'black',
          borderWidth: 0.4,
          marginTop: 20,
        }}
        listItemTextStyle={{ color: 'blue' }}
        placeholderTextColor='#9b9b9b'
        placeholder={'Users'}
        isRequestingComponent={<Text>Loading Component</Text>}
        ListEmptyComponent={<Text>Empty Component</Text>}
        isWorking={true}
        data={users.data}
        onSelect={(item) => {
          setSelectedValue({ id: item.value, name: item.label });
        }}
        onEndReached={() =>
          pages > users.pageNumber &&
          setUsers({
            ...users,
            pageNumber: users.pageNumber + 1,
            isLoading: true,
          })
        }
        isRequesting={users.isLoading}
        onEndReachedThreshold={0}
      />
    </View>
  );
}
```

## Properties

### Basic

#### Basic Props

| Prop                  | Default                  | Type                                                                                            | Description                                                          |
| --------------------- | ------------------------ | ----------------------------------------------------------------------------------------------- | -------------------------------------------------------------------- |
| data                  | `[{label:'', value:''}]` | `array`                                                                                         | an array pagination items                                            |
| placeholder           | `Click Me!`              | `string`                                                                                        | place holder for textinput                                           |
| isWorking             | `true`                   | `bool`                                                                                          | enable/disable textinput                                             |
| isRequesting          | `false`                  | `bool`                                                                                          | shows flatlist footer component when requesting data with pagination |
| onSelect              | ` `                      | `call back function`                                                                            | used to get the selected label and value                             |
| onEndReached          | ` `                      | `function`                                                                                      | triggered when end of flatlist reached incase of pagination          |
| onEndReachedThreshold | `number`                 | represents the number of screen lengths you should be from the bottom before it fires the event |

#### Basic Components

| Components            | Description         |
| --------------------- | ------------------- |
| ListEmptyComponent    | ListEmptyComponent  |
| isRequestingComponent | ListFooterComponent |

#### Basic Styles

| Prop                  | Default                                                                                                        | Type          | Description                        |
| --------------------- | -------------------------------------------------------------------------------------------------------------- | ------------- | ---------------------------------- |
| textInputStyle        | `{ borderRadius: 10, borderWidth: 1, width: width * 0.8, height: height * 0.05, padding: 10}`                  | `style`       | textInputStyle                     |
| modalStyle            | `{ borderRadius: 10, width: width * 0.8, height: height * 0.3, backgroundColor: 'white', alignSelf: 'center'}` | `style`       | modalStyle                         |
| contentContainerStyle | `{}`                                                                                                           | `style`       | contentContainerStyle for flatlist |
| flatListStyle         | `{}`                                                                                                           | `style`       | style for flatlist                 |
| placeholderTextColor  | ` `                                                                                                            | `hexadecimal` | placeholderTextColor               |
| listItemStyle         | `{padding: 10}`                                                                                                | `style`       | style for each item in flatlist    |
| listItemTextStyle     | `{fontSize: 16}`                                                                                               | `style`       | listItemTextStyle                  |

## Author

👤 **Ahmed Halbas**

- Github: [@AhmedHalbas](https://github.com/AhmedHalbas)
- LinkedIn: [@AhmedHalbas](https://linkedin.com/in/AhmedHalbas)

## 🤝 Contributing

Contributions, issues and feature requests are welcome!<br />Feel free to check [issues page](https://github.com/AhmedHalbas/react-native-paginated-modal-picker/issues).

## Show your support

Give a ⭐️ if this project helped you!
