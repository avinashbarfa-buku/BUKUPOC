import * as React from 'react';
import {Platform} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import LoginPage from './src/modules/LoginPage';
import OtpScreen from './src/modules/OtpScreen';
import SplashScreen from './src/modules/SplashScreen';
import HomeScreen from './src/modules/homeScreen';
import CategoryLists from './src/modules/CategoryLists';
import GetAllBusinessList from './src/modules/GetAllBusinessList';

import CreateBusiness from './src/modules/CreateBusiness';
import BusinessDetails from './src/modules/BusinessDetails';

const Stack = createNativeStackNavigator();

const Auth = () => {
  return (
    <Stack.Navigator initialRouteName={'LoginPage'}>
      <Stack.Screen
        name="LoginPage"
        component={LoginPage}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="OTPScreen"
        component={OtpScreen}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};

const NavigationRoute = () => {
  return (
    <Stack.Navigator initialRouteName={'HomeScreen'}>
      <Stack.Screen name="HomeScreen" options={{}} component={HomeScreen} />
      <Stack.Screen
        name="CategoryScreen"
        component={CategoryLists}
        options={{
          title: 'Business Category List', //Set Header Title
        }}
      />
      <Stack.Screen
        name="GetAllBusinessScreen"
        component={GetAllBusinessList}
        options={{
          title: 'My Business',
          headerShown: Platform.OS !== 'web',
          headerBackTitle: 'Back',
        }}
      />
      <Stack.Screen
        name="CreateBusiness"
        component={CreateBusiness}
        options={{
          title: 'Create Business',
          headerShown: Platform.OS !== 'web',
        }}
      />
      <Stack.Screen
        name="BusinessDetails"
        component={BusinessDetails}
        options={{
          title: 'Business Details',
          headerShown: Platform.OS !== 'web',
        }}
      />
    </Stack.Navigator>
  );
};

const App = () => {
  const linking = {
    prefixes: ['http://localhost:8080', 'localhost://'],
    config: {
      screens: {
        Auth: '/Authenticate',
        HomeScreen: '/home',
        CategoryScreen: {
          path: 'category-screen',
        },
        GetAllBusinessScreen: '/get-all-business-screen',
        BusinessDetails: '/business-details/:businessId',
        CreateBusiness: '/create-business',
      },
    },
  };

  return (
    <NavigationContainer linking={linking}>
      <Stack.Navigator initialRouteName={'SplashScreen'}>
        <Stack.Screen
          name="SplashScreen"
          component={SplashScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Auth"
          component={Auth}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="NavigationRoute"
          component={NavigationRoute}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
