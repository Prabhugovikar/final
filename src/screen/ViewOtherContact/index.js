import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Image, Text, Switch,ScrollView,TouchableOpacity, ActivityIndicator } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { createStackNavigator } from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_URL, ProfileImagesPath, ImagePath, VideoPath, socket } from '../../service';
import Video from 'react-native-video';
import IconBack from 'react-native-vector-icons/MaterialCommunityIcons';
import {DEVICE_WIDTH as dw, DEVICE_HEIGHT as dh} from '../../utils/index';
// import ZegoUIKitSignalingPlugin from '@zegocloud/zego-uikit-signaling-plugin-rn';
// import ZegoUIKitPrebuiltCallService, {
//   ZegoCallInvitationDialog, ZegoUIKitPrebuiltCallWaitingScreen, ZegoUIKitPrebuiltCallInCallScreen, ZegoSendCallInvitationButton,
// } from '@zegocloud/zego-uikit-prebuilt-call-rn';

const App = ({ navigation, route }) => {
  const phoneNumber = '+1 (123) 456-7890';
  const [isMuted, setIsMuted] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const [isenabled, setenabled] = useState(false);
  const [name,setName] = useState('');
  const [num, setNum] = useState('');
  const [profilepic, setProfilepic] = useState('')
  const [chatMessages, setChatMessages] = useState([])
  const [data1, setData1] = useState('');
  const [commonGroup, setCommonGroup] = useState([])
  const [user_id, setUser_id] = useState('');
  const [other_id, setOther_id] = useState('');
  const [isBlocked, setIsBlocked] = useState(false);
  const [isloading, setisloading] = useState(true);
  const data = [
    {id: 1},
    { id: 2 }  
  ]



  useEffect( () => {
    // const name2 = await AsyncStorage.getItem('profilename')
   
    // const pic = await AsyncStorage.getItem('profilpic')
    // console.log(name2);
    // setName(name2);
    
    // setNum(num2.replace(/"/g, ''));
    // console.log(num2)
    // setProfilepic(pic);
    // console.log('pic', profilepic);

    const fetchBlockedStatus = async () => {
     
      const isBlockedStr = await AsyncStorage.getItem('blocked');
      if (isBlockedStr !== null) {
        setIsBlocked(isBlockedStr === 'true');
      }
    };

    fetchBlockedStatus();

    const fetchcontact = async () => {
      const num2 = await AsyncStorage.getItem('profilenum')
    setNum(num2);
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    
    var raw = JSON.stringify({
      "other_id": num2
    });
    
       var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };
    console.log('raw', raw)
    
    fetch(API_URL +"viewcontact", requestOptions)
      .then(response => response.json())
      .then(result => { 
        console.log(result)
        if (result.status == true) {
          setProfilepic(result.response.profile_img);
          // setName(result.response.name)
          setNum(result.response.mobilenumber)
          setisloading(false)
        }

      })
      .catch(error => console.log('error', error));

    }
    fetchcontact();

  }, []); 

  useEffect(async () => {
    const { id, messages, Alldata, contactname } = route.params;
    console.log('id',id);
    console.log('message',messages);
    console.log("Alldata", Alldata)
    console.log("contactname", contactname)
    setData1(Alldata)
    setUser_id(Alldata.user_id)
    setOther_id(Alldata.other_id)
    setName(contactname)

    const messageList = [];


    for (let i = 0; i < messages.length; i++) {
      const message = messages[i];
      console.log(message.image);
      messageList.push(message);
      // Do something with the message, like render it on the screen
    }

    setChatMessages(messageList);
    await AsyncStorage.setItem('id', JSON.stringify(messageList))
  }, [])

  useEffect(() => {
    const { id, messages, Alldata } = route.params;
    console.log('alldata',Alldata.user_id)
    const commongroup = []
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      "other_id": Alldata.other_id,
      "sender_id": Alldata.user_id
    });

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };

    fetch(API_URL + "commongroup", requestOptions)
      .then(response => response.json())
      .then(result => {
        console.log(result)
        for (let i = 0; i < result.result.length; i++) {
          commongroup.push(result.result);
          console.log(commongroup[0])
          setCommonGroup(commongroup[0])
        }
      })
      .catch(error => console.log('error', error));


  }, [])


  const handleMuteToggle = () => {
    setIsMuted(!isMuted);
  };

  const handleHiddenToggle = () => {
    setIsHidden(!isHidden);
  };
  const handleEnabledToggle = () => {
    setenabled(!isenabled);
  }
  const handleBlock = async () => {
    setisloading(true)
    const mynumber = await AsyncStorage.getItem('number');
    console.log(mynumber);
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      "user_id": mynumber,
      "other_number": num
    });
    console.log('raw', raw)
    var requestOptions = {
      method: 'PUT',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };

    fetch(API_URL + "blockcontact", requestOptions)
      .then(response => response.json())
      .then(result => {
        console.log(result)
        if (result.status == 'Success') {
          setIsBlocked(true);
          setisloading(false)
          AsyncStorage.setItem('blocked', 'true')
          alert('User blocked');
        } else {
          alert(result.message);
        }
      })
      .catch(error => console.log('error', error));
  };

  const handleUnblock = async () => {
    setisloading(true)
    const mynumber = await AsyncStorage.getItem('number');
    console.log(mynumber);
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      "user_id": mynumber,
      "other_number": num
    });
    console.log('raw', raw)
    var requestOptions = {
      method: 'PUT',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };

    fetch(API_URL + "unblockcontact", requestOptions)
      .then(response => response.json())
      .then(result => {
        console.log(result)
        if (result.status == 'Success') {
          setIsBlocked(false);
          setisloading(false)
          AsyncStorage.setItem('blocked', 'false')
          alert('User unblocked');
        } else {
          alert(result.message);
        }
      })
      .catch(error => console.log('error', error));
  };

  const handlereport = async () => {
    alert('Conatct reported successfully...')
  }

  const handlecommangroup = (item) => {
    console.log('item', item)
    
    if (item.content_customization == 0) {
            socket.emit('joinRoom', item.room_id )
            console.log(item.room_id)
            navigation.navigate('ChatRoom0', item);
            }
            else if (item.content_customization == 1) {
              socket.emit('joinRoom', item.room_id )
            navigation.navigate('ChatRoom1', item)
            }
            else if (item.content_customization == 2) {
              socket.emit('joinRoom', item.room_id )
            navigation.navigate('ChatRoom2', item)
            }
            else if (item.content_customization == 3) {
              socket.emit('joinRoom', item.room_id )
            navigation.navigate('ChatRoom3', item)
            }
            else if (item.content_customization == 4) {
              socket.emit('joinRoom', item.room_id )
            navigation.navigate('ChatRoom4', item)
            }
            else if (item.content_customization == 5) {
              socket.emit('joinRoom', item.room_id )
            navigation.navigate('ChatRoom5', item)
            }
            else if (item.content_customization == 6) {
              socket.emit('joinRoom', item.room_id )
            navigation.navigate('ChatRoom6',item)
            }
            else if (item.content_customization == 7) {
              socket.emit('joinRoom', item.room_id )
            navigation.navigate('ChatRoom7',item)
            }
            else if (item.content_customization == 8) {
              socket.emit('joinRoom', item.room_id )
            navigation.navigate('ChatRoom8', item)
            }
            else if (item.content_customization == 9) {
              socket.emit('joinRoom', item.room_id )
            navigation.navigate('ChatRoom9', item)
            }
            else if (item.content_customization == 10) {
              socket.emit('joinRoom', item.room_id )
            navigation.navigate('ChatRoom10', item)
            }
  }

  const media = [
    chatMessages
  ]
  console.log("media...", chatMessages)
