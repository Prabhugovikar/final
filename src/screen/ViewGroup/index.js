import React, { useEffect, useState, useRef } from 'react';
import { View, StyleSheet, Image, Text, Switch, ScrollView, TouchableOpacity, FlatList, Button, Alert, Modal, TextInput, ActivityIndicator } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { createStackNavigator } from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_URL, ProfileImagesPath, ImagePath, VideoPath, socket } from '../../service';
import CircleCheckBox, {LABEL_POSITION} from 'react-native-circle-checkbox';
import { Const_Images, Com_color, Com_font } from '../../constants';
import { DEVICE_HEIGHT, DEVICE_WIDTH as dh, dw } from '../../utils';
import Video from 'react-native-video';
import IconDot from 'react-native-vector-icons/Entypo';
import IconBack from 'react-native-vector-icons/MaterialCommunityIcons';
import { launchImageLibrary, launchCamera } from 'react-native-image-picker';

const ViewGroup = ({ navigation, route, addNewGroupsCallback }) => {
  
  const [isMuted, setIsMuted] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const [isenabled, setenabled] = useState(false);
  const [name,setName] = useState('');
  const [num, setNum] = useState('');
  const [isChecked, setIsChecked] = useState(false);
  const [profilepic, setProfilepic] = useState('')
  const [isChecked2, setIsChecked2] = useState(false);
  const [commonGroups, setcommonGroups] =useState([]);
  const [id, setId] = useState('');
  const [admin_id, setAdmin_id] = useState('');
  const [admin_ids, setAdmin_ids] = useState([]);
  const [admin_num, setAdmin_num] = useState('');
  const [joining_group, setJoin_group] = useState([]);
  const [chatMessages, setChatMessages] = useState([])
  const [group, setGroup] = useState('')
  const [modalVisible2, setModalVisible2] = useState(false)
  const [modalVisible3, setModalVisible3] = useState(false)
  const [number, setNumber] = useState('')
  const [commonGroups2, setCommonGroups2] = useState([]);
  const [selectedGroup, setSelectedGroup] = useState(null);
  const [isTextInputVisible, setIsTextInputVisible] = useState(false);
  const [groupNameInput, setGroupNameInput] = useState('');
  const [image, setImage] = useState('');
  const [imageupdate, setImageUpdate] = useState('');
  const [roomid, setRoomid] = useState('');
  const [isloading, setisloading] = useState(true)


  const textInputRef = useRef(null);

 
const fetchData = async () => {
  setisloading(true)
    const roomid = await AsyncStorage.getItem('roomid')

   
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    
    var raw = JSON.stringify({
      "_id": roomid
    });
    console.log('raw',raw)
    
    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };
    
    fetch(API_URL+"viewgroupinfo", requestOptions)
      .then(response => response.json())
      .then(async result => {
        console.log('result',result)
        if(result.status == true) {
            setisloading(false)
            setProfilepic(result.response.group_profile_img)
            setName(result.response.groupName)

            const contactsJson = await AsyncStorage.getItem('contactsArray');
            const contactsArray = JSON.parse(contactsJson);
            console.log('contactarray', contactsArray)
            const Participants = [...result.response.admin_id, ...result.response.joining_group];
            
            console.log('part', Participants)
           
            const phoneToName = contactsArray.reduce((acc, contact) => {
              acc[contact.phoneNumber] = contact.name;
              return acc; 
            }, {});
            
            const participantNames = Participants.map(phoneNumber => ({
              phoneNumber,
              name: phoneToName[phoneNumber] || phoneNumber
            }));
            
            console.log('participantNames', participantNames);
            setcommonGroups(participantNames);
            

            
            
            

        }


  })
      .catch(error => console.log('error', error));
}

  const addNewGroups = (newGroup) => {
    setcommonGroups([...commonGroups, number]);
  };

  useEffect(() => {
  fetchData();
  
  }, []);

  useEffect(async() => {
    
      const { messages, id, group } = route.params;
      console.log(messages);
      console.log(id._id)
      console.log(group)
      setGroup(group)
      setId(id._id)
      console.log("admin_id", id.joining_group)
      setAdmin_id(id.admin_id[0])
      setAdmin_ids(id.admin_id)
      setJoin_group(id.joining_group)
  
      const messageList = [];
  
      for (let i = 0; i < messages.length; i++) {
        const message = messages[i];
        console.log(message.image);
        messageList.push(message);
        // Do something with the message, like render it on the screen
      }
  
      setChatMessages(messageList);
      await AsyncStorage.setItem('id', JSON.stringify(messageList))
      const admin_no = await AsyncStorage.getItem('number')
      console.log(admin_no)
      setAdmin_num(admin_no)
    
  }, []);



  

  const handleMuteToggle = () => {
    setIsMuted(!isMuted);
  };

  const handleToggle = () => {
    setIsChecked(!isChecked);
  };
  const handleToggle2 = () => {
    setIsChecked2(!isChecked2);
  };

  const handleEnabledToggle = () => {
    setenabled(!isenabled);
  }
  const handleBlock = () => {
    setisloading(true)
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      "admin_id": admin_id
    });

    var requestOptions = {
      method: 'DELETE',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };

    fetch(API_URL + `deletegrouproom/${id}`, requestOptions)
      .then(response => response.json())
      .then(result => {
        console.log(result)
        if (result.status = 'true') {
          setisloading(false)
          console.log(result)
          Alert.alert(
            'Alert Title',
            'Group deleted',
            [
              { text: 'OK', onPress: () => navigation.navigate('Home') }
            ]
          );
        }
      })
      .catch(error => console.log('error', error));

  };

  const modalVisille = (item) => {
    setModalVisible2(true)
    console.log("number", item)
    setNumber(item)
  }

  const removeContact2 = (groupToRemove) => {
    setisloading(true)
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      "_id": id,
      "other_id": number,
      "admin_id": admin_id
    });

    var requestOptions = {
      method: 'PUT',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };

    fetch(API_URL + "deleteperson", requestOptions)
      .then(response => response.json())
      .then(result => {
        if (result.status === 'Success') {
          console.log(result)
          setcommonGroups(prevGroups => prevGroups.filter(group => group !== number));
          setModalVisible2(false)
          setisloading(false)
          fetchData();
        }
      })
      .catch(error => console.log('error', error));
  }



  const removeContact = () => {
    Alert.alert(
      'Alert Title',
      'Want To Remove Contact?',
      [
        {
          text: 'Cancel',
          onPress: () => setModalVisible2(false),
          style: 'cancel'
        },
        {
          text: 'OK',
          onPress: () => removeContact2()
        },
      ]
    );
  }

  const makeAdminAlert = () => {
    Alert.alert(
      'Alert Title',
      `Want To Make ${number} Admin`,
      [
        {
          text: 'Cancel',
          onPress: () => setModalVisible2(false),
          style: 'cancel'
        },
        {
          text: 'OK',
          onPress: () => makeAdmin()
        },
      ]
    );
  }

  const deMakeAdminAlert = () => {
    Alert.alert(
      'Alert Title',
      `Want To De Make ${number} From Admin`,
      [
        {
          text: 'Cancel',
          onPress: () => setModalVisible2(false),
          style: 'cancel'
        },
        {
          text: 'OK',
          onPress: () => deMakeAdmin()
        },
      ]
    );
  }

  const exitGroupAlert = () => {
    Alert.alert(
      'Alert Title',
      `Want To Exit ${number} From Group`,
      [
        {
          text: 'Cancel',
          onPress: () => setModalVisible2(false),
          style: 'cancel'
        },
        {
          text: 'OK',
          onPress: () => exitGroup()
        },
      ]
    );
  }

  const exitGroup = () => {
    setisloading(true)
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      "other_id": number
    });

    var requestOptions = {
      method: 'PUT',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };

    fetch(API_URL + `exitgroup/${id}`, requestOptions)
      .then(response => response.json())
      .then(async result => {
        if (result.status === true) {
          console.log(result)
          setisloading(false)
          setcommonGroups(prevGroups => prevGroups.filter(group => group !== number));
          setModalVisible2(false)
          fetchData();
        }
      })
      .catch(error => console.log('error', error));
  }

  const deMakeAdmin = () => {
    setisloading(true)
    console.log(joining_group)
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      "_id": id,
      "other_id": number,
      "admin_id": admin_id
    });

    var requestOptions = {
      method: 'PUT',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };

    fetch(API_URL + "demakeadmin", requestOptions)
      .then(response => response.json())
      .then(result => {
        if (result.status === 'Success') {
          console.log(result)
          setModalVisible2(false)
          setisloading(false)
          fetchData();
        }
        else {
          console.log(result)
          Alert.alert(
            'Alert Title',
            `${number} is not an admin`,
            [
              { text: 'OK', onPress: () => setModalVisible2(false) }
            ]
          );
        }
      })
      .catch(error => console.log('error', error));
  }


  const makeAdmin = () => {
    setisloading(true)
    console.log(number)
    console.log(joining_group)
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      "_id": id,
      "joining_group": number,
      "admin_id": admin_id
    });

    var requestOptions = {
      method: 'PUT',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };

    fetch(API_URL + "makeadmin", requestOptions)
      .then(response => response.json())
      .then(result => {
        if (result.status === 'Success') {
          console.log(result)
          setModalVisible2(false)
          setisloading(false)
          fetchData();
        }
      })
      .catch(error => console.log('error', error));
  }

  const handleReport = () => {
    alert("Group reported successfully...")
    fetchData();
  };

  const groupName = () => {
    setisloading(true)
    console.log(groupNameInput);
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      "groupName": groupNameInput
    });

    var requestOptions = {
      method: 'PUT',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };

    fetch(API_URL + `updateProfilegroup/${id}`, requestOptions)
      .then(response => response.json())
      .then(result => {
        if (result.status === true) {
          console.log(result)
          setIsTextInputVisible(!isTextInputVisible)
          setisloading(false)
          fetchData();
        }
      })
      .catch(error => console.log('error', error));
  }



  const HandleGroupPictureChange = () => {
    // console.log(this.state.room_id)
    
    const options = {
      mediaType: 'photo',
      quality: 5,
      maxWidth: 300,
      maxHeight: 300,
      includeBase64: true,
    };

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
                setImage(response);
                updateImage();
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
                setisloading(true)
                setImage(response);
                console.log(response.assets[0].uri)
                const photo = {
                  uri: response.assets[0].uri,
                  type: response.assets[0].type,
                  name: response.assets[0].fileName,
                };
                var formdata = new FormData();
                formdata.append("profile_img", photo);
                formdata.append("groupName", groupNameInput === '' ? name : groupNameInput);
                formdata.append("_id", id);

                var requestOptions = {
                  method: 'PUT',
                  body: formdata,
                  redirect: 'follow'
                };

                fetch(API_URL + "updategroupimage", requestOptions)
                  .then(response => response.json())
                  .then(result => {
                    if (result.status === 'Success') {
                      setisloading(false)
                      console.log("!!!!!!!!!", result.result.group_profile_img)
                      setImageUpdate(result.result.group_profile_img)
                      alert("Group Image Updated")
                      fetchData();
                    }
                  })
                  .catch(error => console.log('error', error));
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

  const updateImage = () => {
    setisloading(true)
    const photo = {
      uri: image.assets[0].uri,
      type: image.assets[0].type,
      name: image.assets[0].fileName,
    };
    var formdata = new FormData();
    formdata.append("profile_img", photo);
    formdata.append("groupName", groupNameInput === '' ? name : groupNameInput);
    formdata.append("_id", id);

    var requestOptions = {
      method: 'PUT',
      body: formdata,
      redirect: 'follow'
    };

    fetch(API_URL + "updategroupimage", requestOptions)
      .then(response => response.json())
      .then(result =>{ 
        if (result.status === 'Success') {
          console.log(result)
          setisloading(false)
          fetchData();
        }
        
      })
      .catch(error => console.log('error', error));
  }



  const media = [
    { id: 1, source: require('../../assets/Profile/Profile.png') },
    { id: 2, source: require('../../assets/Profile/bts.jpg') },
    { id: 3, source: require('../../assets/Profile/bts.jpg') },
    { id: 4, source: require('../../assets/Profile/bts.jpg') },
    { id: 5, source: require('../../assets/Profile/bts.jpg') },
    { id: 6, source: require('../../assets/Profile/bts.jpg') },
    { id: 7, source: require('../../assets/Profile/bts.jpg') },
  ];

  const handlechat = async (item) => {
    setisloading(true)
    console.log('chat', item.phoneNumber)
    const num = await AsyncStorage.getItem('number')
    console.log('num', num)
    if (item.phoneNumber != num) {

      var myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");

      var raw = JSON.stringify({
        "user_id": num,
        "other_id": item.phoneNumber
      });
  
      console.log('raw',raw)
  
      var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
      };
  
      fetch(API_URL + "registerRoom", requestOptions)
        .then(response => response.json())
        .then(result => {
          if (result.response.length != 0) {
            setisloading(false)
            setRoomid(result.response[0].room_id)
            socket.emit('joinRoom', result.response[0].room_id)
            navigation.navigate('ChatRoom',{ onetoone: result, names: item.name })
          } else {
            setisloading(false)
            setRoomid(result.response.room_id)
            socket.emit('joinRoom', result.response.room_id)
            navigation.navigate('ChatRoom',{ onetoone: result, names: item.name })            
          }
          
        })
        .catch(error => console.log('error', error));
    }
    else{
      console.log('It is your number', item.phoneNumber)
    }
  }

 
  const renderMedia = () => {
    return chatMessages.map((chatMessage) => (
      <View key={chatMessage._id} style={styles.mediaWrapper}>
        {(chatMessage.image && (
          <Image source={{ uri: ImagePath + chatMessage.image }} style={styles.mediaImage} />
        )) || (chatMessage.video && chatMessage.video.endsWith('.mp4') && (
          <Video source={{ uri: VideoPath + chatMessage.video }} style={styles.mediaImage} muted={true} />
        )) || null}
      </View>
    ));
  };

  return (
<View style={{ flex: 1 }}>
    
      {isTextInputVisible ? (
        <View>
          <TextInput
            style={styles.textInput}
            onChangeText={text =>
              setGroupNameInput(text)}
            placeholder="Enter group name"
          />
          <View style={styles.container3}>
            <TouchableOpacity style={styles.buttonLeft} onPress={groupName}>
              <Text style={styles.buttonText}>OK</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.buttonRight} onPress={() => setIsTextInputVisible(!isTextInputVisible)}>
              <Text style={styles.buttonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      ) : (
          <View style={styles.container}>
            <View style={styles.container2}>
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.wrapper}>
        <IconBack name="keyboard-backspace" color="black" size={35} style={[styles.icon, {top:10}]} />
              </TouchableOpacity>
              <Text style={styles.chatName}>{groupNameInput === '' ? name : groupNameInput}</Text>
              <TouchableOpacity style={[styles.Icons, {top:27}]}>
                <IconDot
                  name="dots-three-vertical"
                  size={20}
                  onPress={() => setModalVisible3(true)}
                />
                <Modal
                  visible={modalVisible3}
                  animationType="fade"
                  transparent={true}
                  onRequestClose={() => setModalVisible3(false)}
                >
                  <View style={styles.modalContainer}>
                    <TouchableOpacity
                      style={styles.modalOption}
                      // onPress={() => groupName()}
                      onPress={() => setIsTextInputVisible(!isTextInputVisible)}
                    >
                      <Text style={styles.modalOptionText}>Change Group Name</Text>
                    </TouchableOpacity>
                  </View>
                </Modal>
              </TouchableOpacity>
    </View>
    
    <ScrollView>
    {isloading ? (
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator color={"darkblue"} size={'large'} />
      </View>
    ) : (
      <>
      <View style={{justifyContent:'center'}}>
        <TouchableOpacity onPress={()=>navigation.navigate('ProfilePreview', {image : profilepic })}>
        <Image
                source={{ uri: ProfileImagesPath + (imageupdate === '' ? profilepic : imageupdate) }}
          style={styles.profileImage}
        />
        </TouchableOpacity>
              <TouchableOpacity style={styles.cameraIconContainer} onPress={() => HandleGroupPictureChange()}>
    <Icon name="camera" size={35} color="black" />
  </TouchableOpacity>
      </View>
      <View style={styles.notificationContainer}>
        <Text style={styles.notificationLabel}>Mute Notification</Text>
        <Switch
          value={isMuted}
          onValueChange={handleMuteToggle}
          style={styles.notificationSwitch}
        />
      </View>
      
      <View style={styles.mediaHeaderContainer}>
  <Text style={styles.chatName1}>Media</Text>
          <TouchableOpacity style={styles.seeAllButtonContainer} onPress={() => navigation.navigate('ViewMedia')}>
    <Text style={styles.seeAllButtonText}>See All</Text>
  </TouchableOpacity>
</View>
<View style={styles.scrollViewContainer}>
  <ScrollView horizontal contentContainerStyle={styles.scrollViewContent}>
    {renderMedia()}
  </ScrollView>
            </View> 
     
      
            <TouchableOpacity onPress={() => navigation.navigate('AddParticipants', group)}>
              {/* {admin_ids.every(id => !joining_group.includes(id)) && admin_ids.some(value => joining_group.includes(value)) ? (
                <Text style={styles.chatName1}>Add participant</Text>
              ) : null} */}
              {admin_id == admin_num || admin_ids.some(value => joining_group.includes(value)) ? (
                <Text style={styles.chatName1}>Add participant</Text>
              ) : null}
            </TouchableOpacity>

         {/* common groups */}
            <TouchableOpacity>
              <Text style={styles.commonGroupsLabel}>Participants</Text>
            </TouchableOpacity>


{/* Render common groups */}
<View style={styles.commonGroupsContainer}>
              {commonGroups.filter((value, index, self) => self.indexOf(value) === index).map((item) => (
    <TouchableOpacity onPress={() => {
      handlechat(item);
    }}>
    <View style={styles.itemContainer}>
      <Image
        style={styles.profileImage1}
        source={require('../../assets/Profile/Emptypic.png')}
        resizeMode="cover"
      />
      <TouchableOpacity
   
    onLongPress={() => {
      setSelectedGroup(item.phoneNumber);
      modalVisille(item.phoneNumber);
    }}
  >
    <Text style={styles.profileName}>{item.name}</Text>
  </TouchableOpacity>
  <Modal
    visible={modalVisible2}
    animationType="fade"
    transparent={true}
    onRequestClose={() => setModalVisible2(false)}
  >
    <View style={styles.modalContainer}>
      <TouchableOpacity
        style={styles.modalOption}
        onPress={() => removeContact()}
      >
        {admin_id == admin_num || admin_ids.some(value => joining_group.includes(value)) ? (
          <Text style={styles.modalOptionText}>Remove Contact</Text>) : null}
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.modalOption}
        onPress={() => makeAdminAlert(item)}
      >
        {admin_id == admin_num || admin_ids.some(value => joining_group.includes(value)) ? (
          <Text style={styles.modalOptionText}>Make Admin</Text>) : null}
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.modalOption}
        onPress={() => deMakeAdminAlert(item)}
      >
        {admin_id == admin_num || admin_ids.some(value => joining_group.includes(value)) ? (
          <Text style={styles.modalOptionText}>DeMake Admin</Text>) : null}
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.modalOption}
        onPress={() => exitGroupAlert(item)}
      >
        <Text style={styles.modalOptionText}>Exit Group</Text>
      </TouchableOpacity>
    </View>
  </Modal>
    
    </View>
    </TouchableOpacity>
  ))}
  <View style={{marginHorizontal:25}}>
                <Text style={styles.commonGroupsLabel1}>Auto deleting group</Text>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <CircleCheckBox
                    checked={isChecked}
                    onToggle={handleToggle}
                    labelPosition={LABEL_POSITION.RIGHT}
                    />
            <TouchableOpacity onPress={() => bottomsheet()}>
            <Text style={{fontSize:15,
                          marginHorizontal:10,
            }}>Timeline set for Deleting</Text>
            </TouchableOpacity>
                </View>
                <View style={{flexDirection: 'row', alignItems: 'center', marginTop:10}}>
                <CircleCheckBox
                    checked={isChecked2}
                    onToggle={handleToggle2}
                    labelPosition={LABEL_POSITION.RIGHT}
                    />
                    <Text style={{fontSize:15,marginHorizontal:10}}>Never</Text> 
                </View>
            </View>
  
<View style={styles.buttonContainer}>
  <TouchableOpacity onPress={handleBlock} style={styles.button}>
    <Text style={styles.buttonText}>Delete Group</Text>
  </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate('ReportGroup', group)} style={[styles.button]}>
    <Text style={[styles.buttonText]}> Report Group</Text>
  </TouchableOpacity>
