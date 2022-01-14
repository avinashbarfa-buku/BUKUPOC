import React, {useEffect, useState} from 'react';
import axios from '../config/axios';
import {
  FlatList,
  Image,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';

const Item = ({title, imgUrl}: any) => (
  <View style={styles.item}>
    <Image
      style={styles.stretch}
      source={{
        height: 50,
        width: 50,
        uri: imgUrl,
      }}
    />
    <Text style={styles.title}>{title}</Text>
  </View>
);

const CategoryLists = () => {
  const [data, setData] = useState([]);

  const renderItem = ({item}: any) => (
    <Item imgUrl={item.imageUrl} title={item.displayNameId} />
  );

  useEffect(() => {
    axios
      .get('https://api-dev.bukuwarung.com/ac/api/v2/business/category/list')
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

export default CategoryLists;

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
