import {
  FlatList,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import AsyncStorage from '@react-native-community/async-storage';

const Item = ({title, onPress}: any) => (
  <TouchableOpacity onPress={onPress}>
    <View style={styles.item}>
      <Text style={styles.title}>{title}</Text>
    </View>
  </TouchableOpacity>
);

const HomeScreen = ({navigation}: any) => {
  const renderItem = ({item}: any) => (
    <Item
      title={item.title}
      onPress={() => navigation.navigate(item.navigateTo)}
    />
  );

  const logout = () => {
    AsyncStorage.clear();
    navigation.replace('Auth');
  };

  const data = [
    {
      id: '1',
      title: 'Get Categories List',
      navigateTo: 'CategoryScreen',
    },
    {
      id: '2',
      title: 'My Businesses',
      navigateTo: 'GetAllBusinessScreen',
    },
    {
      id: '3',
      title: 'Create Business',
      navigateTo: 'CreateBusiness',
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />
      <TouchableOpacity style={styles.button} onPress={logout}>
        <Text>Logout</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },
  item: {
    backgroundColor: '#6e3b6e',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 16,
  },
  title: {
    fontSize: 32,
    color: '#ffffff',
  },
  button: {
    alignItems: 'center',
    backgroundColor: '#DDDDDD',
    margin: 24,
    padding: 10,
  },
});