</View>

</View>

</>
      )}
</ScrollView>
          </View>
        
      )}
    
    </View>
  );
};

export default ViewGroup;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 10,
  },
  container2: {
    flexDirection: 'row',
    paddingVertical:10
    
  },
  profileImage: {
    width: dw,
    height: 300,
  },
  chatName: {
    fontSize: 22,
    fontWeight: 'bold',
    marginLeft: "5%",
    marginTop: "3.5%",
    color:'black'
    // marginLeft: ,
  },
  wrapper: {
    // flexDirection: 'row',
    alignItems: 'center',
    marginLeft:15
  },
  icon: {
    height: 40,
    width: 40,
    marginRight: 8,
  },

//media
chatName1: { 
  fontSize: 20,
  fontWeight: 'bold',
  marginLeft: 20,
  color:'black'
},
cameraIconContainer: {
    position: 'absolute',
    bottom: 0,
    right: 20,
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 5,
  },

//common group
chatName2: { 
  fontSize: 20,
  fontWeight: 'bold',
  marginBottom:20,
  color:'black'
},

  //mute notification
  notificationContainer: {
    flexDirection: 'row',
    marginLeft: 20,
    marginBottom: 10,
    marginTop:28,

   
  },
  notificationLabel: {
    fontSize: 20,
    marginRight: 160,
    fontWeight: 'bold',
    color:'black'


  },
  notificationSwitch: {
    transform: [{ scaleX: 1.0 }, { scaleY: 1.0 }],
    color:'darkblue',
  },
  seeAllButtonContainer: {
    marginTop: 10,
    backgroundColor: '#25D366',
    paddingHorizontal: 20,
    paddingVertical: 5,
    borderRadius: 15,
    alignSelf: 'flex-end',
    marginRight: 20,
  },
  seeAllButtonText: {
    color: 'white',
    fontSize: 14,
    color:'black'
  },
  mediaContainer: {
    flexDirection: 'row',
    paddingStart: 10,
  },
  mediaHeaderContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop:10,
  },
  seeAllButtonContainer: {
    backgroundColor: '#25D366',
    paddingHorizontal: 20,
    paddingVertical: 5,
    borderRadius: 20,
  },
  seeAllButtonText: {
    color: 'white',
    fontSize: 14,
  },
  scrollViewContainer: {
    height: 100,
    width: '100%',
    paddingHorizontal: 10,
  },
  scrollViewContent: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    
  },
  mediaWrapper: {
    width: 80,
    height: 80,
    marginHorizontal: 5,
  },
  mediaImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  phoneNumber:{
    fontSize: 20, 
    fontWeight:'200',
    color:'black'
  },
  phoneNumberIconContainer:{
    flexDirection: 'row',
    marginBottom: 10,
    marginRight:10,
    // marginLeft:120,
    justifyContent:'space-between',
    
  },
  phoneNumberContainer:{
    flexdirection: 'column',
    alignItems: 'center', 
    justifyContent:'space-between',
  },
  notificationContainer3: {
    flexDirection: 'row',
    marginLeft: 20,
    marginBottom: 10,
  },
  //common group 
  container1: {
    flex: 1,
    padding: 10,
    backgroundColor: '#fff',
  },
  profileImage1: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 40,
    marginLeft:10
  },
  commonGroupsLabel: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 20,
    marginLeft:20,
    color:'black'
  },
  commonGroupsLabel1: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 20,
     marginRight: 40,
     marginBottom:20,
     color:'black'
  },

  commonGroupsContainer: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    marginTop: 10,
  },

  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  profileName: {
    fontSize: 20,
    fontWeight: 'bold',
    color:'#333'
    
  },


  //report and block

  buttonContainer: {
    flexDirection: 'column',
    justifyContent: 'center',
    marginTop: 20,
    alignItems: 'center',
  },
  button: {
    backgroundColor: 'darkblue',
    borderRadius: 5,
    paddingVertical: 12,
    paddingHorizontal: 100,
    marginLeft: 10,
    marginTop: 10,
    alignSelf: 'center',
    bottom:5
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    alignItems:'center',
  },
  poplabletxt: {
    fontSize: Com_font.txt16,
    color: Com_color.labletxt,
    fontWeight: 'bold',
},
  modalContainer: {
    backgroundColor: 'lightgrey',
    borderRadius: 10,
    padding: 10,
    marginHorizontal: 20,
    marginTop: 80,
    elevation: 4,
  },
  modalOption: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  modalOptionText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  Icons: { position: 'absolute', top: 10, right: 10 },
  textInput: {
    // position: 'absolute',
    marginTop: '30%',
    left: '50%',
    transform: [{ translateX: -150 }, { translateY: -20 }],
    height: 40,
    width: 300,
    paddingHorizontal: 10,
    borderRadius: 10,
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    borderWidth: 1,
    borderColor: 'gray',
  },
  container3: {
    // position: 'absolute',
    marginTop: '90%',
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: 'white',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderTopWidth: 1,
    borderColor: 'gray',
  },
  buttonLeft: {
    borderRadius: 5,
    backgroundColor: '#007AFF',
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginRight: 'auto',
  },
  buttonRight: {
    borderRadius: 5,
    backgroundColor: '#007AFF',
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginLeft: 'auto',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },


});
