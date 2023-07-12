import React, {Component} from 'react';
import {View, Image, Text, PermissionsAndroid,ImageBackground} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { socket } from '../../service';
import messaging from '@react-native-firebase/messaging';

export default class Splash_Android extends Component {
  async componentDidMount() {
    this.checkPermissions();
    console.log("socket",socket)
  //   firebase.messaging().hasPermission()
  // .then(enabled => {
  //   if (enabled) {
  //     alert('Yes')
  //   } else {
  //     alert('No')
  //   } 

  //   firebase.messaging().getToken()
  // .then(fcmToken => {
  //   if (fcmToken) {
  //     // user has a device token
  //     // alert(fcmToken)
  //     console.log('token', fcmToken)
  //   } else {
  //     // user doesn't have a device token yet
  //     alert('user doesnt have a device token yet')
  //   } 
  // });
  // });

    setTimeout(async () => {
      const value = await AsyncStorage.getItem('@user');
      const value2 = await AsyncStorage.getItem('signin');
      if (value !== null || value2 !==null) {
        this.props.navigation.replace('Home');
      } else {
        this.props.navigation.replace('SignUp');
      }
    }, 3000);

    // setTimeout(async () => {
      
    //     this.props.navigation.replace('SignUp');
      
    // }, 3000);

   
  }
  checkPermissions = async () => {
    const enabled = await messaging().hasPermission();
    if (enabled) {
      console.log('Permission granted');
      this.getToken();
    } else {
      console.log('Requesting permission');
      this.requestPermission();
    } 
  };   


  requestPermission = async () => {
    try {
      await messaging().requestPermission();
      this.getToken();
    } catch (error) {
      console.log('Permission rejected');
    }
  };

  getToken = async () => {
    let fcmToken = await AsyncStorage.getItem('fcmToken');
    console.log('Before fcmToken:', fcmToken);

    if (!fcmToken) {
      fcmToken = await messaging().getToken();
      console.log('After fcmToken:', fcmToken);

      if (fcmToken) {
        await AsyncStorage.setItem('fcmToken', fcmToken);
        this.setState({ fcmToken });
      }
    }
  };

 
  render() {
    return (
      <ImageBackground
  source={require('../../assets/Common/bg.png')}
  style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
>
  <View>
    <Image
      source={require('../../assets/Splash/Splash.png')}
      style={{ width: 1000, height: 200 }}
      resizeMode="contain"
    />
  </View>
</ImageBackground>
    );
  }
}