const commonGroups = [
  commonGroup
  ];

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
    
    <View style={styles.container}>
       {isloading ? (
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator color={"darkblue"} size={'large'} />
      </View>
    ) : (
      <>
    <View style={{marginTop:15, paddingVertical:5}}>
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.wrapper}>
      <IconBack name="keyboard-backspace" color="black" size={35} style={[styles.icon, {top:5}]} />
        <Text style={styles.chatName}>{name}</Text>
      </TouchableOpacity>
    </View>
    <ScrollView>
      <View>
        <TouchableOpacity onPress={()=>navigation.navigate('ProfilePreview', {image : profilepic })}>
        <Image
          source={ profilepic ? {uri: ProfileImagesPath + profilepic}
                              :  require('../../assets/Profile/Emptypic.png')
                  }
          style={styles.profileImage}
        />
        </TouchableOpacity>
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
     
      <View style={styles.notificationContainer}>
        <Text style={styles.notificationLabel}>Mute Notification</Text>
        <Switch
          value={isMuted}
          onValueChange={handleMuteToggle}
          style={styles.notificationSwitch}
        />
      </View>


      <View style={styles.notificationContainer1}>
          <Text style={styles.notificationLabel1}>Chat Hiddenly</Text>
          <Switch
            value={isHidden}
            onValueChange={handleHiddenToggle}
            style={styles.notificationSwitch1}
          />
        </View>



        <View style={styles.notificationContainer2}>
          <Text style={styles.notificationLabel2}>Custom Notification</Text>
          <Switch
            value={isenabled}
            onValueChange={handleEnabledToggle}
            style={styles.notificationSwitch2}
          />
        </View>

{/* phone number and calls */}

        <Text style={{fontSize:20, fontWeight:'bold', color:'black', marginLeft:10}}>Phone Number</Text>
        <View style={styles.notificationContainer3}>
         
        <Text style={styles.phoneNumber}>{num}</Text>
  <View style={styles.phoneNumberIconContainer}>
    
  <TouchableOpacity onPress={() => navigation.navigate('ChatRoom')}>
  <Icon style={{marginLeft:150, marginTop:7}} name="comments" size={20} color="darkblue" />
</TouchableOpacity>
<TouchableOpacity>
<Icon style={{marginLeft:20, marginTop:7}} name='phone' size={20} color={'darkblue'}/>
</TouchableOpacity>
<TouchableOpacity>
<Icon style={{marginLeft:20, marginTop:7}} name='video-camera' size={20} color={'darkblue'}/>
</TouchableOpacity>
  </View>
  </View>

  {/* common groups */}
  <Text style={styles.commonGroupsLabel}>Common Groups</Text>

{/* Render common groups */}
<View style={styles.commonGroupsContainer}>
  {commonGroup.map((item) => (
    <TouchableOpacity onPress={() => handlecommangroup(item)}>
    <View style={styles.itemContainer} key={item._id}>
              
      <Image
      style={styles.profileImage1}
      source={{ uri: ProfileImagesPath + item.group_profile_img }}
      resizeMode="cover"
    />
      
      <Text style={styles.profileName}>{item.groupName}</Text>
              
    </View>
    </TouchableOpacity>
  ))}
 

<View style={styles.buttonContainer}>
  <TouchableOpacity onPress={isBlocked ? handleUnblock : handleBlock} style={[styles.button1, { backgroundColor: isBlocked ? 'red' : 'darkblue' }]}>
    <Text style={styles.buttonText}>{isBlocked ? 'Unblock' : 'Block'}</Text>
  </TouchableOpacity>
  <TouchableOpacity onPress={() =>handlereport()} style={[styles.button, styles.reportButton]}>
    <Text style={[styles.buttonText, styles.reportButtonText]}>Report</Text>
  </TouchableOpacity>
</View>

</View>

</ScrollView>
</>
      )}
