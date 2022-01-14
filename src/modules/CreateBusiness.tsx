import React, {useEffect, useState} from 'react';
import {
  Button,
  Keyboard,
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import axios from '../config/axios';

const CreateBusiness = ({navigation}: any) => {
  const [name, setName] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [modifiedCategoryList, setModifiedCategoryList] = useState([]);
  const [phone, setPhone] = useState('');
  const [categoryList, setCategoryList] = useState([]);

  useEffect(() => {
    axios
      .get('https://api-dev.bukuwarung.com/ac/api/v2/business/category/list')
      .then(r => setCategoryList(r.data.data));
  }, []);

  useEffect(() => {
    const modifiedCategory: any = [];
    categoryList.forEach((item: any) => {
      modifiedCategory.push({
        label: item.displayNameId,
        value: item.categoryId,
      });
    });
    setModifiedCategoryList(modifiedCategory);
  }, [categoryList]);
  const createBusiness = () => {
    const requestBody = {
      business: {
        name: name,
        categoryId: selectedCategory,
        phone: phone,
      },
    };
    axios
      .post('https://api-dev.bukuwarung.com/ac/api/v2/business', requestBody, {
        headers: {
          'X-USER-DEVICE': 'IOS',
        },
      })
      .then(r => r.data.result && navigation.navigate('HomeScreen'));
  };
  return (
    <ScrollView>
      <KeyboardAvoidingView style={styles.containerView} behavior="padding">
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.loginScreenContainer}>
            <View style={styles.loginFormView}>
              <Text style={styles.logoText}>BukuWarung</Text>
              <TextInput
                placeholder="Nama Usha"
                onChange={(e: any) => setName(e.nativeEvent.text)}
                style={styles.loginFormTextInput}
              />
              <View style={styles.loginFormSelectTextInput}>
                <RNPickerSelect
                  onValueChange={value => setSelectedCategory(value)}
                  items={modifiedCategoryList}
                />
              </View>
              <TextInput
                placeholder="Phone"
                onChange={(e: any) => setPhone(e.nativeEvent.text)}
                style={styles.loginFormTextInput}
              />
              <Button
                color="#3897f1"
                onPress={createBusiness}
                disabled={
                  phone.length <= 0 ||
                  name.length <= 0 ||
                  selectedCategory === null
                }
                title="Create"
              />
            </View>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </ScrollView>
  );
};

export default CreateBusiness;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  containerView: {
    flex: 1,
    alignItems: 'center',
  },
  loginScreenContainer: {
    flex: 1,
  },
  logoText: {
    fontSize: 40,
    fontWeight: '800',
    marginTop: 60,
    marginBottom: 30,
    textAlign: 'center',
  },
  loginFormView: {
    flex: 1,
  },
  loginFormTextInput: {
    height: 48,
    width: 320,
    fontSize: 14,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#eaeaea',
    backgroundColor: '#fafafa',
    paddingLeft: 10,
    marginTop: 5,
    marginBottom: 5,
  },
  loginFormSelectTextInput: {
    height: 48,
    width: 320,
    fontSize: 14,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#eaeaea',
    backgroundColor: '#fafafa',
    paddingLeft: 10,
    paddingTop: 16,
    marginTop: 5,
    marginBottom: 5,
  },
  loginButton: {
    backgroundColor: '#3897f1',
    borderRadius: 5,
    height: 45,
    marginTop: 20,
    width: 350,
    alignItems: 'center',
  },
});
