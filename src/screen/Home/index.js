import React, {useEffect, Component} from 'react';
import {
  View,
  TouchableOpacity,
  Image,
  StatusBar,
  Text,
  TextInput,
  ScrollView,
  BackHandler,
  Alert,
  Modal,
  TouchableWithoutFeedback,
  AppState
} from 'react-native';
//import APP_STORE from '../../storage';
import Menu, {MenuItem, MenuDivider} from 'react-native-material-menu';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  DEVICE_HEIGHT as dh,
  DEVICE_WIDTH as dw,                
  STRING_VALIDATION,
} from '../../utils';

import {Tabs, Tab, NativeBaseProvider, TabHeading, Badge} from 'native-base';
import IconDot from 'react-native-vector-icons/Entypo';
import IconSearch from 'react-native-vector-icons/Fontisto';
import Contacts from './Contacts';
import Status from './Status';
import Chat from './Chat';
import CustomMenu from './customMenu/index.js';
import { API_URL, socket } from '../../service';


class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      menu: false,
      modalVisible: false,
      searchQuery:''
    };
  }

  componentDidMount() {
    // this.backHandler = BackHandler.addEventListener(
    //   'hardwareBackPress',
    //   this.backAction,
    // );
    if (this.state.searchQuery) {
      this.componentDidMount();
    }
    
      // checkupdate();
      this.userLogin();
      // Subscribe to AppState changes
      AppState.addEventListener('change', this.handleAppStateChange);
  
      // Clean up function
      return () => {
        // Unsubscribe from AppState changes
        AppState.removeEventListener('change', this.handleAppStateChange);
        
        // Disconnect socket and call API when the app is closed
        // disconnectSocket();
        this.callAPI();
      };
    
  
  }

  userLogin = async () =>{
    const value = await AsyncStorage.getItem('@user');
    const value1 = JSON.parse(value)
    console.log('_id....',value1.response.mobilenumber)
    socket.emit('userLoggedIn', { userId: value1.response.mobilenumber});
    const currentTime = new Date().toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: 'numeric',
      hour12: true
    });
    console.log('time', currentTime)
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    var raw = JSON.stringify({
      "userId": value1.response._id,
      "time": currentTime
    });
    console.log('raw',raw)
    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };
    
    fetch(API_URL+"userlogin", requestOptions)
      .then(response => response.json())
      .then(result =>{
        console.log('online',result)
      })
      .catch(error => console.log('error', error));

  }
   handleAppStateChange = (nextAppState) => {
    if (nextAppState === 'inactive' || nextAppState === 'background') {
      // App is being closed or moved to the background
      // disconnectSocket();
      this.callAPI();
    }
    else {
      this.userLogin();
      // socket.connect();
      console.log('homescreen socket check', socket)
    }
    
  };

   callAPI = async() => {
    const value = await AsyncStorage.getItem('@user');
    const value1 = JSON.parse(value)
    console.log('_id....',value1.response._id)
    const currentTime = new Date().toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: 'numeric',
      hour12: true
    });
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    var raw = JSON.stringify({
      "userId": value1.response._id,
      "time": currentTime
    });
    console.log('raw....',raw)
    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };
    
    fetch(API_URL+"userOffline", requestOptions)
      .then(response => response.json())
      .then(result => {
        console.log('offline',result)
      })
      .catch(error => console.log('error', error));
  }; 


  handleOptionPress = (option) => {
    this.setState({ modalVisible: false });
    if (option === 'screen1') {
      this.props.navigation.navigate('ContactSelect');
    } else if (option === 'screen2') {
      this.props.navigation.navigate('Settings');
    }
  };

  // backAction = () => {
  //   Alert.alert('Hold on!', 'Are you sure you want to go back?', [
  //     {
  //       text: 'Cancel',
  //       onPress: () => null,
  //       style: 'cancel',
  //     },
  //     {text: 'YES', onPress: () => BackHandler.exitApp()},
  //   ]);
  //   return true;
  // };

  render() {
    const {menu} = this.state;
    return (
      <View style={styles.container}>
        <StatusBar
                    translucent={false}
                    backgroundColor={'#fff'}
                    barStyle='dark-content'
                    animated={true}
                    
                />

        <View>
        <View style={styles.toolbar}>
          <Text style={styles.tooltxt}>Hiddenly</Text>
          {/* <IconSearch style={styles.Icons1} name="search" size={20} /> */}
          <IconDot
            style={{ position:'absolute', top:23, right:15 }}
            name="dots-three-vertical"
            size={20}
            color={'#333'}
            onPress={() => this.setState({ modalVisible: true })}
          />
        </View>
        
        <Modal
          visible={this.state.modalVisible}
          animationType='slide'
          transparent={true}
          onRequestClose={() => this.setState({ modalVisible: false })}
        >
          <TouchableWithoutFeedback onPress={() => this.setState({modalVisible:false})}>
            <View style={{flex:1}}></View>
          </TouchableWithoutFeedback>
         
          <View style={styles.modalContainer}>
          
            <TouchableOpacity
              style={styles.modalOption}
              onPress={() => this.handleOptionPress('screen1')}
            >
              <Text style={styles.modalOptionText}>New Group</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.modalOption}
              onPress={() => this.handleOptionPress('screen2')}
            >
              <Text style={styles.modalOptionText}>Settings</Text>
            </TouchableOpacity>
          </View>
        </Modal>
      </View>
  

        <Tabs
          tabBarUnderlineStyle={{backgroundColor: '#003399'}}
          tabContainerStyle={styles.tabsContainer}
          initialPage={1}>
          <Tab
            heading="Contacts"
            tabStyle={{backgroundColor: '#FFF'}}
            activeTabStyle={{backgroundColor: '#fff'}}
            textStyle={styles.tabTextStyle}
            inactiveTextStyle={{color: '#fff'}}
            activeTextStyle={styles.tabActiveTextStyle}>
            <Contacts navigation={this.props.navigation} searchQuery={this.state.searchQuery} />
          </Tab>
          <Tab
            heading="Chat"
            tabStyle={{backgroundColor: '#FFF'}}
            activeTabStyle={{backgroundColor: '#fff'}}
            textStyle={styles.tabTextStyle}
            inactiveTextStyle={{color: '#fff'}}
            activeTextStyle={styles.tabActiveTextStyle}>
            <Chat navigation={this.props.navigation} searchQuery={this.state.searchQuery} />
          </Tab>
          <Tab
            heading="Status"
            tabStyle={{backgroundColor: '#FFF'}}
            activeTabStyle={{backgroundColor: '#fff'}}
            textStyle={styles.tabTextStyle}
            inactiveTextStyle={{color: '#fff'}}
            activeTextStyle={styles.tabActiveTextStyle}>
            <Status navigation={this.props.navigation} searchQuery={this.state.searchQuery} />
          </Tab>
         
        </Tabs>
      </View>
    );
  }
}

