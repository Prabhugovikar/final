import React, { Component } from 'react';
import {
  PermissionsAndroid,
  StyleSheet,
  Text,
  View, SectionList,
  FlatList, TouchableOpacity,
} from 'react-native';
import Contacts from 'react-native-contacts';
import { Searchbar } from 'react-native-paper';
import FingerprintScanner from 'react-native-fingerprint-scanner';
import { API_URL ,socket } from '../../../service';
import AsyncStorage from '@react-native-async-storage/async-storage';


const ContactItem = ({ contact }) => {
  return (
    <View style={styles.container}>
      {contact.displayName && (
        <>
        <View style={{flexDirection:'row',justifyContent:'space-between'}}>
          <Text style={styles.name}>{contact.displayName}</Text>
          <TouchableOpacity style={styles.inviteButton} >
            <Text style={styles.inviteButtonText}>Invite</Text>
          </TouchableOpacity>
          </View>
        </>
      )}
      {!contact.displayName && (
        <>
          <Text style={styles.name}>{contact.name}</Text>
          <Text style={styles.phone}>{contact.number}</Text>
        </>
      )}
    </View>
  );
};



export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      contacts: [],
      searchQuery: '',
      phoneNumbers: [],
      searchPlaceholder: 'Search',
      typeText: null,
      loading: true,
      Activated: false,
      numbers: [],
      contactNumber: '',
      room_id: '',
      regnum:[],
      matchingContacts1:[],
      allContacts: [],
      matchingContacts: [],
    };
  }

 async componentDidMount() {
    this.fetchContacts();
    this.Finger_print();
   
  }



  fetchContacts = async () => {

    const hasPermission = await this.checkContactsPermission();
    if (!hasPermission) {
      const granted = await this.requestContactsPermission();
      if (!granted) {
        console.log('Contacts permission denied');
        return;
      }
    }
    Contacts.getAll()
      .then(async allContacts => {
        // Filter out contacts with duplicate phone numbers
        const uniqueContacts = [];
        const phoneNumbers = new Set();
        allContacts.forEach(contact => {
          if (!contact.phoneNumbers) {
            return;
          }
          const uniqueNumbers = [];
          contact.phoneNumbers.forEach(phone => {
            const number = phone.number.replace(/\s/g, ''); 
            const countryCode = phone.countryCode || ''; 
            const formattedNumber = number.replace(countryCode, '').replace(/^[+|0]*(\d{10})$/, '$1'); 
            if (!phoneNumbers.has(formattedNumber)) {
              phoneNumbers.add(formattedNumber);
              uniqueNumbers.push({
                ...phone,
                number: formattedNumber,
              });
            }
          });
          if (uniqueNumbers.length > 0) {
            uniqueContacts.push({
              ...contact,
              phoneNumbers: uniqueNumbers,
            });
          }
        });
        const sortedContacts = uniqueContacts.sort((a, b) =>
          a.displayName.localeCompare(b.displayName)
        );
       
        this.setState({ contacts: sortedContacts });
        console.log('contacts', this.state.contacts)

        
        const phoneNumbersAsNumbers = sortedContacts.map(contact => parseInt(contact.phoneNumbers[0].number.replace(/\s/g, ''), 10));
        this.sendContacts(phoneNumbersAsNumbers);
      })
      .catch(error => {
        console.log(error);
      });
  };

  
  checkContactsPermission = async () => {
    const permission = PermissionsAndroid.PERMISSIONS.READ_CONTACTS;
    const hasPermission = await PermissionsAndroid.check(permission);
    if (hasPermission) {
      return true;
    }
    const status = await PermissionsAndroid.request(permission);
    return status === 'granted';
  };

  requestContactsPermission = async () => {
    try {
      const permission = PermissionsAndroid.PERMISSIONS.READ_CONTACTS;
      const status = await PermissionsAndroid.request(
        permission,
        {
          title: 'Contacts',
          message: 'This app needs permission to access your contacts.',
          buttonPositive: 'OK',
          buttonNegative: 'Cancel',
        },
      );
      return status === 'granted';
    } catch (error) {
      console.log(error);
      return false;
    }
  };
