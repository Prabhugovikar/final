import React, {Component} from 'react';
import {StyleSheet, View, Image, Text, TextInput, Button, ActivityIndicator, TouchableOpacity,CameraRoll ,
ToastAndroid, ImageBackground} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SafeAreaView } from 'react-native-safe-area-context';
import QRCode from 'react-native-qrcode-svg';
import Share from 'react-native-share';
import {
  launchCamera,
  launchImageLibrary
} from 'react-native-image-picker';
import { isUriAnAndroidResourceIdentifier } from 'react-native-svg/lib/typescript/LocalSvg';
import { API_URL } from '../../service';
// import RNFS from "react-native-fs"

// const value = AsyncStorage.getItem('number');
//      if(value!==null)
//     console.log(value)


const App = ({navigation,route}) => {
const [QRvalue, setQRValue] = React.useState('');
const [QRImages, setQRImages] = React.useState('');
const [Email, setEmail] = React.useState('');
const [values, setValues] = React.useState('');
const [filePath, setFilePath] = React.useState({});
const [image, setImage] = React.useState('');
var ref = React.useRef();

const params = route.params;
// console.log('params', params.account.mobilenumber);

// var number = (value._z)

const chooseFile = (type) => {
    let options = {
      mediaType: 'mixed',
      maxWidth: 300,
      maxHeight: 550,
      quality: 1,
    };
    launchImageLibrary(options, (response) => {
      console.log('Response = ', response);
      setImage(response)
      
      
      if (response.didCancel) {
        alert('User cancelled camera picker');
        return;
      } else if (response.errorCode == 'camera_unavailable') {
        alert('Camera not available on device');
        return;
      } else if (response.errorCode == 'permission') {
        alert('Permission not satisfied');
        return;
      } else if (response.errorCode == 'others') {
        alert(response.errorMessage);
        return;
      }
      console.log('base64 -> ', response.base64);
      console.log('uri -> ', response.uri);
      console.log('width -> ', response.width);
      console.log('height -> ', response.height);
      console.log('fileSize -> ', response.fileSize);
      console.log('type -> ', response.type);
      console.log('fileName -> ', response.fileName);
      setFilePath(response);
    });
  };

  const Qrverify = () =>{
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(Email)) {
      alert("Please enter a valid email address");
      return;
    }
    const photo = { uri : image.assets[0].uri,
      type : image.assets[0].type,
      name: image.assets[0].fileName,
};
    var formdata = new FormData();
    formdata.append("mobilenumber", params.account.mobilenumber);
    formdata.append("qr_image", photo);
    formdata.append("email", Email)
    console.log('photo', photo)

    var requestOptions = {
      method: 'PUT',
      body: formdata,
      redirect: 'follow'
    };
    console.log('Before API', requestOptions)

    fetch(API_URL+'emailsent', requestOptions)
      .then(response => response.json())
      .then( async result =>{ 
        if (result.Status === true) {
          console.log(result)
          await AsyncStorage.setItem('@user', JSON.stringify(result));
          navigation.navigate('Profile1');
        }
        else{
          alert("failed to send")
        }
      })
      .catch(error => console.log('error', error));
    }

    return (
        <SafeAreaView style={{flex:1}}>  
        <ImageBackground
      source={require('../../assets/Common/bg.png')}
      style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
    >        
      <View>
        
        <Image 
                 source={require('./../../assets/Splash/Splash.png')}  
                 style={{width: 350, height: 200, alignSelf:'center', marginTop:-20}}
                 resizeMode="contain"
                 />
       
        <View style={{alignItems:'center'}}>
           
           </View> 
        
            
       
      <Text style = {{
      fontSize:10,
      // marginTop:10,
      marginLeft:20,
      fontWeight:'bold'
    }}>
      </Text>
    <TextInput placeholder = {'Email ID'} keyboardType ='email-address' underlineColorAndroid={'#ccc'}
    value={Email}
    onChangeText={setEmail}
    style= {{
      fontSize:20,
      marginHorizontal:30
    }}>
    </TextInput>
    </View>
    <View style={{
        marginTop:10,
        alignItems:'center'
    }}>
      
        <TouchableOpacity  style={{
          marginTop:30,
          height:50,
          width:300,
          backgroundColor:"darkblue",
          borderRadius:10
          
        }} onPress={() => chooseFile('photo')}>
        <Text 
        style={{marginTop :10,
                fontWeight:'bold',
                alignSelf:'center',
                fontSize:17,
                color:'#ffcc00',
                letterSpacing:0.03,
                fontFamily:'sans-serif'
              }}>
                Upload QR Image</Text>
     </TouchableOpacity>
        <TouchableOpacity  style={{
          marginTop:30,
          height:50,
          width:300,
          backgroundColor:"darkblue",
          borderRadius:10
          
        }} onPress={Qrverify}>
        <Text 
        style={{marginTop :10,
                fontWeight:'bold',
                alignSelf:'center',
                fontSize:17,
                color:'#ffcc00',
                letterSpacing:0.03,
                fontFamily:'sans-serif'
              }}>
                Send</Text>
     </TouchableOpacity>
    </View>
    </ImageBackground>
    </SafeAreaView>
    );

}

export default App;