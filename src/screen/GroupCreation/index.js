import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity,SafeAreaView,TextInput,Pressable,Image,StyleSheet,Button, Alert} from 'react-native';
import CheckBox from '@react-native-community/checkbox';
// import { useNavigation } from '@react-navigation/native';
import CircleCheckBox, {LABEL_POSITION} from 'react-native-circle-checkbox';
import IconBack from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon from 'react-native-vector-icons/FontAwesome';
import { BottomSheet } from 'react-native-elements';
import {
    DEVICE_HEIGHT as dh,
    DEVICE_WIDTH as dw,
    STRING_VALIDATION,
} from '../../utils';
import { Const_Images, Com_color, Com_font } from '../../constants';
import Iconclose from 'react-native-vector-icons/AntDesign';
import { Container, Picker } from 'native-base';
// import DatePicker from 'react-native-neat-date-picker'
import DateTimePicker from '@react-native-community/datetimepicker';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_URL, ProfileImagesPath, socket } from '../../service';

const MyComponent = ({navigation, route}) => {
  const [checkboxState, setCheckboxState] = useState({
    option1: false,
    option2: false,
    option3: false,
    option4: false,
    option5: false,
    option6: false,
  });
  const [isChecked, setIsChecked] = useState(false);
  const [isChecked2, setIsChecked2] = useState(false);
  const [isVisible , setIsVisible] = useState(false)
  const [H_selectedcat , setH_selectedcat] = useState('')
  const [M_selectedcat, setM_selectedcat] = useState('')
  const [S_selectedcat, setS_selectedcat] = useState('')
  const [date, setDate] = useState(new Date());
  const [show, setShow] = useState(false);
  const [image, setImage] = useState('');
  const [groupName, setGroupName] = useState('');
  const [id, setId] = useState('');
  const [grouppic, SetGrouppic] = useState('')
  const [showImage, setShowImage] = useState(false);
  const [about, setAbout] = useState('');
  const [num, setnum] = useState('');
  const [status, setstatus] = useState('');
  
  

 const [housrArr ,setHousrArr] = useState([
    {
        itemName: '00',
    },
    {
        itemName: '01',
    },
    {
        itemName: '02',
    },
    {
        itemName: '03',
    },
    {
        itemName: '04',
    },
    {
        itemName: '05',
    },
    {
        itemName: '06',
    },
    {
        itemName: '07',
    },
    {
        itemName: '08',
    },
    {
        itemName: '09',
    },
    {
        itemName: '10',
    },
    {
        itemName: '11',
    },
    {
        itemName: '12',
    },
]
 )
 const [minutesArr, setMinutesArr] = useState([
    {
        itemName: '00',
    },
    {
        itemName: '01',
    },
    {
        itemName: '02',
    },
    {
        itemName: '03',
    },
    {
        itemName: '04',
    },
    {
        itemName: '05',
    },
    {
        itemName: '06',
    },
    {
        itemName: '07',
    },
    {
        itemName: '08',
    },
    {
        itemName: '09',
    },
    {
        itemName: '10',
    },
    {
        itemName: '11',
    },
    {
        itemName: '12',
    },

    {
        itemName: '13',
    },
    {
        itemName: '14',
    },
    {
        itemName: '15',
    },
    {
        itemName: '16',
    },
    {
        itemName: '17',
    },
    {
        itemName: '18',
    },
    {
        itemName: '19',
    },
    {
        itemName: '20',
    },
    {
        itemName: '21',
    },
    {
        itemName: '22',
    },
    {
        itemName: '23',
    },
    {
        itemName: '24',
    },
    {
        itemName: '25',
    },
    {
        itemName: '26',
    },
    {
        itemName: '27',
    },
    {
        itemName: '28',
    },
    {
        itemName: '29',
    },
    {
        itemName: '30',
    },
    {
        itemName: '31',
    },
    {
        itemName: '32',
    },
    {
        itemName: '33',
    },
    {
        itemName: '34',
    },
    {
        itemName: '35',
    },
    {
        itemName: '36',
    },
    {
        itemName: '37',
    },
    {
        itemName: '38',
    },
    {
        itemName: '39',
    },
    {
        itemName: '40',
    },
    {
        itemName: '41',
    },
    {
        itemName: '42',
    },
    {
        itemName: '43',
    },
    {
        itemName: '44',
    },
    {
        itemName: '45',
    },
    {
        itemName: '46',
    },
    {
        itemName: '47',
    },
    {
        itemName: '48',
    },
    {
        itemName: '49',
    },
    {
        itemName: '50',
    },
    {
        itemName: '51',
    },
    {
        itemName: '52',
    },
    {
        itemName: '53',
    },
    {
        itemName: '54',
    },
    {
        itemName: '55',
    },
    {
        itemName: '56',
    },
    {
        itemName: '57',
    },
    {
        itemName: '58',
    },
    {
        itemName: '59',
    },
])
const [secArr, setSecArr] = useState([
    {
        itemName: 'AM',
    },
    {
        itemName: 'PM',
    },
])

useEffect (() => {
    const response = route.params;
  setId(response.response._id);
  const { option1, option2, option3, option4, option5, option6 } = checkboxState;

    if (option1 && option2) {
        setnum('1')
        
    }
    else if (option1 && option3) {
        setnum('2')
    }
    else if (option1 && option4) {
        setnum('3')
    }
    else if (option1 && option5) {
        setnum('4')
    }
    else if (option2 && option3) {
        setnum('5')
    }
    else if (option2 && option4) {
        setnum('6')
    }
    else if (option2 && option5) {
        setnum('7')
    }
    else if (option3 && option4) {
        setnum('8')
    }
    else if (option3 && option5) {
        setnum('9')
    }
    else if (option4 && option5) {
        setnum('10')
    }
    else if (option6) {
        setnum('0')
    }
    else {
        // Handle the case when no option is selected
        console.log('Please select an option');
      }


})
   

  const handleCheckboxChange = (key) => {
    setCheckboxState({
      ...checkboxState,
      [key]: !checkboxState[key],
    });
  };

  const handleToggle = () => {
    setIsChecked(!isChecked);
    

  };
  const handleToggle2 = () => {
    setIsChecked2(!isChecked2);
  };

  const bottomsheet = () => {
    setIsVisible(!isVisible);
}

const onValueChangeCatH = (value) => {
    setH_selectedcat(value);
}
  
const onValueChangeCatM = (value) => {
    setM_selectedcat(value);
}

const onValueChangeCatS = (value) =>{
    setS_selectedcat(value);
}
const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === 'ios');
    setDate(currentDate);
};