async sendContacts(phoneNumbersAsNumbers) {
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  var raw = JSON.stringify({
    "mobilenumber": phoneNumbersAsNumbers
  });

  var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    redirect: 'follow'
  };

  fetch(API_URL + "getcontact", requestOptions)
    .then(response => response.json())
    .then(async result => {
      const matchingContacts = [];
      const regnum = result.result.map(contact => contact.mobilenumber);
      const allContacts = [];
      const contacts = this.state.contacts;
      for (let i = 0; i < contacts.length; i++) {
        const contact = contacts[i];
        for (let j = 0; j < contact.phoneNumbers.length; j++) {
          const phoneNumber = contact.phoneNumbers[j];
          const formattedNumber = parseInt(phoneNumber.number.replace(/\s/g, ''), 10);
          if (regnum.includes(formattedNumber)) {
            matchingContacts.push({
              name: contact.displayName,
              number: phoneNumber.number
            });
            break;
          }

        }
        allContacts.push(contact);
      }
      // // for (let i = 0; i < matchingContacts.length; i++) {
      //   const contact = matchingContacts[i];
      //   await AsyncStorage.setItem(`matchingContactName${i}`, contact.name);
      // // }
      this.setState({
        matchingContacts: matchingContacts,
        allContacts: allContacts
      });
      await AsyncStorage.setItem('contacts', JSON.stringify(this.state.matchingContacts));
      await AsyncStorage.setItem('allContacts', JSON.stringify(this.state.allContacts));
      console.log('allContacts:', this.state.allContacts);
      console.log('matchingContacts:', this.state.matchingContacts);
      
    })
    .catch(error => console.log('error', error));
}

  async onPressContact(contact) {
    const mynumber = await AsyncStorage.getItem('number');
    // console.log(this.state.contactNumber)

    console.log('hhfjkf',contact)
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    // const phoneNumber = contact.phoneNumbers[0].number;
    // const phoneNumberWithoutSpaces = phoneNumber.replace(/\s/g, '');
    console.log('Contact Details', contact);


    // const name = contact.displayName
    await AsyncStorage.setItem('name', contact.name);
    var raw = JSON.stringify({
      "user_id": mynumber,
      "other_id": contact.number
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
        // if (result != null) {
        //   this.props.navigation.navigate('ChatRoom')
        // }
        if (result.response.length != 0) {
          this.state.room_id = result.response[0].room_id
          console.log(this.state.room_id)
        } else {
          this.state.room_id = result.response.room_id
          console.log(this.state.room_id)
        }
        socket.emit('joinRoom', this.state.room_id)
        // socket.emit('liveuser', '8296735832')
        this.props.navigation.navigate('ChatRoom', result)
        console.log(result)
      })
      .catch(error => console.log('error', error));
  }


  onChangeSearch = query => {
    this.setState({ searchQuery: query });
  };
  

  Finger_print() {
    FingerprintScanner.authenticate({
      description: 'Scan your fingerprint on the device scanner to continue',
    })
      .then(() => {
        ToastMsg('Authenticated successfully', 'success');
        this.setState({Activated: true, loading: true});
        FingerprintScanner.release();
        this.Android_Permission();
      })
      .catch(error => {
        FingerprintScanner.release();
        ToastMsg(error.message, 'danger');
        //  this.Finger_print()
      });
  }
  
  render() {
    const { contacts, searchQuery, matchingContacts } = this.state;
    const regex = new RegExp(searchQuery, "i");
    const filteredContacts = contacts.filter(contact =>
      regex.test(contact.displayName)
    );
    const filteredMatchingContacts = matchingContacts.filter(contact =>
      regex.test(contact.name)
    );
    const allContacts = [...filteredMatchingContacts, ...filteredContacts];
  
    return (
      <View style={styles.container}>
        <Searchbar
          placeholder="Search"
          onChangeText={this.onChangeSearch}
          value={searchQuery}
          containerStyle={styles.searchBarContainer}
          inputContainerStyle={styles.searchBarInputContainer}
        />
        {allContacts.length > 0 ? (
          <FlatList
            data={allContacts}
            renderItem={({ item }) => (
              <TouchableOpacity onPress={() => this.onPressContact(item)}>
                <ContactItem contact={item} />
              </TouchableOpacity>
            )}
            keyExtractor={item => item.recordID}
            style={styles.list}
          />
        ) : (
          <Text>No contacts found</Text>
        )}
      </View>
    );
  }
  
  
  
  
  

  
}
  

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  searchBar: {
    marginBottom: 16,
  },
  list: {
    flex: 1,
  },
  contact: {
    marginBottom: 16,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  phoneNumber: {
    fontSize: 16,
    marginBottom: 4,
  },
});



