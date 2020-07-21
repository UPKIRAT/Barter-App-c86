import React from 'react';
import { Image } from 'react-native';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import GoodRequest from '../Screens/GoodRequest';
import { AppStackNavigator } from './StackNavigator'



export const AppTabNavigator = createBottomTabNavigator({
  DonateGoods : {
    screen: AppStackNavigator,
    navigationOptions :{
      tabBarIcon : <Image source={require("../assets/donate.png")} style={{width:20, height:20}}/>,
      tabBarLabel : "Donate Goods",
    }
  },
  GoodRequest: {
    screen: GoodRequest,
    navigationOptions :{
      tabBarIcon : <Image source={require("../assets/request.png")} style={{width:20, height:20}}/>,
      tabBarLabel : "Good Request",
    }
  }
});
