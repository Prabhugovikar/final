import React, { Component } from 'react';
import { View, Text, TextInput, StyleSheet,TouchableOpacity} from 'react-native';
import IconBack from 'react-native-vector-icons/MaterialCommunityIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_URL } from '../../service';

class MobileNumberScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mobileNumber: '',
      oldNumber:'',
    };
  }

  handleSaveNumber = async (navigation) => {
    const id = (await AsyncStorage.getItem('profileid')).replace(/"/g, '');
    console.log(id);
    var myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");

var raw = JSON.stringify({
  "_id": id,
  "mobilenumber": this.state.mobileNumber
});

var requestOptions = {
  method: 'PUT',
  headers: myHeaders,
  body: raw,
  redirect: 'follow'
};

fetch(API_URL+"changenumber", requestOptions)
  .then(response => response.json())
  .then(result => {console.log(result)
  
  // this.props.navigation.navigate('Profile')
  })
  .catch(error => console.log('error', error));
  }

  onChangeNumber = (text) => {
    this.setState({ mobileNumber: text });
    console.log(this.state.mobileNumber)
  }

  render() {
    const { mobileNumber, oldNumber } = this.state; 
    const { navigation } = this.props;
    return (
      <View style={{marginTop:0}}>
        <View style={{flexDirection:'row', backgroundColor:'#ddd', paddingBottom:10}}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <IconBack name="keyboard-backspace" color="#111" size={45} style={{ height: 40, width: 40, marginTop:8}} />
          </TouchableOpacity>
          <Text style={styles.name} >Change Number</Text>
        </View>
  
        <Text style={styles.title}>Old Mobile Number</Text>
        <TextInput
         keyboardType="numeric"
          value={oldNumber} 
          onChangeText={text => this.setState({ oldNumber: text })}
          style={styles.input}
        />
  
        <Text style={styles.title}>New Mobile Number</Text>
        <TextInput
          keyboardType="numeric"
          value={mobileNumber}
          onChangeText={this.onChangeNumber}
          style={styles.input}
        />
  
        <View>
          <TouchableOpacity style={styles.touch} onPress={this.handleSaveNumber(navigation)}>
            <Text style={styles.text}>Change Number</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
  
}

const styles = StyleSheet.create({
  title: {
    fontSize: 20,
    marginTop: 20,
    marginLeft: 30,
    fontWeight: 'bold',
    color:'#111'
  },
  input: {
    marginHorizontal: 30,
    fontSize: 20,
    marginTop: 10,
    backgroundColor: '#ddd',
    
  },
  name: {
    marginTop:13,
    fontSize: 25,
    fontWeight: 'bold',
    marginLeft: 25,
    color:'#111'
  },
  touch:{
    marginTop:30,
            height:50,
            width:300,
            backgroundColor:"darkblue",
            borderRadius:10,
            alignSelf:'center'
  },
  text:{
    marginTop :10,
                    fontWeight:'bold',
                    alignSelf:'center',
                    fontSize:17,
                    color:'#ffcc00',
                    letterSpacing:0.03,
                    fontFamily:'sans-serif'
  }
});

export default MobileNumberScreen;
