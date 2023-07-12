import React, { Component } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/Entypo';

import IconBack from 'react-native-vector-icons/MaterialCommunityIcons';


class Setting extends Component {
  render() {
    const { navigation } = this.props;
    
    return (
      <View style={styles.container}>
        <View style={{flexDirection:'row', borderBottomColor:'#ddd', paddingBottom:10, borderBottomWidth:1}}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
        <IconBack name="keyboard-backspace" color="#111" size={45} style={{ height: 40, width: 40, marginTop:8}} />
      </TouchableOpacity>
        <Text style={styles.name}>Accounts</Text>
        </View>


        <TouchableOpacity onPress={() => navigation.navigate('Privacy')}>
          <View style={styles.option}>
            <Icon name="lock" size={30} color="darkblue" />
            <Text style={styles.optionText}>Privacy</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('Security')}>
          <View style={styles.option}>
            <Icon name="shield" size={30} color="darkblue" />
            <Text style={styles.optionText}>Security</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('ChangeNumber')}>
          <View style={styles.option}>
            <Icon name="log-out" size={30} color="darkblue" />
            <Text style={styles.optionText}>Change Mobile Number</Text>
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
    marginTop:20,
    fontSize:25, 
    fontWeight: 'bold',
    marginLeft:20,
    marginBottom:20,
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    width: '100%',
    paddingVertical: 30,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  optionText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 15,
    color:'#111'
  },
  name: {
    marginTop:13,
    fontSize: 25,
    fontWeight: 'bold',
    marginLeft: 25,
    color:'#111'
  },
});

export default Setting;