const styles = {
  container: {flex: 1},
  tooltxt: {
    fontSize: 20,
    color: "darkblue",
    marginLeft: '5%',
    fontWeight:"bold"
  },
  toolbar: {
    flexDirection: 'row',
    height: 60,
    alignItems: 'center',
    width: dw,
    // marginTop: '5%',
    backgroundColor:'#fff'
  },
  Icons1: {marginLeft: '55%'},
  Icons2: {marginLeft: '17%'},
  tabsContainer: {
    width: dw,
    height: 50,
    justifyContent: 'space-evenly',
  },
  Badgeview: {
    width: 20,
    height: 20,
    backgroundColor: '#a9a9b0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  Badgetxt: {fontSize: 12},
  tabTextStyle: {
    color: '#a9a9b0',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 16,
  },
  tabActiveTextStyle: {
    color: '#3b3b3b',
    fontSize: 16,
    fontWeight: 'bold',
  },
  // modalContainer: {
  //   backgroundColor: 'lightgrey',
  //   borderRadius: 10,
  //   padding: 10,
  //   marginHorizontal: 20,
  //   marginTop: 80,
  //   elevation: 4,
  // },
  modalContainer: {
    backgroundColor: '#eee',
    borderRadius: 10,
    // padding: 10,
    // alignItems: 'center',
    // justifyContent: 'flex-end',
    position: 'absolute',
    top:20,
    right: 5,
    height: 100,
    width: 150,
    elevation:5
  },
  modalOption: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    // borderBottomWidth: 1,
    // borderBottomColor: '#ccc',
  },
  modalOptionText: {
    fontSize: 18,
    fontWeight: 'bold',
    color:'#333'
  },
};

export default Home;
