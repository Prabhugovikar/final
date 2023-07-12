import React, { Component, useState } from 'react';
import { StyleSheet, View, Image, Text, TextInput, Button, TouchableOpacity, Alert, ImageBackground, KeyboardAvoidingView, Dimensions, ScrollView,ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SafeAreaView } from 'react-native-safe-area-context';
import { firebase } from '@react-native-firebase/auth';
import { API_URL } from '../../service';

const horizontalScale = (size) => (width / guidelineBaseWidth) * size;
const verticalScale = (size) => (height / guidelineBaseHeight) * size;
const moderateScale = (size, factor = 0.5) => size + (horizontalScale(size) - size) * factor;

const { width, height } = Dimensions.get('window');

const guidelineBaseWidth = 375;
const guidelineBaseHeight = 812;
const App = ({ navigation, route }) => {
  const [mobilenumber, onChangeNumber] = React.useState('');
  const [loader, setLoader] = React.useState(false);
  const [data1, setUserData] = React.useState('');

  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedCode, setSelectedCode] = useState('+91');
  const [selectedFlag, setSelectedFlag] = useState(require('../../assets/FlagIcons/India.png'));
  const [mobileNumber, setMobileNumber] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  


  AsyncStorage.setItem('number', mobileNumber);
  const countryCodes = [
    { code: '+44', flag: require('../../assets/FlagIcons/BH.jpg') },
    { code: '+61', flag: require('../../assets/FlagIcons/AU.jpg') },
    { code: '+7', flag: require('../../assets/FlagIcons/Russia.jpg') },
    { code: '+971', flag: require('../../assets/FlagIcons/Dub.jpg') },
    { code: '+91', flag: require('../../assets/FlagIcons/India.png') },
    { code: '+1', flag: require('../../assets/FlagIcons/Canada.jpg') },
    { code: '+27', flag: require('../../assets/FlagIcons/SouthAf.png') },
    { code: '+49', flag: require('../../assets/FlagIcons/Germany.png') },
    { code: '+41', flag: require('../../assets/FlagIcons/Switzerland.png') },
    { code: '+33', flag: require('../../assets/FlagIcons/Prance.png') },
  ];

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  const handlePhoneNumberChange = (number) => {
    setMobileNumber(number);
    // setnumberwithcountrycode(selectedCode+number)
  };


  const selectCountry = (code) => {
    setSelectedCode(code);
    setShowDropdown(false);
  };


  const handleCodeSelection = (code, flag) => {
    console.log('code', code);
    setSelectedCode(code);
    setSelectedFlag(flag);
    toggleDropdown();
  };


  const validateCode = () => {
    const mobilenumber = selectedCode + mobileNumber;
    if (mobilenumber.length < 13) {
      // setModalVisible(true);
    } else if (mobilenumber.length === 13) {
      // setModalVisible(false);
      // navigation.navigate('OtpVerification');
      registration();
    }
  };

  const registration = () => {
    // setLoader(true);
    setIsLoading(true);

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    console.log('route', route);
    const data = route?.params || {};

    var raw = JSON.stringify({
      mobilenumber: mobileNumber,
    });
    console.log('raw', raw)

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };

    fetch(API_URL + 'loginViaOtp', requestOptions)
      .then(response => response.json())
      .then(async result => {
        console.log("result", result); 
        AsyncStorage.setItem('username',result.name)
        setUserData(result);
        if (result.Status === true) {
          // await AsyncStorage.setItem('@user', JSON.stringify(result));
          // navigation.navigate('OtpVerification2', result);



          AsyncStorage.setItem('profileid', result._id)
          await AsyncStorage.setItem('number',result.mobilenumber);


          
          
          phoneauth();

          setLoader(false);

        } else {
          setLoader(false);
          alert(result.message || 'something went wrong ');
          navigation.navigate('SignUp');

        }
      })
      .catch(error => {
        setIsLoading(false)

        // setLoader(false);
        console.log('error', error);
      })

  }


  const phoneauth = () => {
    // setIsLoading(true)
    const formattedNumber = mobileNumber.replace(/\s/g, '').replace(/^(\+91)?0*(\d{10})$/, '$2');
    console.log('num', selectedCode + mobileNumber)
    // if (validatePhoneNumber()) {
    firebase
      .auth()
      .signInWithPhoneNumber(selectedCode + mobileNumber)
      .then(confirmResult => {
        //  setIsLoading(false)
        navigation.navigate('OtpVerification2', { result: confirmResult, num: formattedNumber })
        // navigation.navigate('OtpScreen', { mobileNumber: '+91-9876543210' });







        console.log('result', confirmResult)
      })
      .catch(error => {
        // setIsLoading(false)
        alert(error.message)
        // console.log('error',error)
      })

  }


  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ImageBackground
        source={require('../../assets/Common/bg.png')}
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center'
        }}>

        <View style={{
          marginTop: 70
        }}>
          <Image
            source={require('./../../assets/Splash/Splash.png')}
            style={{ width: 350, height: 200, alignSelf: 'center' }}
            resizeMode="contain"
          />

          <Text style={{
            alignSelf: 'center',
            fontSize: 20
          }}>
            Welcome To Hiddenly!</Text>






          <View>
            <Text style={{
              fontSize: 20,
              marginTop: 40,
              marginLeft: 25,
              fontWeight: 'bold',
              color: 'black',

            }}>
              Mobile Number</Text>

            <TextInput
              keyboardType='numeric'
              //  value={mobilenumber} 
              //  onChangeText={onChangeNumber} 
              onChangeText={handlePhoneNumberChange}
              value={mobileNumber}
              maxLength={13}
              style={{
                marginHorizontal: 32,
                fontSize: 20,
                marginTop: 10,
                backgroundColor: '#eee',
                width: 280,
                left: 40,

              }}

            />


            {/* </TextInput> */}
            <View style={styles.container3}>

              <TouchableOpacity onPress={toggleDropdown}>
                <Image
                  source={selectedFlag}
                  style={{
                    width: 20,
                    height: 20,
                    marginTop: verticalScale(80),
                    bottom: "55%",
                    left: 5
                  }} />

                <Text style={{
                  left: 28,
                  color: '#111111',
                  bottom: "74%",
                  right: 6
                }}>{selectedCode}</Text>

              </TouchableOpacity>
            </View>

            {showDropdown && (
              <View style={styles.dropdownContainer}>
                <ScrollView>
                  {countryCodes.map((country) => (
                    <TouchableOpacity
                      key={country.code}
                      style={styles.dropdownItem}
                      onPress={() => handleCodeSelection(country.code, country.flag)}>
                      <Image
                        source={country.flag}
                        style={styles.dropdownImage}
                      />
                      <Text style={styles.dropdownText}>
                        {country.code}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </ScrollView>
              </View>
            )}
          </View>
        </View>









        <View style={{
          marginTop: 50
        }}>

          <TouchableOpacity
            activeOpacity={0.5}
            style={{
              marginTop: 0,
              height: 50,
              width: 300,
              backgroundColor: "darkblue",
              borderRadius: 10,
              alignSelf: 'center'

            }}
            onPress={registration}>

{isLoading ? (
              <View style={{ flex: 1, justifyContent: "center", alignItems: "center",}}>
                <ActivityIndicator color={"#fff"} size={'large'} />
              </View>
            ) : (
              <>
            <Text style={{
              marginTop: 10,
              fontWeight: 'bold',
              alignSelf: 'center',
              fontSize: 20,
              color: '#ffcc00',
              letterSpacing: 0.03,
              fontFamily: 'sans-serif'
            }}>Sign In</Text>
             </>
            )}
          </TouchableOpacity>
          {/* <View style={{
                    marginTop:10,
                    justifyContent:'center',
                    alignItems:'center'
     }}>
     <Text>
      Don't have an account?
      </Text>
      <TouchableOpacity onPress={()=>navigation.navigate('SignUp')}>
      <Text style={{
                   color:'blue',fontWeight: 'bold'
                  }}>
        Sign Up</Text>
      </TouchableOpacity>
      </View> */}
          <View style={{
            // marginTop:13,marginLeft:44
            position: 'absolute', left: 30, top: 65
          }}>
            <Text>
              Already have an account?
            </Text>
          </View>
          <View style={{ position: 'absolute', right: 40, top: 62 }}>
            <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
              <Text style={{
                color: 'blue', fontWeight: 'bold', fontSize: 17
                //  marginLeft:20,
                //  marginTop:5
              }}>
                Sign Up</Text>
            </TouchableOpacity >
          </View>
          <Text style={{
            marginTop: 50,
            alignSelf: 'center',
            fontWeight: '300',
            // color:'black'
          }}>
            Version 1.0.0
          </Text>
        </View>

      </ImageBackground>
    </SafeAreaView>

  );

}



const styles = StyleSheet.create({

  dropdownContainer: {
    width: '40%',
    height: '50%',
    backgroundColor: '#fff',
    borderRadius: 4,
    elevation: 4,
    padding: 8,
    bottom: 40,
    marginTop: '3%',
    // right: '25.9%'
  },
  container3: {
    height: 45,
    width: 62,
    borderColor: 'gray',
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    // top:4,
    bottom: 48,
    //borderRadius: 12,
  },
  dropdownItem: {
    paddingVertical: 4,
  },
  dropdownImage: {
    width: 21, // Adjust the width as needed
    height: 21, // Adjust the height as needed
    marginRight: 9,
    // Add any desired margin or spacing
  },
  dropdownText: {
    fontSize: 13.3,
    bottom: 20,
    left: 30,
    color: '#111111',

  },
})


export default App;