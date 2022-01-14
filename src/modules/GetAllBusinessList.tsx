import React, {useEffect, useState} from 'react';
import axios from '../config/axios';
import {
  FlatList,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

const Item = ({title, onPress}: any) => (
  <TouchableOpacity onPress={onPress}>
    <View style={styles.item}>
      {/*<Image*/}
      {/*  style={styles.stretch}*/}
      {/*  source={{*/}
      {/*    height: 50,*/}
      {/*    width: 50,*/}
      {/*    uri: imgUrl,*/}
      {/*  }}*/}
      {/*/>*/}
      <Text style={styles.title}>{title}</Text>
    </View>
  </TouchableOpacity>
);

const GetAllBusinessList = ({navigation}: any) => {
  const [data, setData] = useState([]);

  const renderItem = ({item}: any) => (
    <Item
      key={item.business.id}
      imgUrl={item.businessCategory.imageUrl}
      title={item.business.name}
      onPress={() =>
        navigation.navigate('BusinessDetails', {
          businessId: item.business.businessId,
        })
      }
    />
  );

  useEffect(() => {
    axios
      .get('https://api-dev.bukuwarung.com/ac/api/v2/business/list')
      .then(r => setData(r.data.data));
  }, []);

  if (data.length <= 0) {
    return <></>;
  }

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={data}
        renderItem={renderItem}
        // @ts-ignore
        keyExtractor={item => item?.categoryId}
      />
    </SafeAreaView>
  );
};

export default GetAllBusinessList;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },
  item: {
    backgroundColor: '#ffffff',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    display: 'flex',
    flexDirection: 'row',
    borderRadius: 8,
  },
  title: {
    fontSize: 24,
    paddingLeft: 8,
  },
  stretch: {
    width: 50,
    height: 50,
    resizeMode: 'stretch',
  },
});
