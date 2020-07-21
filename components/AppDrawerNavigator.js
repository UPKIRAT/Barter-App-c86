import React from 'react';
import {createDrawerNavigator} from 'react-navigation-drawer';
import { AppTabNavigator } from './TabNavigator'
import CustomSideBarMenu  from './SideDrawer';
import SettingScreen from '../Screens/SettingScreen';
import MyDonationScreen from '../Screens/MyDonationScreen';
import NotificationScreen from '../Screens/NotificationScreen';
import MyReceivedItemsScreen from '../Screens/MyReceivedItemsScreen';


export const AppDrawerNavigator = createDrawerNavigator({
  Home : {
    screen : AppTabNavigator
    },
    MyDonations : {
      screen : MyDonationScreen
    },
    Notification : {
      screen : NotificationScreen
    },
    MyReceivedItems :{
      screen: MyReceivedItemsScreen
    },
    Setting : {
      screen : SettingScreen
    },
  },
  {
    contentComponent:CustomSideBarMenu
  },
  {
    initialRouteName : 'Home'
  })