const showMode = () => {
    setShow(true);
};

const showDatepicker = () => {
    showMode('date');
};

const HandleGroupPictureChange = () => {
    const options = {
      mediaType: 'photo',
      quality: 5,
      maxWidth: 300,
      maxHeight: 300,
      includeBase64: true,
    };

    // show camera or image gallery based on user selection
    Alert.alert(
      'Change profile picture',
      '',
      [
        {
          text: 'Camera',
          onPress: () => {
            launchCamera(options, (response) => {
              if (response.didCancel) {
                console.log('User cancelled camera');
              } else if (response.error) {
                console.log('Camera Error: ', response.error);
              } else {
                // update profile picture with the new image
                // 
                setImage(response);
                setShowImage(true);
                // call API to upload the new image
                
              }
            });
          },
        },
        {
          text: 'Gallery',
          onPress: () => {
            launchImageLibrary(options, (response) => {
              if (response.didCancel) {
                console.log('User cancelled image picker');
              } else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
              } else {
                // update profile picture with the new image
                setImage(response);
                setShowImage(true);
                // call API to upload the new image
                
              }
            });
          },
        },
        {
          text: 'Cancel',
          style: 'cancel',
        },
      ],
      { cancelable: false }
    );
  };
   
  const updateGroupImage = async () => {

    // const _id = await AsyncStorage.getItem('profileid');
    // console.log('_id', _id)


   

  if(image === '' || groupName === ''){
    console.log('111111')
   }else{
    const photo = { uri : image.assets[0].uri,
        type : image.assets[0].type,
        name: image.assets[0].fileName,
  };
    var formdata = new FormData();
    formdata.append("_id", id );
    formdata.append("profile_img", photo);
    formdata.append("groupName", groupName);

    var requestOptions = {
    method: 'PUT',
    body: formdata,
    redirect: 'follow'
    };

    fetch(API_URL +"updategroupimage", requestOptions)
    .then(response => response.json())
    .then(result => { 
        console.log(result)
        if (result.status === 'Success') {
            setstatus(result.status)
                SetGrouppic(result.result.group_profile_img);
                setShowImage(true);
                CreateGroupUpdateOtherDetail()
        }
    })
    .catch(error => console.log('error', error));
}
  }

  const CreateGroupUpdateOtherDetail = () => {

   if(image === '' || groupName === ''){
    console.log('111111')
   }else{
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
    "_id": id,
    "Groupabout": groupName,
    "content_customization": num,
    });
    console.log('num', num)

  var requestOptions = { 
    method: 'PUT',
    headers: myHeaders,
    body: raw,
    redirect: 'follow'
    };

    fetch(API_URL +"createGroupUpdateotherdetail", requestOptions)
    .then(response => response.json())
    .then(result => { 
        console.log(result)
        if (result.status === 'Success') {
            socket.emit('joinRoom', result.result.room_id)
            handleNextButtonPress(result);
            updateGroupImage()
        }
})
    .catch(error => console.log('error', error));
   }
  }


  const handleNextButtonPress = (result) => {
    const { option1, option2, option3, option4, option5, option6 } = checkboxState;
    if (option1 && option2) {
      navigation.navigate('ChatRoom1', result);
    } else if (option1 && option3) {
      navigation.navigate('ChatRoom2', result);
    } else if (option1 && option4) {
      navigation.navigate('ChatRoom3', result);
    } else if (option1 && option5) {
      navigation.navigate('ChatRoom4', result);
    } else if (option2 && option3) {
      navigation.navigate('ChatRoom5', result);
    } else if (option2 && option4) {
      navigation.navigate('ChatRoom6', result);
    } else if (option2 && option5) {
      navigation.navigate('ChatRoom7', result);
    } else if (option3 && option4) {
      navigation.navigate('ChatRoom8', result);
    } else if (option3 && option5) {
      navigation.navigate('ChatRoom9', result);
    } else if (option4 && option5) {
      navigation.navigate('ChatRoom10', result);
    } else if(option6){
      navigation.navigate('ChatRoom0', result);
    }
    else {
        // Handle the case when no option is selected
        alert('Please select an option');
      }
  };

  const checkedOptions = Object.keys(checkboxState).filter(
    (key) => checkboxState[key]
  );

  return (
   
        <View style={{flex: 1, marginTop: 30}}>
            <View style={{ flexDirection: 'row', alignItems: 'center',marginBottom:10 }}>
            <Pressable
                onPress={() => navigation.goBack()}
                style={{marginLeft:20,}}
                >
                <IconBack name="keyboard-backspace" color="#3b3b3b" size={30} />
            </Pressable>
                <Text style={{fontSize:25, color:'black',marginLeft:35}}>New group</Text>
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center', width: '70%', alignSelf: 'center',marginRight:40}}>
  <TouchableOpacity onPress={() => HandleGroupPictureChange()} style={{marginRight:20}}>
  {showImage ? (
      
      <Image style={{width:50, height:50, borderRadius:25}} source={{uri:  image?.assets?.[0]?.uri}}/>
    ) : (
        <Icon name="user-circle" size={40} color="blue"/>
      
    )}
    {/* <Icon name="user-circle" size={40} color="blue"/>
    <Image style={{width:50, height:50, borderRadius:25}} source={{uri:'http://212.47.226.119/HiddenlyGit/Hiddenly/webp/profile/' + grouppic}}/> */}
  </TouchableOpacity>
  <TextInput
    style={{ flex: 1, height: 40, borderBottomColor: 'lightgrey', borderBottomWidth: 1, marginLeft: 10 }}
    placeholder="Enter text"
    value={groupName}
    onChangeText={setGroupName}
  />
  
</View>
{/* <TouchableOpacity style={{position:'absolute',
                             top:60,
                             right:20,
                             backgroundColor:'darkblue',
                             borderRadius:5,
                             height:20,
                             width:40,
                             alignItems:'center'}}
                             onPress={() => updateGroupImage()}>
    <Text style={{color:'yellow'}}>Save</Text>
  </TouchableOpacity> */}
            <View style={{borderBottomColor: 'lightgrey', borderBottomWidth: 1,marginVertical:10}} />
            <View style={{marginHorizontal:25}}>
                <Text style={{marginBottom:5}}>Auto deleting group</Text>
                <View style={{flexDirection: 'row', alignItems: 'center',marginBottom:10}}>
            <CircleCheckBox
                    checked={isChecked}
                    onToggle={handleToggle}
                    labelPosition={LABEL_POSITION.RIGHT}
                    />
            <TouchableOpacity onPress={() => bottomsheet()}>
            <Text style={{fontSize:15,marginHorizontal:10}}>Timeline set for Deleting</Text>
            </TouchableOpacity>
                </View>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <CircleCheckBox
                    checked={isChecked2}
                    onToggle={handleToggle2}
                    labelPosition={LABEL_POSITION.RIGHT}
                    />
                    <Text style={{fontSize:15,marginHorizontal:10}}>Never</Text> 
                </View>
            </View>
            <View style={{borderBottomColor: 'lightgrey', borderBottomWidth: 1,marginVertical:10}} />
            <View style={{marginHorizontal:25,marginBottom:-20}}>
            <Text style={{fontSize:20}}>Content Customisation</Text>

    <View  style ={{flexDirection : 'row',alignItems: 'center', }}>
    <CheckBox title="Text"

    value={checkboxState.option1}
    onValueChange={() => handleCheckboxChange('option1')}
    label="My check box" 
        /> 
    <Text style={{fontSize:15}}>Text</Text>     
    </View>


    <View  style ={{flexDirection : 'row',alignItems: 'center' }}>
    <CheckBox
    value={checkboxState.option2}
    onValueChange={() => handleCheckboxChange('option2')}
    label="Option 2"
    />
    <Text style={{fontSize:15}}>Voice</Text>
    </View>


    <View  style ={{flexDirection : 'row',alignItems: 'center' }}>
    <CheckBox
    value={checkboxState.option3}
    onValueChange={() => handleCheckboxChange('option3')}
    label="Option 3"
    />
    <Text style={{fontSize:15}}>Media</Text>
    </View>

    <View  style ={{flexDirection : 'row',alignItems: 'center' }}>
    <CheckBox
    value={checkboxState.option4}
    onValueChange={() => handleCheckboxChange('option4')}
    label="Option 4"
    />
    <Text style={{fontSize:15}}>Document</Text>
    </View>


    <View  style ={{flexDirection : 'row',alignItems: 'center' }}>
    <CheckBox
    value={checkboxState.option5}
    onValueChange={() => handleCheckboxChange('option5')}
    label="Option 5"
    />
    <Text style={{fontSize:15}}> Attachment</Text>
    </View>

    <View  style ={{flexDirection : 'row',alignItems: 'center' }}>
    <CheckBox
    value={checkboxState.option6}
    onValueChange={() => handleCheckboxChange('option6')}

    />
    <Text style={{fontSize:15}}> All</Text>
            </View>
        
        </View>

            <View style={{marginBottom:-20}}>
            <TouchableOpacity  style={{
            marginTop:30,
            height:50,
            width:300,
            backgroundColor:
            checkedOptions.length === 2 || checkboxState.option6
                ? 'darkblue'
                : 'white', 
            borderRadius:10,
            alignSelf:'center'
            
            }}  
            disabled={
                checkedOptions.length === 1 &&
                checkedOptions[0] !== checkboxState.option6
                  ? false // enable button
                  : checkedOptions.length !== 2 // disable button
              }
            onPress={() => updateGroupImage()}>
            <Text 
            style={{marginTop :10,
                    fontWeight:'bold',
                    alignSelf:'center',
                    fontSize:17,
                    color:'#ffcc00',
                    letterSpacing:0.03,
                    fontFamily:'sans-serif'
                }}>
                    Create Group</Text>
        </TouchableOpacity>
            </View>
            <BottomSheet
                    isVisible={isVisible}
                    containerStyle={{
                        backgroundColor: 'rgba(0.5, 0.25, 0, 0.2)',
                    }}>
                    <View style={styles.BSmainview}>
                        <View style={{ margin: '10%' }}>
                            <View
                                style={{
                                    flexDirection: 'row',
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                }}>
                                <Text style={styles.poplabletxt}>Auto deleting group at</Text>
                                <Iconclose
                                    onPress={() => setIsVisible({ isVisible: false })}
                                    name="close"
                                    size={30}
                                />
                            </View>
                            <View style={{ marginTop: -10 }}>
                            {/* <Button onPress={showDatepicker} title="Select date" />
                            {show && (
                                <DateTimePicker
                                    testID="dateTimePicker"
                                    value={date}
                                    mode={'date'}
                                    is24Hour={true}
                                    display="default"
                                    onChange={onChange}
                                />
                            )}
                            <Text>{`Selected date: ${date.toLocaleDateString()} ${date.toLocaleTimeString()}`}</Text> */}
                            <TouchableOpacity style={{
                                marginTop: 30,
                                height: 50,
                                width: 300,
                                backgroundColor: "darkblue",
                                borderRadius: 10,
                                alignSelf: 'center'

                            }}

                                onPress={showDatepicker}>
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
                                    Set Date</Text>
                                {show && (
                                    <DateTimePicker
                                        testID="dateTimePicker"
                                        value={date}
                                        mode={'date'}
                                        is24Hour={true}
                                        display="default"
                                        onChange={onChange}
                                    />
                                )}
                            </TouchableOpacity>
                            <Text style={{ alignSelf: 'center' }}>{`Selected date: ${date.toLocaleDateString()}`}</Text>
                        </View>


                            <View>
                                <View style={{ flexDirection: 'row' }}>
                                    <Picker
                                        itemStyle={styles.itemStyle}
                                        mode="dropdown"
                                        style={styles.pickerStyle}
                                        selectedValue={H_selectedcat}
                                        onValueChange={onValueChangeCatH.bind(this)}>
                                        {housrArr.map((item, index) => (
                                            <Picker.Item
                                                color={Com_color.labletxt}
                                                label={item.itemName}
                                                value={item.itemName}
                                                index={index}
                                            />
                                        ))}
                                    </Picker>
                                    <Picker
                                        itemStyle={styles.itemStyle}
                                        mode="dropdown"
                                        style={styles.pickerStyle}
                                        selectedValue={M_selectedcat}
                                        onValueChange={onValueChangeCatM.bind(this)}>
                                        {minutesArr.map((item, index) => (
                                            <Picker.Item
                                                color={Com_color.labletxt}
                                                label={item.itemName}
                                                value={item.itemName}
                                                index={index}
                                            />
                                        ))}
                                    </Picker>
                                    <Picker
                                        itemStyle={styles.itemStyle}
                                        mode="dropdown"
                                        style={styles.pickerStyle}
                                        selectedValue={S_selectedcat}
                                        onValueChange={onValueChangeCatS.bind(this)}>
                                        {secArr.map((item, index) => (
                                            <Picker.Item
                                                color={Com_color.labletxt}
                                                label={item.itemName}
                                                value={item.itemName}
                                                index={index}
                                            />
                                        ))}
                                    </Picker>
                                </View>
                                <View style={styles.timemainview}>
                                    <Text style={styles.timetxt}>hours</Text>
                                    <Text style={styles.timetxt}>minutes</Text>
                                    <Text style={styles.timetxt}>seconds</Text>
                                </View>
                            </View>
                            <View>
                                <TouchableOpacity
                                    onPress={() => alert('Set')}
                                    style={styles.Btnview}>
                                    <Text style={styles.Btntxt}>Set</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </BottomSheet>
        
        </View>
        
  );
};

export default MyComponent;

const styles = StyleSheet.create({
    BSmainview: {
        height: dh * 0.5,
        backgroundColor: '#fff',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
    },
    poplabletxt: {
        fontSize: Com_font.txt16,
        color: Com_color.labletxt,
        fontWeight: 'bold',
    },
    poplable: {
        fontSize: Com_font.txt16,
        color: Com_color.lightlabletxt,
        textAlign: 'center',
        marginVertical: '10%',
    },
    itemStyle: {
        fontSize: 10,
        fontFamily: 'Roboto-Regular',
        color: Com_color.labletxt,
    },
    pickerStyle: {
        width: '25%',
        height: 40,
        color: Com_color.labletxt,
        fontSize: Com_font.txt14,
        fontFamily: 'Roboto-Regular',
    },
    timemainview: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginVertical: '5%',
    },
    timetxt: { color: Com_color.labletxt2 },
    Btnview: {
        height: 50,
        borderRadius: 10,
        backgroundColor: Com_color.Btnblue,
        justifyContent: 'center',
        alignItems: 'center',
    },
    Btntxt: {
        fontSize: Com_font.txt20,
        color: Com_color.txtyellow,
        fontWeight: 'bold',
    },
})