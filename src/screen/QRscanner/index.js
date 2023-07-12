import React, { useState } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  TouchableOpacity,
  useColorScheme,
  Button,
  Image,
  TextInput,
  ImageBackground,
  ActivityIndicator
} from 'react-native';

import {
  Header,
  Colors,
} from 'react-native/Libraries/NewAppScreen';
import { API_URL } from '../../service';
import QRCodeScanner from 'react-native-qrcode-scanner';
import { launchImageLibrary } from 'react-native-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';

const App = ({ navigation, route }) => {
  const [filePath, setFilePath] = useState({});
  const [image, setImage] = useState('');
  const [scan, setScan] = useState(false)
  const [result, setResult] = useState()
  const [isLoading, setIsLoading] = useState(false);

  const params = route?.params;
  // console.log('params', params);

  const Qrverify = async () => {
    const num = (await AsyncStorage.getItem('number')).replace(/"/g, '');
    console.log('result', num);
    const photo = {
      uri: image.assets[0].uri,
      type: image.assets[0].type,
      name: image.assets[0].fileName,
    };
    var formdata = new FormData();
    formdata.append("mobilenumber", num);
    formdata.append("scan_image", photo);
    console.log(formdata)
    var requestOptions = {
      method: 'PUT',
      body: formdata,
      redirect: 'follow'
    };

    await fetch(API_URL + 'imageComparission', requestOptions)
      .then(response => response.json())
      .then(async result => {
        if (result.Status === true) {
          console.log(result)
          navigation.navigate('Profile1');
          await AsyncStorage.setItem('signin', JSON.stringify(result))
        }
        else {
          alert("Image did not match")
        }
      })
      .catch(error => console.log('error', error));
  }

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

  return (

    <SafeAreaView style={{
      flex: 1
    }}>

      <ImageBackground
        source={require('../../assets/Common/bg.png')}
        style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
      >
        <View>
          <TouchableOpacity onPress={() => navigation.navigate('OtpVerification2')}>
            <Image
              source={require('./../../assets/Common/back.png')}
              style={{ height: 35, width: 35, position: 'absolute', top: -40, left: 10 }}
            />
          </TouchableOpacity>

          <Image
            source={require('./../../assets/Splash/Splash.png')}
            style={{ width: 300, height: 200, alignSelf: 'center', marginTop: -50 }}
            resizeMode="contain"
          />
          <Text style={{
            color: 'darkblue',
            alignItems: 'center',
            marginHorizontal: 35,
            marginTop: -1,
            justifyContent: 'center',
            flexWrap: 'wrap'
          }}>
            Please scan your Qrcode to continue with existing account</Text>

          <Text style={{
            fontSize: 10,
            // marginTop:10,
            marginLeft: 20,
            fontWeight: 'bold'
          }}>
          </Text>

        </View>
        <View style={{
          marginTop: 10,
          alignItems: 'center'
        }}>

          <Image
            source={require('./../../assets/qrcode/68108358424540.png')}
            style={{ width: 130, height: 130, alignSelf: 'center', marginTop: -10 }}
            resizeMode="contain"
          />

          <TouchableOpacity
            activeOpacity={0.5}
            style={{
              marginTop: 30,
              height: 50,
              width: 300,
              backgroundColor: "darkblue",
              borderRadius: 10

            }}
            onPress={() => navigation.navigate('QRscanner2', params)}>
            <Text style={{
              marginTop: 10,
              fontWeight: 'bold',
              alignSelf: 'center',
              fontSize: 17,
              color: '#ffcc00',
              letterSpacing: 0.03,
              fontFamily: 'sans-serif'
            }}>Scan Your QRcode</Text>
          </TouchableOpacity>

          <TouchableOpacity
            activeOpacity={0.5}
            style={{
              marginTop: 30,
              height: 50,
              width: 300,
              backgroundColor: "darkblue",
              borderRadius: 10

            }}
            onPress={() => chooseFile('photo')}>
            <Text style={{
              marginTop: 10,
              fontWeight: 'bold',
              alignSelf: 'center',
              fontSize: 17,
              color: '#ffcc00',
              letterSpacing: 0.03,
              fontFamily: 'sans-serif'
            }}>Choose Image</Text>
          </TouchableOpacity>

          {/* <TextInput 
         placeholder= "QR Text"
         autoCapitalize="none"
         style= {{
         marginLeft:10,
         fontSize:20,
         marginTop:20,            
        }}/> */}

          <TouchableOpacity style={{
            marginTop: 30,
            height: 50,
            width: 300,
            backgroundColor: "darkblue",
            borderRadius: 10

          }} onPress={Qrverify}>
            {isLoading ? (
              <View style={{ flex: 1, justifyContent: "center", alignItems: "center", }}>
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

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: Colors.lighter,
  },
  body: {
    backgroundColor: Colors.white,
  },
  sectionContainer: {
    marginTop: 32,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.black,
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
    color: Colors.dark,
  },
  highlight: {
    fontWeight: '700',
  },
  footer: {
    color: Colors.dark,
    fontSize: 12,
    fontWeight: '600',
    padding: 4,
    paddingRight: 12,
    textAlign: 'right',
  },
  centerText: {
    flex: 1,
    fontSize: 18,
    padding: 32,
    color: '#777',
  },
  textBold: {
    fontWeight: '500',
    color: '#000',
  },
  buttonText: {
    fontSize: 21,
    color: 'rgb(0,122,255)',
  },
  buttonTouchable: {
    padding: 16,
  },
});