import React, {useState} from 'react';
import {View, TextInput, Button, Text} from 'react-native';
import {Center, Spacer} from '../RNMUI';
import AsyncStorage from '@react-native-community/async-storage';

function BasicInput() {
  const [userdetail, setUserDetail] = useState([
    {
      userKey: '',
      userName: '',
      userPassword: '',
    },
  ]);

  const [uName, setUname] = useState('');
  const [uPassword, setUpassword] = useState('');

  function sett() {
    const key = Math.random().toString();

    setUserDetail(userdetail => [
      ...userdetail,
      {
        userKey: key,
        userName: uName,
        userPassword: uPassword,
      },
    ]);

    storeUserDetail([
      ...userdetail,
      {
        userKey: key,
        userName: uName,
        userPassword: uPassword,
      },
    ]);
  }

  storeUserDetail = async data => {
    console.log(JSON.stringify(data));
    try {
      await AsyncStorage.setItem('key', JSON.stringify(data));
      console.log('Submit!!');
      setUname('');
      setUpassword('');
    } catch (error) {
      // Error saving data
      console.log(error);
    }
  };

  retrieveData = async () => {
    try {
      const value = await AsyncStorage.getItem('key');

      if (value !== null) {
        // We have data!!
        console.log(value);
        // console.log(userdetail);
      }
    } catch (error) {
      // Error retrieving data
    }
  };

  removedata = async () => {
    await AsyncStorage.removeItem('key');
  };

  return (
    <Center>
      <Spacer />
      <Spacer />
      <Text>UsernAme</Text>
      <TextInput
        style={{backgroundColor: 'grey', width: 200}}
        onChangeText={text => setUname(text)}
        value={uName}
      />
      <Spacer />
      <Spacer />
      <Text>Password</Text>
      <TextInput
        style={{backgroundColor: 'grey', width: 200}}
        onChangeText={text => setUpassword(text)}
        value={uPassword}
      />
      <Spacer />
      <Spacer />
      <View style={{width: 100}}>
        <Button color="red" title="Submit" onPress={sett} />
      </View>
      <Spacer />
      <Spacer />
      <View style={{width: 100}}>
        <Button color="red" title="getData" onPress={retrieveData} />
      </View>
      <Spacer />
      <Spacer />
      <View style={{width: 100}}>
        <Button color="red" title="Remove Data" onPress={removedata} />
      </View>
    </Center>
  );
}

export default BasicInput;
