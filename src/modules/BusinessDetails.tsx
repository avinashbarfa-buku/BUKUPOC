import React, {useEffect, useState} from 'react';
import axios from '../config/axios';
import {
  ScrollView,
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
} from 'react-native';

const BusinessDetails = ({navigation, route}: any) => {
  const [data, setData] = useState([]);
  useEffect(() => {
    axios
      .get(
        `https://api-dev.bukuwarung.com/ac/api/v2/business/details/${route.params.businessId}`,
      )
      .then(r => setData(r.data.data));
  }, [route]);

  if (data.length <= 0) {
    return <></>;
  }
  const {business}: any = data;
  const modifiedData: any = {
    'Business Id': business.businessId,
    Name: business.name,
    Address: business.address,
    Phone: business.phone,
    'Created By Device': business.createdByDevice,
    'Created At': business.createdAt,
  };

  const deleteBusiness = () => {
    axios
      .delete(
        `https://api-dev.bukuwarung.com/ac/api/v2/business/${business.businessId}`,
        {
          headers: {
            'X-USER-DEVICE': 'IOS',
          },
        },
      )
      .then(r => r.data.result && navigation.navigate('HomeScreen'));
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        {Object.keys(modifiedData).map((key: any) => (
          <View style={styles.item}>
            <Text style={styles.title}>{key}:</Text>
            <Text style={styles.value}>{modifiedData[key]}</Text>
          </View>
        ))}
        <TouchableOpacity style={styles.button} onPress={deleteBusiness}>
          <Text>Delete</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default BusinessDetails;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 16,
  },
  item: {
    backgroundColor: '#ffffff',
    padding: 20,
    marginVertical: 0,
    marginHorizontal: 8,
    display: 'flex',
    flexDirection: 'row',
    borderRadius: 8,
  },
  title: {
    fontSize: 16,
    paddingLeft: 2,
  },
  value: {
    fontSize: 16,
    paddingLeft: 4,
  },
  button: {
    alignItems: 'center',
    backgroundColor: '#DDDDDD',
    margin: 24,
    padding: 10,
  },
});