</View>
   
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 10,
    
  },
  profileImage: {
    width: dw,
    height: 300,
  },
  chatName: {
    marginBottom: 10,
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 60,
    color:'black'
  },
  wrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    height: 40,
    width: 40,
    marginRight: 8,
    // marginTop:5
  },
  chatName: {
    fontSize: 25,
    fontWeight: 'bold',
    color:'black'
  },
//media
chatName1: { 
  fontSize: 20,
  fontWeight: 'bold',
  marginLeft: 40,
  color:'black'
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
    marginLeft: 25,
    marginBottom: 10,
    marginTop:10,
   
  },
  notificationLabel: {
    fontSize: 16,
    marginRight: 180,
    color:'black'
  },
  notificationSwitch: {
    position:'absolute',
    right:15
  },

//chat hiddenly
notificationContainer1: {
  flexDirection: 'row',
  marginLeft: 25,
  marginBottom: 10,
 
},
notificationLabel1: {
  fontSize: 16,
  marginRight: 210,
  color:'black'
},
notificationSwitch1: {
  position:'absolute',
  right:15
},

//Custom notification
notificationContainer2: {
  flexDirection: 'row',
  marginLeft: 25,
  marginBottom: 10,
 
},
notificationLabel2: {
  fontSize: 16,
  marginRight: 170,
  color:'black'
},
notificationSwitch2: {
  // transform: [{ scaleX: 1.0 }, { scaleY: 1.0 }],
  position:'absolute',
  right:15
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
  },
  commonGroupsLabel: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 20,
    //  marginRight: 40,
    marginLeft:10,
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
    marginLeft:20
  },
  profileName: {
    fontSize: 16,
    fontWeight: 'bold',
    color:'black',
    position:'absolute',
    left:70,
    top:12


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
    paddingVertical: 10,
    paddingHorizontal: 100,
    marginLeft: 10,
    marginTop: 10,
    alignSelf: 'center',
    marginBottom:5
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    alignItems:'center',
  },
  reportButton: {
    backgroundColor: 'darkblue',
  },
  reportButtonText: {
    marginLeft: 1,
  },

  button1: {

    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 100,
    marginLeft: 10,
    marginTop: 10,
    alignSelf: 'center',
  },
});
