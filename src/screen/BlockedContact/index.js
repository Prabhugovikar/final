import React, { Component } from 'react';
import { View, Text, FlatList, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { isMouseConnected } from 'react-native-device-info';
import IconBack from 'react-native-vector-icons/MaterialCommunityIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_URL } from '../../service';
import Icon from 'react-native-vector-icons/FontAwesome';
import { ScrollView } from 'react-native-gesture-handler';


class BlockedContactsScreen extends Component {

  constructor(props) {
    super(props);
    this.state = {
      blockedContacts: [],
    }

  }

  async componentDidMount() {

    const contactsJson = await AsyncStorage.getItem('contacts');
    const contactsArray = JSON.parse(contactsJson);
    console.log('contactarray', contactsArray)

    const mynumber = await AsyncStorage.getItem('number')
    console.log(mynumber);

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      "user_id": mynumber
    });

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };

    fetch(API_URL + "getallblockcontact", requestOptions)
      .then(response => response.json())
      .then(result => {
        console.log(result);
        const blockedContacts = result.response.blockContact;
        console.log('blockedContacts', blockedContacts);

        const blockedContactsNames = [];
        for (let i = 0; i < blockedContacts.length; i++) {
          const blockedNumber = blockedContacts[i];
          console.log('asdfghjk', blockedNumber)
          for (let j = 0; j < contactsArray.length; j++) {
            const contact = contactsArray[j];
            console.log('asdfghjjhhh', contact)
            if (blockedNumber.toString() === contact.number.toString()) {
              const { name, number } = contact;
              blockedContactsNames.push({ name, number });
              break;
            }

          }
        }

        console.log('blockedContactsNames', blockedContactsNames);
        this.setState({ blockedContacts: blockedContactsNames });
      })
      .catch(error => console.log('error', error));
  }



  render() {
    const { navigation } = this.props;
    const { blockedContacts } = this.state;
    console.log("view block", blockedContacts)

    return (
      <View style={{ flex: 1 }}>
        <View style={{ flexDirection: 'row', backgroundColor:'#ddd', paddingBottom:10 }}>
          <TouchableOpacity style={{position:'absolute', top:22, right:15}}>
            <Icon name='plus' size={25} color={'#111'} />
          </TouchableOpacity>
          
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <IconBack name="keyboard-backspace" color="#111" size={45} style={{ height: 40, width: 40, position:'absolute', top:10, left:5 }} />
            </TouchableOpacity>
            <Text style={styles.title}>Blocked Contacts</Text>
          
        </View>
        <ScrollView>
      {blockedContacts.length > 0 ? (
        <View style={{marginTop:10}}>
            <FlatList
              data={blockedContacts}
              renderItem={({ item }) => (
                <View style={styles.item}>
                  <Text style={styles.name}>{item.name}</Text>
                  <Text style={styles.number}>{item.number}</Text>
                </View>
              )}
              keyExtractor={(item, index) => index.toString()}
            />
          </View>
        
        
        
) : (
          <View style={{ flex: 1,  alignItems: 'center', marginTop:'50%' }}>
            <Text>No blocked contacts found</Text>
          </View>
        )}
        </ScrollView>
        
      </View>
    );
  }

}

const styles = StyleSheet.create({
  item: {
    display: 'flex',
    flexDirection: 'column',
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  name: {
    marginBottom: 8,
    fontSize: 20
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 16,
  },
  title: {
    marginTop: 15,
    fontSize: 25,
    fontWeight: 'bold',
    marginLeft: 70,
    color:'#111'
  },
  noContactsContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noContactsText: {
    fontSize: 16,
    color: 'grey',
  },
});

export default BlockedContactsScreen;
