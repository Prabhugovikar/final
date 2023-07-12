import React, { Component, useEffect,useState } from 'react';
import {
  StyleSheet, View, Image, Text, TextInput, Button, ActivityIndicator, TouchableOpacity, ToastAndroid,
  ImageBackground
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SafeAreaView } from 'react-native-safe-area-context';
import QRCode from 'react-native-qrcode-svg';
import Share from 'react-native-share';
import {
  launchCamera,
  launchImageLibrary
} from 'react-native-image-picker';
import RNFS from "react-native-fs";
import CameraRoll from "@react-native-community/cameraroll";
import { PermissionsAndroid } from 'react-native';
import { API_URL } from '../../service';
// var value =  AsyncStorage.getItem('number');


const App = ({ navigation, route }) => {
  const refresh = () => window.location.reload(true)
  const [state, setState] = React.useState({});
  const [QRvalue, setQRValue] = React.useState('');
  const [QRImages, setQRImages] = React.useState('');
  const [Email, setEmail] = React.useState('');
  const [imageSaved, setImageSaved] = React.useState(false);
  const [busy, setBusy] = React.useState(false);
  const [mobileNumber, setmobileNumber] = React.useState('');
  const [isLoading, setIsLoading] = useState(false);

  // const [refresh, setRefresh] = React.useState(false);

  const params = route.params;
  console.log('params', params);

  var ref = React.useRef();


  // const saveQRCode = () => {
  //   save()
  //   ref.current.toDataURL(callback);
  // };


  const saveQRCode = async () => {
    save();


    ref.current.toDataURL(callback);
    // console.log('ref', ref.current)


  };
  useEffect(() => {
    getItem();
  })

  const getItem = async () => {
    const num = await AsyncStorage.getItem('number')
    console.log('result', num);
    setmobileNumber(num);
  }
  const callback = async (dataURL) => {
    let shareImageBase64 = {
      title: 'React Native',
      url: `data:image/png;base64,${dataURL}`,
      subject: 'Share Link',
    };
    try {
      // sendmail(dataURL);
      await Share.open(shareImageBase64);
      navigation.navigate('Profile1');
    } catch (error) {
      console.log(error);
    }
  };


  const save = () => {
    setBusy(true);
    ref.current.toDataURL((data) => {
      RNFS.writeFile(RNFS.CachesDirectoryPath + "/some-name.png", data, "base64")
        .then(() => {
          sendmail(RNFS.CachesDirectoryPath + "/some-name.png",
            "photo")
          return CameraRoll.save(
            RNFS.CachesDirectoryPath + "/some-name.png",
            "photo"
          );
        })
        .then(() => {
          setBusy(false);
          setImageSaved(true);
          ToastAndroid.show("Saved to gallery !!", ToastAndroid.SHORT);
        });
    });
  };

  const sendmail = async (data) => {
    try {
      setIsLoading(true); // Set loading to true before the fetch request
  
      console.log('data', data);
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(Email)) {
        alert("Please enter a valid email address");
        return;
      }
  
      const photo = {
        uri: 'file://' + data,
        type: 'image/png',
        name: 'some-name.png',
      };
      
      var formdata = new FormData();
      formdata.append("mobilenumber", params.num);
      formdata.append("qr_image", photo);
      formdata.append("email", Email);
      console.log('photo', photo);
  
      var requestOptions = {
        method: 'PUT',
        body: formdata,
        redirect: 'follow'
      };
      console.log('Before API', requestOptions);
  
      const response = await fetch(API_URL + 'emailsent', requestOptions);
      const result = await response.json();
  
      if (result.Status === true) {
        console.log(result);
        await AsyncStorage.setItem('@user', JSON.stringify(result));
        navigation.navigate('Profile1');
      } else {
        alert("failed to send");
      }
    } catch (error) {
      console.log('error', error);
    } finally {
      setIsLoading(false); // Set loading to false after the fetch request, regardless of success or failure
    }
  };
  


  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ImageBackground
        source={require('../../assets/Common/bg.png')}
        style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
      >
        <View>

          <Image
            source={require('./../../assets/Splash/Splash.png')}
            style={{ width: 200, height: 200, alignSelf: 'center', marginTop: -20 }}
            resizeMode="contain"
          />
          <View style={{ alignItems: 'center' }}>
            <QRCode
              size={200}

              value={params.num}
              // logo={{setQRImages}}

              logoSize={60}
              logoBackgroundColor='transparent'
              getRef={ref}
            />
          </View>

        </View>
        <View style={{
          marginTop: 20,
          alignItems: 'center'
        }}>
          <Text style={{
            color: 'darkblue',
            marginHorizontal: 35,
          }}>
            Please keep your QR code in a safe place, we are going to ask for it anytime you want to activate the app in another device!</Text>
          <TextInput placeholder={'Email ID'} keyboardType='email-address' underlineColorAndroid={'#ccc'}
            value={Email}
            onChangeText={setEmail}
            style={{
              fontSize: 20,
              marginHorizontal: 30,
              width: 300
            }}>
          </TextInput>
          <TouchableOpacity onPress={saveQRCode} style={{
            marginTop: 30,
            height: 50,
            width: 300,
            backgroundColor: "darkblue",
            borderRadius: 10

          }}>
             {isLoading ? (
              <View style={{ flex: 1, justifyContent: "center", alignItems: "center",}}>
                <ActivityIndicator color={"#fff"} size={'large'} />
              </View>
            ) : (
              <>
            <Text
              style={{
                marginTop: 10,
                fontWeight: 'bold',
                alignSelf: 'center',
                fontSize: 17,
                color: '#ffcc00',
                letterSpacing: 0.03,
                fontFamily: 'sans-serif'
              }}>
              Submit</Text>
              </>
            )}
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </SafeAreaView>
  );

}

export default App;