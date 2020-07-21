import React from 'react';
import LoginScreen from './Screens/LoginScreen';
import { AppDrawerNavigator } from './components/AppDrawerNavigator'
import { createAppContainer ,createSwitchNavigator } from 'react-navigation';
import { AppTabNavigator } from './components/TabNavigator'
import {decode, encode} from 'base-64'

if (!global.btoa) {  global.btoa = encode }

if (!global.atob) { global.atob = decode }

export default function App() {
  return (
    <AppContainer/>
  );
}

const switchNavigator = createSwitchNavigator({
  Login : {screen : LoginScreen},
  Drawer : {screen : AppDrawerNavigator},
  BottomTab: {screen: AppTabNavigator},
})

const AppContainer = createAppContainer(switchNavigator)


