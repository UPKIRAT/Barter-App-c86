import React from 'react';
import LottieView from 'lottie-react-native';

export default class SharingAnimation extends React.Component {
  render() {
    return (
      <LottieView
      source={require('../assets/5673-referral.json')}
      style={{width:"60%"}}
      autoPlay loop />
    )
  }
}
