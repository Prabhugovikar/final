import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { Component } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Image, ScrollView,ActivityIndicator } from 'react-native';
import { API_URL, ProfileImagesPath, socket } from '../../../service';
import { Col } from 'native-base';
import { color } from 'react-native-elements/dist/helpers';
import { Searchbar } from 'react-native-paper';
import { withNavigationFocus } from '@react-navigation/compat';


 class App extends Component {
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
        searchQuery:'',
        chat:[],
        contactsArray:[],
        filteredChat: [],
        isloading:true,

      };
    }
   
    async componentDidMount() {
      
     this.fetchChatHistory();
     

      //  this.interval = setInterval(() => {
      //   this.fetchChatHistory();
      // }, 5000);
    } 
   
    
    componentWillUnmount() {
      // clearInterval(this.interval);
    }
    componentDidUpdate(prevProps) {
      if (prevProps.isFocused !== this.props.isFocused) {
        this.fetchChatHistory();
      }
    }
     
    fetchChatHistory = async() => {
      this.setState({ isloading: true });


      const mynumber = await AsyncStorage.getItem('number')
      console.log(mynumber);
      this.setState({num:mynumber})
    
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
            
            this.setState({chat:result.response})
            this.setState({ isloading: false });
          }
        })
        .catch((error) => console.log('error', error));

        const contactsJson = await AsyncStorage.getItem('contactsArray');
        const contactsMap = JSON.parse(contactsJson);
        console.log('contactarray', this.state.contactsArray)
        this.state.contactsArray = contactsMap.reduce((acc, contact) => {
          acc[contact.phoneNumber] = contact.name;
          return acc;
        }, {});
      }

    handleChatPress = async (data, index, name) => {     
      // console.log('chats', data[index].room_id)
      //     socket.emit('joinRoom', data.room_id)
          console.log('index', data[index], name)
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
            // this.props.navigation.navigate('ChatRoom', {onetoone:data[index], names:name})
            this.props.navigation.navigate('ChatRoom', { onetoone: data[index], names: name });

            // AsyncStorage.setItem('name', name)
          }
       
    }
    onChangeSearch = (query) => {
      this.setState({ searchQuery: query }, () => {
      });
    };
    
render() {
  const { chat, searchQuery, num, contactsArray, isloading } = this.state;
  console.log('contact', contactsArray)

  // Filter chat based on search query
  const filteredChat = chat.filter(item =>
    item.groupName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.Groupabout?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (item.other_id && item.user_id && (
      contactsArray[item.other_id] &&
      contactsArray[item.other_id].toLowerCase().includes(searchQuery.toLowerCase()) ||
      contactsArray[item.user_id] &&
      contactsArray[item.user_id].toLowerCase().includes(searchQuery.toLowerCase()) 
      // item.user_id.toLowerCase().includes(searchQuery.toLowerCase())
    ))
  );

  return (
    <View style={styles.container}>
      {isloading ? (
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
          <ActivityIndicator color={"darkblue"} size={'large'} />
        </View>
      ) : (
        <>
          <Searchbar
            placeholder="Search"
            value={searchQuery}
            onChangeText={this.onChangeSearch}
          />
          <ScrollView>
            {filteredChat.map((item, index) => (
              <TouchableOpacity
                style={styles.chatItem}
                key={index}
                onPress={() =>
                  this.handleChatPress(
                    chat,
                    index,
                    item.groupName
                      ? item.groupName
                      : item.Groupabout ||
                          (item.other_id &&
                            item.user_id &&
                            (contactsArray[item.other_id] ||
                              contactsArray[item.user_id] ||
                              item.user_id)) ||
                          item.user_id
                  )
                }
              >
                <View style={styles.profileWrapper}>
                  {item.otherdata && item.otherdata.length > 0 ? (
                    <Image
                      style={styles.profileImage}
                      source={
                        item.otherdata[0].profile_img
                          ? { uri: ProfileImagesPath + item.otherdata[0].profile_img }
                          : require('../../../assets/Profile/Emptypic.png')
                      }
                    />
                  ) : (
                    <Image
                      style={styles.profileImage}
                      source={
                        item.group_profile_img
                          ? { uri: ProfileImagesPath + item.group_profile_img }
                          : require('../../../assets/Profile/Emptypic.png')
                      }
                    />
                  )}
                  <View>
                    <Text style={styles.chatName}>
                      {item.groupName
                        ? item.groupName
                        : item.Groupabout ||
                          (item.other_id &&
                            item.user_id &&
                            (contactsArray[item.other_id] ||
                              contactsArray[item.user_id] ||
                              item.user_id)) ||
                          item.user_id}
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </>
      )}
    </View>
  );

}

  }
  export default withNavigationFocus(App);
  
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
      marginLeft:5,
      color:'#333'
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
      color:'black',
    },
    profileWrapper: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 10,
    },
    
  });