import React from 'react';
import { createStackNavigator } from 'react-navigation-stack';

import GoodDonate from '../Screens/GoodDonate';
import RecieverDetailsScreen  from '../Screens/RecieverDetailsScreen';




export const AppStackNavigator = createStackNavigator({
  BookDonateList : {
    screen : GoodDonate,
    navigationOptions:{
      headerShown : false
    }
  },
  RecieverDetails : {
    screen : RecieverDetailsScreen,
    navigationOptions:{
      headerShown : false
    }
  },

},
  {
    initialRouteName: 'BookDonateList'
  }
);
