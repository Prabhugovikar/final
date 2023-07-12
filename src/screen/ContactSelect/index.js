import React, { Component, useState } from 'react';
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
import { API_URL ,socket } from '../../service';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CheckBox from '@react-native-community/checkbox';
import Icon from 'react-native-vector-icons/FontAwesome'
import { Const_Images, Com_color, Com_font } from '../../constants';
import DateTimePicker from '@react-native-community/datetimepicker';

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
  constructor(props) {
    super(props);

    this.state = {
      isSelected:false,
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
      show: false,
      date: new Date(),
      date2: ''
    };
    // this.onChange = this.onChange.bind(this);
  }

  async componentDidMount() {
    const contactNumber = await AsyncStorage.getItem('number');
    const matchingContacts = await AsyncStorage.getItem('contacts');
    const contacts = JSON.parse(matchingContacts);
    this.setState({ contacts, contactNumber });
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
  
  onChange(event, selectedDate) {
    const currentDate = selectedDate || this.state.date;
    this.setState({
      date: currentDate,
      show: Platform.OS === 'ios'
    });
    const date = new Date(this.state.date);
    // const isoDate = this.state.date
    const isoDate2 = date.toISOString();
    console.log(isoDate2)
    this.setState({ date2: isoDate2 })
  }

  CreateGroup = async () => {
    
    // const date = new Date(this.state.date);
    // // const isoDate = this.state.date
    // const isoDate2 = date.toISOString();
    // console.log("date", isoDate2)
    console.log("date", this.state.date2)

      var myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");

    let raw;

    if (this.state.date2) {
      raw = JSON.stringify({
        "user_id": this.state.contactNumber,
        "joining_group": this.state.selectedContacts,
        "autoDelete": this.state.date2
      });
    } else {
      raw = JSON.stringify({
        "user_id": this.state.contactNumber,
        "joining_group": this.state.selectedContacts
      });
    }


      var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
      };

      fetch(API_URL+"creategroup", requestOptions)
        .then(response => response.json())
        .then(result => {
          console.log(result)
          if (result.status === 'Success' ){

            this.props.navigation.navigate('GroupCreation', result)

          }
        })
        .catch(error => console.log('error', error));

  }
  onChangeSearch = (query) => {
    this.setState({ searchQuery: query });
  };

  render() {
    const { contacts, searchQuery, show, date } = this.state;
    const { contact, navigation } = this.props;
    return (
      <View style={styles.container}>
        <Icon
          onPress={() => navigation.goBack()}
          style={{position:'absolute', top:25, left:18}}
          name="arrow-left"
          size={30}
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
    marginTop:15
  
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
  labletxt: {
    fontSize: Com_font.txt14,
    color: Com_color.labletxt,
    fontWeight: 'bold',
  },
});

