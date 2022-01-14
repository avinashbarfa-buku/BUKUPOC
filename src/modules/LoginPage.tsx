import * as React from 'react';
import {Platform} from 'react-native';
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
import {useState} from 'react';
import axios from 'axios';

const LoginPage = ({navigation}: any) => {
  const [mobile, setMobile] = useState();

  const validateMobile = (e: any) => {
    setMobile(e.nativeEvent.text);
  };

  const sendOtp = () => {
    // navigation.replace('DrawerNavigationRoutes');
    const payload = {
      action: 'LOGIN_OTP',
      countryCode: '+62',
      deviceId: '',
      phone: mobile,
      method: 'SMS',
      clientId: '2e3570c6-317e-4524-b284-980e5a4335b6',
      clientSecret: 'S81VsdrwNUN23YARAL54MFjB2JSV2TLn',
    };
    const requestHeader = {
      'x-app-version-code': '3300',
      'x-app-version-name': '3.7.2',
    };
    axios
      .post('https://api-dev.bukuwarung.com/api/v2/auth/otp/send', payload, {
        headers: requestHeader,
      })
      .then(r => {
        if (r.status === 200) {
          navigation.navigate('OTPScreen', {
            phone: mobile,
            opsToken: r.data.token,
          });
        }
      });
  };

  return (
    <View style={styles.containerView}>
      <View style={styles.loginScreenContainer}>
        <View style={styles.loginFormView}>
          <Text style={styles.logoText}>BukuWarung</Text>
          <Text>Platform : {Platform.OS}</Text>
          <TextInput
            placeholder="Mobile No"
            onChange={validateMobile}
            style={styles.loginFormTextInput}
          />
          <Button color="#3897f1" onPress={sendOtp} title="Proceed" />
        </View>
      </View>
    </View>
  );
};

export default LoginPage;

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
