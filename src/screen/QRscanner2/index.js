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
  Image
} from 'react-native';

import {
  Header,
  Colors,
} from 'react-native/Libraries/NewAppScreen';
import {API_URL} from '../../service';
import QRCodeScanner from 'react-native-qrcode-scanner';  
import { launchImageLibrary } from 'react-native-image-picker';

const App = ({navigation,route}) => {
  const [scan, setScan] = useState(false)
  const [result, setResult] = useState()
  const isDarkMode = useColorScheme() === 'dark';
  const [scanQR, setScanQR] = useState('')

  const params = route?.params;
  // console.log('params', params.account.mobilenumber);
   console.log('params', params);

  
  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
    flex:1,
    alignItems: 'center',
    justifyContent: 'center'
  };

    
  const [pickerResponse, setPickerResponse] = useState(null);
  
  const openGallery = () => {
    const options = {
      selectionLimit: 1,
      mediaType: 'photo',
      includeBase64: false,
    };
    launchImageLibrary(options, setPickerResponse);
    
  };
  
  const uri = pickerResponse?.assets && pickerResponse.assets[0].uri;

  const onSuccess = (e) => {
    setResult(e.data)
    setScan(false)
  }

  const startScan = () => {
    setScan(true)
    setResult()
  }

  const ScanQr = () =>{
    const params = route?.params;
    console.log("scanned")
    var myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");

var raw = JSON.stringify({
  _id:  params.account._id,
  mobilenumber : result,
});
console.log(raw)
var requestOptions = {
  method: 'POST',
  headers: myHeaders,
  body: raw,
  redirect: 'follow'
};

fetch(API_URL+'compareUser', requestOptions)
  .then(response => response.json())
  .then(result =>{ 
    console.log(result)
    setScanQR(result)
    if (result.Status === true) {
      console.log(result)
      navigation.navigate('Profile1');
    }
    else{
      alert("QRcode did not match")
    }
  })
  .catch(error => console.log('error', error));
  }
  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView>
        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          style={styles.scrollView}>
          {/* <Header /> */}
          <View style={styles.body}>
            { result &&
              <View style={styles.sectionContainer}>
                <Text style={styles.centerText}>QRValue : {result}</Text>
              </View>
            }
            {/* { !scan &&
              <View style={styles.sectionContainer}>
                <Button
                  title="Start Scan"
                  color="#f194ff"
                  onPress={startScan}
                />
              </View>
            } */}
            { !scan &&
              <View style={styles.sectionContainer}>
                <QRCodeScanner
                 
                  reactivate={true}
                  showMarker={true}
                //   ref={(node) => { this.scanner = node }}
                  onRead={onSuccess}
                  topContent={
                    <Text style={styles.centerText}>
                      Scan your QRCode!
                    </Text>
                  }
                  // bottomContent={
                  //   <TouchableOpacity style={styles.buttonTouchable} onPress={() => setScan(false)}>
                  //     <Text style={styles.buttonText}>Cancel Scan</Text>
                  //   </TouchableOpacity>
                  // }
                />
                 {/* <Button title="Cancel scan" onPress={ navigation.navigate('QRscanner')} /> */}

                 <TouchableOpacity
          activeOpacity={0.5}
          style={{
            marginBottom:10,
            height:50,
            width:300,
            backgroundColor:"darkblue",
            borderRadius:10,
            alignSelf:'center'
            
          }}
          onPress={ScanQr}>
          <Text  style={{marginTop :10,
            fontWeight:'bold',
            alignSelf:'center',
            fontSize:17,
            color:'#ffcc00',
            letterSpacing:0.03,
            fontFamily:'sans-serif'
          }}>Verify Your QRcode</Text>
        </TouchableOpacity>
      {
        uri && (
          <Image source={{uri}} style=
            {{marginBottom:10, height:400, width:400,margin:20}}>
          </Image>
        )
      }
              </View>
            }
            
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
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
    marginTop: 5,
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
    padding: 35,
    color: '#777',
    alignSelf:'center'
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