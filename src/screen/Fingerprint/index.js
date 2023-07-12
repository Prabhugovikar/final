import React, {Component,useState,useEffect} from 'react';
import {StyleSheet, View, Image, Text, TextInput, Button, TouchableOpacity, Pressable, ImageBackground} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SafeAreaView } from 'react-native-safe-area-context';
import FingerprintScanner from 'react-native-fingerprint-scanner';

const Fingerprint = ({navigation, route}) => {

  
  const [biometryType, setbiometryType] = useState(undefined);
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    FingerprintScanner.isSensorAvailable()
      .then((biometryType) => {
        showAuthenticationDialog();
        setbiometryType(biometryType);
      })
      .catch((error) => console.log('isSensorAvailable error => ', error));

    return () => {
      FingerprintScanner.release();
    };
  }, []);

  const getMessage = () => {
    if (biometryType === 'Face ID') {
      return 'Scan your Face on the device to continue';
    } else {
      return 'Scan your Fingerprint on the device scanner to continue';
    }
  };

  const showAuthenticationDialog = () => {
    if (biometryType !== null && biometryType !== undefined) {
      FingerprintScanner.authenticate({
        description: getMessage(),
      })
        .then(() => {
          setAuthenticated(true);
          navigation.navigate('QRcode', route.params); // navigate to QR code screen
        })
        .catch((error) => {
          console.log('Authentication error is => ', error);
        });
    } else {
      console.log('biometric authentication is not available');
    }
  };
      // const {biometryType}=this.state;
    // const { postId} = this.props.route.params;
    return (
        <SafeAreaView style={{flex:1}}>
          <ImageBackground
      source={require('../../assets/Common/bg.png')}
      style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
    >             
                <View style={{marginTop:60}}>
        <Image 
                 source={require('./../../assets/Fingerprint/Fingerprint.png')}  
                 style={{width: 400, height: 250}}
                 resizeMode="contain"
                 />
        </View>
        <View>
            <Text style={{ alignSelf:'center',fontSize:30,marginTop:30
        }}>  Fingerprint</Text>         
        <Text style = {{
            fontSize:20, marginTop:20,
            marginLeft:30,alignContent:'center',alignSelf:'auto',textAlign:'center'}}>
            Activate finger print, so you don't need to confirm your PIN everytime to authenticate.
            </Text>      
        </View>
    <View style={{
        marginTop:30
    }}>
        <TouchableOpacity
            
          activeOpacity={0.5}
          style={{
            marginTop:20,
            height:50,
            width:300,
            backgroundColor: "darkblue",
            borderRadius:10,
            alignSelf:'center'
            
          }}>
          {/* // onPress={() =>navigation.navigate('QRcode', route.params)}> */}
          <Pressable 
          onPress={showAuthenticationDialog}
          >
            <Text  style={{marginTop :10,
            fontWeight:'bold',
            alignSelf:'center',
            fontSize:17,
            color:'#ffcc00',
            letterSpacing:0.03,
            fontFamily:'sans-serif'
          }}> Activate</Text>
          </Pressable>
        </TouchableOpacity>
    </View>
    </ImageBackground>
    </SafeAreaView>
    );


}

export default Fingerprint;