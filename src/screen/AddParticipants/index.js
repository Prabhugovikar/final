import React, { Component, useState, useEffect } from 'react';
import {
    PermissionsAndroid,
    StyleSheet,
    Text,
    View,
    FlatList, TouchableOpacity, Image
} from 'react-native';
import Contacts from 'react-native-contacts';
import { Searchbar } from 'react-native-paper';
// import FingerprintScanner from 'react-native-fingerprint-scanner';
import { API_URL, socket } from '../../service';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CheckBox from '@react-native-community/checkbox';
import Icon from 'react-native-vector-icons/FontAwesome'
const checkedImage = require('../../assets/Images2/ic_checkbox_active.png');
const uncheckedImage = require('../../assets/Images2/ic_checkbox_normal.png');

const ContactItem = ({ contact, onSelectContact }) => {
    const [isSelected, setIsSelected ] = useState(false)
          const handleCheckboxChange = (checked) => {
              setIsSelected(checked);
          onSelectContact( contact.number, checked);
          }
    return (
      <View style={styles.container}>
        <View>
                  <CheckBox
                  style={{position:'absolute', top:10, right:10}}
                  checkedIcon={<Icon name='check-square' size={24} color='green' />}
                  uncheckedIcon={<Icon name='square' size={24} color='gray' />}
                  value={isSelected}
                  onValueChange={handleCheckboxChange}
  
                  />
          <Text style={styles.name}>{contact.name}</Text>
          <Text style={styles.phone}>{contact.number}</Text>
        </View>
      </View>
    );
  };


export default class ContactSelect extends Component {
    constructor(props, route) {
        super(props);

        this.state = {
            isSelected: false,
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
            selectedContacts: [],
            group: ''
        };
    }

    async componentDidMount() {
        const contactNumber = await AsyncStorage.getItem('number');
        console.log(this.state.contactNumber)
        const matchingContacts = await AsyncStorage.getItem('contacts');
        const contacts = JSON.parse(matchingContacts);
        this.setState({ contacts, contactNumber });

        const group = this.props.route.params;
        console.log("group", group)
        this.setState({ group: group })
        console.log(this.state.group.admin_id[0])
    }

    handleCheckboxChange = (contactNumber, checked) => {
        if (checked) {
          const selectedContacts = [...this.state.selectedContacts, contactNumber];
          this.setState({ selectedContacts });
        } else {
          const selectedContacts = this.state.selectedContacts.filter(
            (item) => item !== contactNumber
          );
          this.setState({ selectedContacts });
        }
      };
      

  

    CreateGroup = () => {
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({
            "_id": this.state.group._id,
            "admin_id": this.state.group.admin_id[0],
            "joining_group": this.state.selectedContacts
        });

        var requestOptions = {
            method: 'PUT',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        fetch(API_URL + "joingroup", requestOptions)
            .then(response => response.json())
            .then(result => {
                if (result.status === 'Success') {
                    console.log(result)
                    this.props.navigation.navigate('ViewGroup');
                }
            })
            .catch(error => console.log('error', error));
    }


    onChangeSearch = query => {
        this.setState({ searchQuery: query });
    };
    

    render() {
        const { contacts, searchQuery } = this.state;
        const { contact, navigation } = this.props;
        const { isSelected } = this.state;

        return (
            <View style={styles.container}>
              <Icon
                onPress={() => navigation.goBack()}
                style={{position:'absolute', top:25, left:18}}
                name="arrow-left"
                size={30}
                color={'#333'}
              />
      
              <Searchbar
                style={{ marginLeft: '10%' }}
                placeholder="Search"
                onChangeText={this.onChangeSearch}
                value={searchQuery}
                containerStyle={styles.searchBarContainer}
                inputContainerStyle={styles.searchBarInputContainer}
              />
      
              <FlatList
                // data={contacts}
                data={contacts.filter(contact =>
                  contact.name.toLowerCase().includes(searchQuery.toLowerCase())
                )}
                renderItem={({ item }) => <ContactItem contact={item} 
                                            onSelectContact={this.handleCheckboxChange}/>}
                keyExtractor={(item) => item.recordID}
              />
              <View style={{ flexDirection: 'row' }}>
                <TouchableOpacity style={{ position: 'absolute', bottom: '1%', right: 5 }}
              onPress={() => this.CreateGroup()}>
              
              <Image
              source={require('../../assets/Images2/ic_next.png')}
              style={{height:80, width:80}}     
              />
            </TouchableOpacity>
               
              </View>
            </View>
          );
        }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        marginTop: 15

    },
    heading: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 16,
        color:'#333'
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
        marginBottom: 8,
        color:'#333'
    },
    phoneNumber: {
        fontSize: 16,
        marginBottom: 4,
        color:'#333'
    },
});
