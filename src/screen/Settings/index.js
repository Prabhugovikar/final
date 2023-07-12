import React, { Component } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import IconBack from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon2 from 'react-native-vector-icons/MaterialCommunityIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { firebase } from '@react-native-firebase/auth';


class Setting extends Component {
   handleLogout = async () => {

    if (firebase.auth().currentUser) {
      console.log('currentuser', firebase.auth().currentUser)
            firebase.auth().currentUser.delete();
    }
    // Clear AsyncStorage
    try {
      await AsyncStorage.clear();
    } catch (error) {
      console.error('Error clearing AsyncStorage:', error);
    }

    // Navigate to the login screen
    this.props.navigation.navigate('Splash')
  };
  render() {
    const { navigation } = this.props;
    
    return (
      <View style={styles.container}>
        <View style={{flexDirection:'row', paddingBottom:10, elevation:5}}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
        <IconBack name="keyboard-backspace" color="#111" size={45} style={{ top:9}} />
      </TouchableOpacity>
        <Text style={styles.name} >Settings</Text>
        </View>

<TouchableOpacity onPress={() => navigation.navigate('Profile')}>
          <View style={styles.option}>
            <View style={styles.optionContent}>
              <Icon name="person" size={30} color="darkblue" />
              <View>
                <Text style={styles.optionText}>Profile</Text>
                <Text style={styles.optionSubtext}>
                  Change your profile details
                </Text>
              </View>
            </View>
          </View>
            </TouchableOpacity>

    <TouchableOpacity onPress={() => navigation.navigate('Accounts')}>
          <View style={styles.option}>
            <View style={styles.optionContent}>
              <Icon name="settings" size={30} color="darkblue" />
              <View>
                <Text style={styles.optionText}>Accounts</Text>
                <Text style={styles.optionSubtext}>
                  Privacy, security, Change Number
                </Text>
              </View>
            </View>
          </View>
            </TouchableOpacity>

<TouchableOpacity onPress={() => navigation.navigate('Notifications')}>
          <View style={styles.option}>
            <View style={styles.optionContent}>
              <Icon name="notifications" size={30} color="darkblue" />
              <View>
                <Text style={styles.optionText}>Notifications</Text>
                <Text style={styles.optionSubtext}>
                  Change your notification settings
                </Text>
              </View>
            </View>
          </View>
            </TouchableOpacity>

  
<TouchableOpacity onPress={() => navigation.navigate('Help')}>
          <View style={styles.option}>
            <View style={styles.optionContent}>
              <Icon name="help-circle" size={30} color="darkblue" />
              <View>
                <Text style={styles.optionText}>Help</Text>
                <Text style={styles.optionSubtext}>
                  Help center, contact us, Privacy policy
                </Text>
              </View>
            </View>
          </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={()=>this.handleLogout()}>
          <View style={styles.option}>
            <View style={styles.optionContent}>
              <Icon2 name="logout" size={30} color="darkblue" />
              <View>
                <Text style={styles.optionText}>logout</Text>
                <Text style={styles.optionSubtext}>
                  Logout from Hiddenly
                </Text>
              </View>
            </View>
          </View>
            </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:'#fff'
  },
  text:{
    marginTop:10,
    fontSize:25, 
    fontWeight: 'bold',
    marginLeft:20,
    marginBottom:20,
    color:'#222'
  },
  name: {
    marginTop:13,
    fontSize: 25,
    fontWeight: 'bold',
    marginLeft: 25,
    color:'#111'
  },
  option: {
    borderBottomWidth: 1,
    borderBottomColor: 'lightgray',
    paddingVertical: 35,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  optionContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  optionText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'darkblue',
    marginLeft: 10,
  },
  optionSubtext: {
    fontSize: 14,
    color: '#222',
    marginLeft: 10,
  },
});

export default Setting;
