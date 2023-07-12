import React, { Component, useState } from 'react';
import { StyleSheet, View, Image, Text, TextInput, Button, TouchableOpacity, Alert, ImageBackground, ScrollView, Dimensions,ActivityIndicator} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SafeAreaView } from 'react-native-safe-area-context';
import { firebase } from '@react-native-firebase/auth';

import { API_URL } from '../../service';
import { KeyCenter } from '../../service';


const horizontalScale = (size) => (width / guidelineBaseWidth) * size;
const verticalScale = (size) => (height / guidelineBaseHeight) * size;
const moderateScale = (size, factor = 0.5) => size + (horizontalScale(size) - size) * factor;


const { width, height } = Dimensions.get('window');

const guidelineBaseWidth = 375;
const guidelineBaseHeight = 812;

const App = ({ navigation, route }) => {
  const [name, onChangeName] = React.useState('');
  // const [mobilenumber, onChangeNumber] = React.useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedCode, setSelectedCode] = useState('+91');
  const [selectedFlag, setSelectedFlag] = useState(require('../../assets/FlagIcons/India.png'));
  const [mobileNumber, setMobileNumber] = useState('');
  



  AsyncStorage.setItem('number', mobileNumber);
  AsyncStorage.setItem('username', name)

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
    if (name === '' || mobileNumber === '') {
      // Handle empty fields, show error message, etc.
      return;
    }

    setIsLoading(true);
    AsyncStorage.setItem('number', mobileNumber)
    var myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');

    var raw = JSON.stringify({
      name: name,
      mobilenumber: mobileNumber,
      token: 'dkjqhfu48dfkjkhqh489y3',
    });

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow',
    };

    fetch(API_URL + 'registration', requestOptions)
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
        console.log(result.response._id);
        AsyncStorage.setItem('profileid', result.response._id)
        phoneauth();
        // Perform navigation to OTP screen here
        // navigation.navigate('OtpVerification');
      })
      .catch((error) => console.log('error', error))
      .finally(() => {
        setIsLoading(false);
      });
  }
  // const getOtp = () => {
  //   const formattedNumber = mobilenumber.replace(/\s/g, '').replace(/^(\+91)?0*(\d{10})$/, '$2');
  //   console.log('num', formattedNumber)
  //   firebase
  //     .auth()
  //     .signInWithPhoneNumber('+91' + mobilenumber)
  //     .then(confirmResult => {
  //       // this.setState({ confirmResult })
  //       // login(confirmResult);
  //       console.log('result', confirmResult)

  //       navigation.navigate('OtpVerification', { result: confirmResult, num: formattedNumber })
  //       //  setIsLoading(false)
  //     })
  //     .catch(error => {
  //       // setIsLoading(false)
  //       alert(error.message)
  //       console.log('error', error)
  //     })
  // }


  const phoneauth = () => {
    // setIsLoading(true)
    const formattedNumber = mobileNumber.replace(/\s/g, '').replace(/^(\+91)?0*(\d{10})$/, '$2');
    console.log('num', selectedCode + mobileNumber)
    // if (validatePhoneNumber()) {
    firebase
      .auth()
      .signInWithPhoneNumber(selectedCode + mobileNumber)
      .then(confirmResult => {
         setIsLoading(false)
        navigation.navigate('OtpVerification', { result: confirmResult, num: formattedNumber })
        // navigation.navigate('OtpScreen', { mobileNumber: '+91-9876543210' });

        console.log('result', confirmResult)
      })
      .catch(error => {
        setIsLoading(false)
        alert(error.message)
        // console.log('error',error)
      })

  }




  return (
    <SafeAreaView style={{ flex: 1 }}>

      <ImageBackground
        source={require('../../assets/Common/bg.png')}
        style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
      >

        <View>

          <Image
            source={require('../../assets/Splash/Splash.png')}
            style={{ width: 360, height: 200, alignSelf: 'center' }}
            resizeMode="contain"
          />

          <Text style={{
            alignSelf: 'center',
            fontSize: 20
          }}>
            Welcome To Hiddenly!</Text>

          <Text style={{
            fontSize: 20,
            marginTop: 20,
            marginLeft: 52,
            fontWeight: 'bold',
            color: 'black'
          }}>
            Name
          </Text>

          <TextInput keyboardType='default' value={name} onChangeText={onChangeName} style={{
            marginHorizontal: 32,
            fontSize: 20,
            marginTop: 5,
            left: 40,
            width: 280,
            backgroundColor: '#eee'
          }} />


          <Text style={{
            fontSize: 20,
            marginTop: 20,
            marginLeft: 32,
            fontWeight: 'bold',
            color: 'black'
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



        <View style={{
          marginTop: 5
        }}>
           
          <TouchableOpacity
            activeOpacity={0.5}
            style={{
              marginTop: 30,
              height: 50,
              width: 300,
              backgroundColor: "darkblue",
              borderRadius: 10,
              alignSelf: 'center'

            }}
            // onPress={() => navigation.navigate('OtpVerification')}
            onPress={registration}
            disabled={isLoading} // Disable button while loading


          >
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
            }}>Sign Up</Text>   
            </>
            )}
          </TouchableOpacity>
          

          <View style={{
            position: 'absolute', left: 35, top: 95
            //  marginTop:13,marginLeft:44
          }}>
            <Text>
              Already have an account?
            </Text>
          </View>
          <View style={{
            position: 'absolute', right: 40, top: 92
            //  marginTop:13,marginLeft:44
          }}>
            <TouchableOpacity onPress={() => navigation.navigate('Sign_In')}>
              <Text style={{
                color: 'blue', fontWeight: 'bold', fontSize: 17
                //  marginLeft:20,
                //  marginTop:5
              }}>
                Sign In</Text>

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
    height: '40%',
    backgroundColor: '#fff',
    borderRadius: 4,
    elevation: 4,
    padding: 8,
    bottom: 69,
    right: '25.9%'
  },
  container3: {
    height: '9%',
    width: 62,
    borderColor: 'gray',
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    // top:4,
    bottom: 44,
    //borderRadius: 12,
  },
  dropdownItem: {
    paddingVertical: 4,
  },
  dropdownImage: {
    width: 21, // Adjust the width as needed
    height: 21, // Adjust the height as needed
    marginRight: 8,
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