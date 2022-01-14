import React, {useState} from 'react';
import {
  Button,
  Keyboard,
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import axios from 'axios';

const OtpScreen = ({navigation, route}: any) => {
  const [enteredOTP, setEnteredOTP] = useState();
  const [errorMsg, setErrorMsg] = useState<string>();
  const validateOTP = () => {
    if (route.params.opsToken) {
      const payLoad = {
        androidId: null,
        client: '2e3570c6-317e-4524-b284-980e5a4335b6',
        clientSecret: 'S81VsdrwNUN23YARAL54MFjB2JSV2TLn',
        countryCode: '+62',
        deviceBrand: null,
        deviceId: null,
        deviceModel: null,
        guestId: null,
        otp: enteredOTP,
        phone: route.params.phone,
      };
      const requestHeaders = {
        'x-app-version-code': '3300',
        'x-app-version-name': '3.7.2',
        'x-ops-token': route.params.opsToken,
      };
      axios
        .post(
          'https://api-dev.bukuwarung.com/api/v2/auth/login/standalone',
          payLoad,
          {
            headers: requestHeaders,
          },
        )
        .then(
          r => {
            if (r.status === 200) {
              AsyncStorage.setItem('user_id', String(route.params.phone));
              AsyncStorage.setItem('sessionToken', r.data.idToken);
              navigation.navigate('NavigationRoute');
            }
          },
          e => {
            if (e.response.status === 455) {
              setErrorMsg('Invalid OTP');
            } else {
              setErrorMsg('Something Went Wrong !!');
            }
          },
        );
    } else {
      setErrorMsg('Something Went Wrong !!');
    }
  };

  const onChange = (e: any) => {
    setEnteredOTP(e.nativeEvent.text);
  };

  return (
    <KeyboardAvoidingView style={styles.containerView} behavior="padding">
      <View style={styles.loginScreenContainer}>
        <View style={styles.loginFormView}>
          <Text style={styles.logoText}>BukuWarung</Text>
          <TextInput
            placeholder="Enter OTP"
            onChange={onChange}
            style={styles.loginFormTextInput}
            maxLength={4}
          />
          <Text style={styles.errorMsgText}>{errorMsg}</Text>
          <Button color="#3897f1" onPress={validateOTP} title="Proceed" />
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

export default OtpScreen;

const styles = StyleSheet.create({
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
    marginTop: 150,
    marginBottom: 30,
    textAlign: 'center',
  },
  errorMsgText: {
    fontSize: 12,
    marginTop: 16,
    marginBottom: 8,
    textAlign: 'center',
  },
  loginFormView: {
    flex: 1,
  },
  loginFormTextInput: {
    height: 43,
    fontSize: 14,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#eaeaea',
    backgroundColor: '#fafafa',
    paddingLeft: 10,
    marginTop: 5,
    marginBottom: 5,
  },
  loginButton: {
    backgroundColor: '#3897f1',
    borderRadius: 5,
    height: 45,
    marginTop: 10,
    width: 350,
    alignItems: 'center',
  },
});
