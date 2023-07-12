import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { Component } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { API_URL, ProfileImagesPath, socket } from '../../../service';


export default class App extends Component {
    constructor(props) {
      super(props);
      this.state = {
        num: '',
        chatName: [],
        roomid: '',
        chats: [],
        profileimg:[],
        chatnum:[],
        groupid:[],
      };
    }
    fetchData = async () => {
      const mynumber = await AsyncStorage.getItem('number')
      console.log(mynumber);
    
      var myHeaders = new Headers();
      myHeaders.append('Content-Type', 'application/json');
    
      var raw = JSON.stringify({
        user_id: mynumber,
      });
    
      var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow',
      };
    
      fetch(API_URL + 'chatHistory', requestOptions)
        .then((response) => response.json())
        .then(async (result) => {
          console.log(result);
          if (result.status === true) {

            const groupid = [];
            const contactsJson = await AsyncStorage.getItem('contacts');
            const contactsArray = JSON.parse(contactsJson);
            console.log('contactarray', contactsArray)

            const contactsMap = contactsArray.reduce((acc, contact) => {
              acc[contact.number] = contact.name;
              return acc;
            }, {});

            const chatname = [];
            const chatnum = [];
            const profile = [];

            for (let i = 0; i < result.response.length; i++) {
              if (result.response[i].otherdata !== undefined) {
                for (let j = 0; j < result.response[i].otherdata.length; j++) {
                  if (result.response[i].otherdata[j].name !== undefined) {
                    const otherId = result.response[i].other_id;
                    console.log('asdfg', otherId);
                    if(result.response[i].other_id == mynumber){
                      
                      const name = contactsMap[otherId] || result.response[i].user_id;
                      chatname.push(name);
                    }
                    else {
                      const name = contactsMap[otherId] || result.response[i].other_id;
                      chatname.push(name);
                    }
                    
                    // chatname.push(name);
                    chatnum.push(otherId);
                    profile.push(result.response[i].otherdata[j].profile_img);
                  }
                }
              }
            }

            console.log('chatname', chatname);
            console.log('chatnum', chatnum);
            console.log('profile', profile);   
            for (let i = 0; i < result.response.length; i++) {
              if (result.response[i].groupName !== undefined) {
              
              chatname.push(result.response[i].groupName)
              console.log('chatname', chatname)
            }
                        }
                        for (let i = 0; i < result.response.length; i++) {
                          if (result.response[i].group_profile_img !== undefined && result.response[i].group_profile_img.trim() !== '' ) {
                          
                          profile.push(result.response[i].group_profile_img)
                          }
                          }
                          for (let i = 0; i < result.response.length; i++) {
                            if (result.response[i].content_customization !== null  ) {
                            this.state.chats.push(result.response[i])
                            }
                            else if (result.response[i].otherdata !== null ){
                              this.state.chats.push(result.response[i])
                            
                          }
                          console.log('chats', this.state.chats)
                          
                          }

            console.log(chatname);
            this.setState({
              chatName: chatname,
              chatnum: chatnum,
              profileimg: profile,
              // chats: result.response,
            }, () => {
              console.log(this.state.chatName)
              console.log(this.state.chatnum)
              console.log(this.state.profileimg)
            });
             }
        })
        .catch((error) => console.log('error', error));
    }
    async componentDidMount() {
      await this.fetchData();
     
      // this.interval = setInterval(() => {
      //   this.fetchData();
      // }, 5000);
    }
    
    // componentWillUnmount() {
    //   // clearInterval(this.interval);
    // }
    
  
  handleChatPress = async (data, index, name) => {     
      // console.log('chats', data[index].room_id)
      //     socket.emit('joinRoom', data.room_id)
          console.log('index', data[index])
          //  this.props.navigation.navigate('ChatRoom')
          if (data[index].admin_id !== undefined)
          {
            if (data[index].content_customization == 0) {
            socket.emit('joinRoom', data[index].room_id )
            console.log(data[index].room_id)
            this.props.navigation.navigate('ChatRoom0', data[index]);
            }
            else if (data[index].content_customization == 1) {
              socket.emit('joinRoom', data[index].room_id )
            this.props.navigation.navigate('ChatRoom1', data[index])
            }
            else if (data[index].content_customization == 2) {
              socket.emit('joinRoom', data[index].room_id )
            this.props.navigation.navigate('ChatRoom2', data[index])
            }
            else if (data[index].content_customization == 3) {
              socket.emit('joinRoom', data[index].room_id )
            this.props.navigation.navigate('ChatRoom3', data[index])
            }
            else if (data[index].content_customization == 4) {
              socket.emit('joinRoom', data[index].room_id )
            this.props.navigation.navigate('ChatRoom4', data[index])
            }
            else if (data[index].content_customization == 5) {
              socket.emit('joinRoom', data[index].room_id )
            this.props.navigation.navigate('ChatRoom5', data[index])
            }
            else if (data[index].content_customization == 6) {
              socket.emit('joinRoom', data[index].room_id )
            this.props.navigation.navigate('ChatRoom6',data[index])
            }
            else if (data[index].content_customization == 7) {
              socket.emit('joinRoom', data[index].room_id )
            this.props.navigation.navigate('ChatRoom7',data[index])
            }
            else if (data[index].content_customization == 8) {
              socket.emit('joinRoom', data[index].room_id )
            this.props.navigation.navigate('ChatRoom8', data[index])
            }
            else if (data[index].content_customization == 9) {
              socket.emit('joinRoom', data[index].room_id )
            this.props.navigation.navigate('ChatRoom9', data[index])
            }
            else if (data[index].content_customization == 10) {
              socket.emit('joinRoom', data[index].room_id )
            this.props.navigation.navigate('ChatRoom10', data[index])
            }
          }
          else {
            console.log('roomid', data[index].room_id )
            socket.emit('joinRoom', data[index].room_id )
            this.props.navigation.navigate('ChatRoom', data[index])
          }
       
    }
  
   

    renderItem = ({ item, index }) => {
      const { profileimg, chatName, chatnum, groupid } = this.state;
      let name = '';
      if (index <= chatnum.length) {
        name = chatName[index];
      } 
      else {
        name = chatName[index - chatnum.length];
      }
    
      return (
        <TouchableOpacity style={styles.chatItem} onPress={() => this.handleChatPress(this.state.chats, index, chatName)}>
          <View style={styles.profileWrapper}>
            <Image source={
                          profileimg[index]
                            ? { uri: ProfileImagesPath + profileimg[index] }
                            : require('../../../assets/Profile/Emptypic.png')
                        } style={styles.profileImage} />
            <View style={{ flexDirection: 'row' }}>
              <Text style={styles.chatName}>{chatName[index]}</Text>
              {groupid[index] && <Text style={styles.chatName}>{`Group ID: ${groupid[index]}`}</Text>}
            </View>
          </View>
        </TouchableOpacity>
      );
    };
    
      
      render() {
        const { profileimg, chatName } = this.state;
        return (
          <View style={styles.container}>
           <FlatList
  data={chatName}
  renderItem={this.renderItem}
  keyExtractor={(item, index) => index.toString()}
  style={styles.chatList}
  ItemSeparatorComponent={null}
/>
          </View>
        );
      }
    

   
  }
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 10,
      backgroundColor: '#fff',
    },
    chatItem: {
      paddingVertical: 10,
      borderBottomWidth: 1,
      borderBottomColor: '#ccc',
    },
    chatName: {
      fontSize: 18,
      fontWeight: 'bold',
    },
    chatName: {
      fontSize: 18,
      fontWeight: 'bold',
      marginLeft:5
    },
    chatMessage: {
      fontSize: 14,
      marginTop: 5,
    },
    chatTime: {
      fontSize: 12,
      marginTop: 5,
      color: '#999',
    },
    profileImage: {
      width: 55,
      height: 55,
      borderRadius: 28,
      marginRight: 10,
    },
    profileNumber: {
      fontSize: 18,
      fontWeight: 'bold',
    },
    profileWrapper: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 10,
    },
    
  });