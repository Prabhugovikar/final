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
  Alert,
  ImageBackground,
  ActivityIndicator   
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_URL } from '../../service';

const initialState = {
  react: false,
};
const { width, height } = Dimensions.get('window');


export const OtpScreen = ({ navigation, route, props }) => {

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
  // const[resendOtp,setresendOtp]=useState('');
  // const [isVerified, setVerified] = useState(false);
  // const [loader, setLoader]= React.useState(false);

  // const [mobilenumber, onChangeMobilenumber] = React.useState('');

  // const [isLoading, setIsLoading] = useState(false);



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
      pin6Ref.current.focus();
      setPreviousKeyPress({
        key: 'key4',
        value: 'Backspace',
      });
    }
  }, [pin6]);

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


  // const [state, setState] = React.useState(initialState);
  // const [toggleButton, setToggleButton] = React.useState(false);

  const get_id = () => {
    setIsLoading(true);

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
        AsyncStorage.setItem('profileid',result.response._id)
        navigation.navigate('Fingerprint',route.params)

      })
      .catch(error => console.log('error', error));
      // return <Text>{error.message}</Text>;

  }

  const handleSubmit = () => {
    setIsLoading(true)
    console.log(pin1 + pin2 + pin3 + pin4 + pin5 + pin6);
    verifyOtp(pin1 + pin2 + pin3 + pin4 + pin5 + pin6);
  };
  const verifyOtp = async (pin) => {
    // var pin=(pin1+pin2+pin3+pin4+pin5+pin6)
    console.log('pin', pin)

    if (pin.length == 6) {
      // if (otpExpired==false) {
      result
        .confirm(pin)
        .then(user => {
          console.log("userId:", user.user._user.uid)
          get_id();

        })
        .catch(error => {
          if (error.message == "[auth/session-expired] The sms code has expired. Please re-send the verification code to try again.") {
            get_id();
          }
          else {
            setIsLoading(false)
            alert(error.message)
            console.log(error)
            // showAlert(error.message)
          }
        })
      // }
      // else {
      //   const message = 'OTP has expired, try to SignUp again and enter OTP within 60 seconds';
      //   // showAlert(message)
      // }
    }
    else {
      // showAlert();
    }



  };
  const ResendOtp = () => {
    // const params = route?.params;

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

    fetch("http://34.202.105.255:4002/ResendOtp", requestOptions)
      .then(response => response.text())
      .then(result => {
        console.log('result', result)
      })
      .catch(error => console.log('error', error));
  }



  return (
    <SafeAreaView
      style={{
        flex: 1
      }}>

      <ImageBackground
        source={require('../../assets/Common/bg.png')}
        style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
      >
        <View style={{ position: 'absolute', top: 20, left: 20 }}>
          <TouchableOpacity
            onPress={() => navigation.navigate('SignUp')}>
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
        {/* <View style={{ paddingTop: 30 }}>
          <Text>ENTER OTP</Text>
        </View> */}

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
              value={pin5}
              keyboardType="number-pad"
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
              value={pin6}
              keyboardType="number-pad"
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
          Having trouble write to us at help@eduhap.com
        </Text> */}

          {/* <TouchableOpacity
          style={{}}
          activeOpacity={0.7}
          >
          <Button title={'Continue'} onPress={handleSubmit}/>
        </TouchableOpacity> */}
          <TouchableOpacity
            activeOpacity={0.5}
            style={{
              marginTop: 20,
              height: 50,
              width: 300,
              backgroundColor: "darkblue",
              borderRadius: 10,
              alignSelf: 'center'

            }}
            onPress={handleSubmit}
          // onPress={()=>navigation.navigate('Fingerprint')}
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
              fontSize: 17,
              color: '#ffcc00',
              letterSpacing: 0.03,
              fontFamily: 'sans-serif'
            }}>Continue</Text>
            </>
            )}
          </TouchableOpacity>
        </View>
        <View style={{
          marginTop: 71, marginLeft: 40
        }}>
          <Text>
            Didn't receive the OTP?
            <TouchableOpacity
              onPress={ResendOtp}
            >
              <Text style={{
                color: 'blue', fontWeight: 'bold', marginLeft: 20, marginTop: 8
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
