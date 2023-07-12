import React, { FC, useState, useRef, useEffect } from 'react';
import {
  StyleSheet,
  Button,
  View,
  TextInput,
  Text,
  SafeAreaView,
  Dimensions,
  TouchableOpacity,
  Image,
  // TouchableOpacity,
  Alert,
  ImageBackground
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_URL } from '../../service';
// import { KeyCenter } from '../../service';
// import ZegoUIKitSignalingPlugin from '@zegocloud/zego-uikit-signaling-plugin-rn';
// import ZegoUIKitPrebuiltCallService, {
//   ZegoCallInvitationDialog, ZegoUIKitPrebuiltCallWaitingScreen, ZegoUIKitPrebuiltCallInCallScreen, ZegoSendCallInvitationButton,
// } from '@zegocloud/zego-uikit-prebuilt-call-rn';

//import CheckBox from '@react-native-community/checkbox';
const initialState = {
  react: false,
};

//import {LinearButton} from '../../templates';
const { width, height } = Dimensions.get('window');

export const OtpScreen = ({ navigation, route, props }) => {
  const params = route?.params;
  // console.log(params.mobilenumber)
  //const session = useSelector(state => state.user.session);

  // const { otp } = route.param;
  // console.log(otp)
  const pin1Ref = useRef(null);
  const pin2Ref = useRef(null);
  const pin3Ref = useRef(null);
  const pin4Ref = useRef(null);
  const pin5Ref = useRef(null);
  const pin6Ref = useRef(null);

  const [pin1, setPin1] = useState('');
  const [pin2, setPin2] = useState('');
  const [pin3, setPin3] = useState('');
  const [pin4, setPin4] = useState('');
  const [pin5, setPin5] = useState('');
  const [pin6, setPin6] = useState('');

  const [otp, setOtp] = useState('');
  const { result, num } = route?.params;


  // console.log(otp)

  const [generatedOtp, setgeneratedOtp] = useState('');
  const [isVerified, setVerified] = useState(false);
  const [resendOtp, setresendOtp] = useState('');
  var pin = (pin1 + pin2 + pin3 + pin4);

  const [isLoading, setIsLoading] = useState(false);
  const [previousKeyPress, setPreviousKeyPress] = useState({
    key: 'key1',
    value: 'Backspace',
  });

  useEffect(() => {
    pin1Ref.current.focus();
  }, []);

  useEffect(() => {
    if (pin1 !== '') {
      pin2Ref.current.focus();
      setPreviousKeyPress({
        key: 'key2',
        value: 'Backspace',
      });
    }
  }, [pin1]);

  useEffect(() => {
    if (pin2 !== '') {
      pin3Ref.current.focus();
      setPreviousKeyPress({
        key: 'key3',
        value: 'Backspace',
      });
    }
  }, [pin2]);

  useEffect(() => {
    if (pin3 !== '') {
      pin4Ref.current.focus();
      setPreviousKeyPress({
        key: 'key4',
        value: 'Backspace',
      });
    }
  }, [pin3]);

  useEffect(() => {
    if (pin4 !== '') {
      pin5Ref.current.focus();
      setPreviousKeyPress({
        key: 'key4',
        value: 'Backspace',
      });
    }
  }, [pin4]);

  useEffect(() => {
    if (pin5 !== '') {
      pin6Ref.current.focus();
      setPreviousKeyPress({
        key: 'key4',
        value: 'Backspace',
      });
    }
  }, [pin5]);


  useEffect(() => {
    if (pin6 !== '') {
      pin4Ref.current.focus();
      setPreviousKeyPress({
        key: 'key4',
        value: 'Backspace',
      });
    }
  }, [pin6]);













  // useEffect(()=>{
  //   const params = route?.params;
  // // console.log('Result from Signup', params?.otp)
  // const digits = params?.otp.toString().split('');
  // // console.log('splitted otp', digits)
  // setPin1(digits[0]);
  // setPin2(digits[1]);
  // setPin3(digits[2]);
  // setPin4(digits[3]);
  //     });




  const clearInput = () => {
    setPin1('');
    setPin2('');
    setPin3('');
    setPin4('');

    pin1Ref.current.focus();
  };

  const [count, setCount] = useState(60);

  useEffect(() => {
    let interval = setInterval(() => {
      setCount(count => count - 1);
    }, 1000);

    if (count === 0) {
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  });


  const verifyOtp = async => {
    // if(){
    //   alert('fill otp')
    //   return
    //  }
    //const params = route?.params;
    //setIsLoading(true);
    const params = route?.params;
    try {
      //handle your api call.
      // navigation.navigate('HomeTab')
      console.log('params', params);
      var myHeaders = new Headers();
      myHeaders.append('Content-Type', 'application/json');

      if (resendOtp.Status === true) {
        var raw = JSON.stringify({
          hashdata: resendOtp.hashdata,
          otp: resendOtp.otp,
          mobilenumber: resendOtp.mobilenumber,

        });
      } else var raw = JSON.stringify({
        hashdata: params?.hashdata,
        otp: params?.otp,
        mobilenumber: params?.mobilenumber,

      });


      var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow',
      };

      fetch(API_URL + 'otpVerify', requestOptions)
        .then(response => response.json())
        .then(async result => {
          setOtp(result)
          console.log(result)
          if (result.Status === true) {
            await AsyncStorage.setItem('user2', JSON.stringify(result));
            navigation.navigate('QRscanner', result)
            await AsyncStorage.setItem('profileid', JSON.stringify(result.account._id));
            await AsyncStorage.setItem('username', result.account.name);
            console.log('username', result.account.name)
            get_id();


            // return ZegoUIKitPrebuiltCallService.init(
            //   KeyCenter.appID, // You can get it from ZEGOCLOUD's console
            //   KeyCenter.appSign, // You can get it from ZEGOCLOUD's console
            //   params?.mobilenumber,
            //   result.account.name,
            //   [ZegoUIKitSignalingPlugin],
            //     {
            //       ringtoneConfig: {
            //         incomingCallFileName: 'zego_incoming.mp3',
            //         outgoingCallFileName: 'zego_outgoing.mp3',
            //       },
            //     });


          }
          else {
            alert('Please enter correct OTP');
          }
        })

        .catch(error => console.log('error', error));

    } catch (err) {
      setIsLoading(false);
      Alert.alert('Error', err.message);
    }

  };

  const handleSubmit = () => {

    console.log(pin1 + pin2 + pin3 + pin4 + pin5 + pin6);
    verifyOtp(pin1 + pin2 + pin3 + pin4 + pin5 + pin6);
  };

  const ResendOtp = () => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      mobilenumber: params.mobilenumber
    });

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };

    fetch(API_URL + 'ResendOtp', requestOptions)
      .then(response => response.json())
      .then(result => {
        console.log(result)
        setresendOtp(result)
        const digits = resendOtp?.otp.toString().split('');
        console.log('splitted otp', digits)
        setPin1(digits[0]);
        setPin2(digits[1]);
        setPin3(digits[2]);
        setPin4(digits[3]);

      })
      .catch(error => console.log('error', error));
  }
  const get_id = () => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      "mobilenumber": num
    });

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };

    fetch(API_URL + 'otpVerify', requestOptions)
      .then(response => response.json())
      .then(result => {
        console.log(result)
        AsyncStorage.setItem('profileid', result.response._id)
        navigation.navigate('Fingerprint', route.params)

      })
      .catch(error => console.log('error', error));
    // return <Text>{error.message}</Text>;

  }
  const [state, setState] = React.useState(initialState);
  const [toggleButton, setToggleButton] = React.useState(false);

  return (
    <SafeAreaView
      style={{
        flex: 1,
      }}>
      <ImageBackground
        source={require('../../assets/Common/bg.png')}
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center'
        }}
      >
        <View style={{ position: 'absolute', top: 20, left: 20 }}>
          <TouchableOpacity
            onPress={() => navigation.navigate('Sign_In')}>
            <Image
              source={require('./../../assets/Common/back.png')}
              style={{ height: 40, width: 40 }}
            />
          </TouchableOpacity>
        </View>
        <View>
          <Image
            source={require('./../../assets/Splash/Splash.png')}
            style={{ width: 300, height: 200, alignSelf: 'center' }}
            resizeMode="contain"
          />
        </View>
        <View>
          <Text style={styles.heading}>Verify Account!</Text>
        </View>
        <View>
          <Text style={styles.subHeading}>Enter 6-digit code we have sent to your mobile number</Text>
        </View>

        <View
          style={{
            marginTop: 10,
            justifyContent: 'space-evenly',
            alignItems: 'center',
            flexDirection: 'row',
          }}>
          <View
            style={{
              //backgroundColor: '#f5f4f2',
              width: '16%',
              height: 50,
              borderRadius: 4,
            }}>
            <TextInput
              style={{ fontSize: 25 }}
              placeholder={pin1}
              underlineColorAndroid={'#bbb'}
              textAlign="center"
              value={pin1}
              keyboardType="number-pad"
              ref={pin1Ref}
              maxLength={1}
              onChangeText={pin => {
                setPin1(pin);
              }}
            />
          </View>

          <View
            style={{
              //backgroundColor: '#f5f4f2',
              width: '16%',
              height: 50,
              borderRadius: 4,
            }}>
            <TextInput
              style={{ fontSize: 25 }}
              placeholder={pin2}
              underlineColorAndroid={'#bbb'}
              textAlign="center"
              value={pin2}
              keyboardType="number-pad"
              ref={pin2Ref}
              maxLength={1}
              onChangeText={pin => {
                setPin2(pin);
              }}
            />
          </View>

          <View
            style={{
              //backgroundColor: '#f5f4f2',
              width: '16%',
              height: 50,
              borderRadius: 4,
            }}>
            <TextInput
              style={{ fontSize: 25 }}
              placeholder={pin3}
              underlineColorAndroid={'#bbb'}
              textAlign="center"
              keyboardType="number-pad"
              value={pin3}
              ref={pin3Ref}
              maxLength={1}
              onChangeText={pin => {
                setPin3(pin);
              }}
            />
          </View>

          <View
            style={{
              //backgroundColor: '#f5f4f2',
              width: '16%',
              height: 50,
              borderRadius: 4,
            }}>
            <TextInput
              style={{ fontSize: 25 }}
              placeholder={pin4}
              underlineColorAndroid={'#bbb'}
              keyboardType="number-pad"
              textAlign="center"
              value={pin4}
              ref={pin4Ref}
              maxLength={1}
              onChangeText={pin => {
                setPin4(pin);
              }}
            />
          </View>
          <View
            style={{
              //backgroundColor: '#f5f4f2',
              width: '16%',
              height: 50,
              borderRadius: 4,
            }}>
            <TextInput
              style={{ fontSize: 25 }}
              placeholder={pin5}
              underlineColorAndroid={'#bbb'}
              textAlign="center"
              keyboardType="number-pad"
              value={pin5}
              ref={pin5Ref}
              maxLength={1}
              onChangeText={pin => {
                setPin5(pin);
              }}
            />
          </View>
          <View
            style={{
              //backgroundColor: '#f5f4f2',
              width: '16%',
              height: 50,
              borderRadius: 4,
            }}>
            <TextInput
              style={{ fontSize: 25 }}
              placeholder={pin6}
              underlineColorAndroid={'#bbb'}
              textAlign="center"
              keyboardType="number-pad"
              value={pin6}
              ref={pin6Ref}
              maxLength={1}
              onChangeText={pin => {
                setPin6(pin);
              }}
            />
          </View>


        </View>

        <View
          style={{
            paddingHorizontal: 0,
            flex: 0.2,
            marginTop: 20,
          }}>
          {/* <View style={styles.checkboxWrapper}>
          <CheckBox
            value={state.react}
            onValueChange={value =>
              setState({
                ...state,
                react: value,
              })
            }
          /> */}

          {/* <Text
            style={{
              fontSize: 14,
              position: 'absolute',
              marginLeft: 35,
            }}>
            I agree to eduhap Terms & Condtion
          </Text>
        </View> */}

          {/* <Text
          style={{
            fontSize: 14,
            marginLeft: 10,
            marginTop: 4,
          }}>
          Having trouble write to us at mailto:help@eduhap.com
        </Text> */}

          {/* <TouchableOpacity
          style={{}}
          activeOpacity={0.7}
          >
          <Button title={'Continue'} onPress={verifyOtp}/>
        </TouchableOpacity> */}
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
            onPress={verifyOtp}>
            <Text style={{
              marginTop: 10,
              fontWeight: 'bold',
              alignSelf: 'center',
              fontSize: 17,
              color: '#ffcc00',
              letterSpacing: 0.03,
              fontFamily: 'sans-serif'
            }}>Sign In</Text>
          </TouchableOpacity>
        </View>
        <View style={{
          marginTop: 30
        }}>
          <Text>
            Didn't receive the OTP?
            <TouchableOpacity onPress={ResendOtp}>
              <Text style={{
                color: 'blue', fontWeight: 'bold', marginLeft: 20, marginTop: 10
              }}>
                Resend Code</Text>
            </TouchableOpacity >
          </Text>
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
};

export default OtpScreen;

const styles = StyleSheet.create({
  heading: {
    fontSize: 25,
    color: 'black',
    marginBottom: 10,
    display: 'flex',
    alignItems: 'center',
    alignSelf: 'center'
  },
  subHeading: {
    textAlign: 'center',
    fontSize: 20

  },
  textInput: {
    borderColor: 'black',
    borderBottomWidth: 1,
    marginHorizontal: 10,
    width: '12%',
    display: 'flex',
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    fontSize: 30,
    borderRadius: 4,
  },

  otpView: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
  },
  // checkboxWrapper: {
  //   flexDirection: 'row',
  //   alignItems: 'center',
  //   paddingVertical: 2,
  // },
});
