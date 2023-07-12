import AsyncStorage from '@react-native-async-storage/async-storage';
import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { FlatList, Image, StyleSheet, Text, View,TouchableOpacity, ActivityIndicator } from 'react-native';
import IconBack from 'react-native-vector-icons/MaterialCommunityIcons';
import { API_URL, ProfileImagesPath, StoryPath } from '../../../service';

const App = ({route,navigation}) => {
  const id = route?.params;
  console.log("id from viweers",id)
  const [profile, setProfile] = useState([]);
  const [seen,setSeen] = useState('');
  const [isloading, setisloading] = useState(true)

useEffect(() => {

 const getStory = async () =>{

  const mynumber = await AsyncStorage.getItem('number');
console.log("my number", mynumber);

const contactsJson = await AsyncStorage.getItem('contactsArray');
const contactsArray = JSON.parse(contactsJson);

const contactsMap = {};
for (const contact of contactsArray) {
  contactsMap[contact.phoneNumber] = contact.name;
}

const myArray = mynumber.split().map(Number); // split the mynumber string to an array of numbers

var myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");

var raw = JSON.stringify({
  "_id": id,
  "seenuser_id": myArray
});

var requestOptions = {
  method: 'POST',
  headers: myHeaders,
  body: raw,
  redirect: 'follow'
};

fetch(API_URL+"updateViewers", requestOptions)
  .then(response => response.json())
  .then(result => { 
    if (result.Status == true) {
      console.log("noOftimesseen",result)
      const viewerDetails = result.result.viwerDetails;
      const filteredDetails = viewerDetails.filter(detail => !myArray.includes(detail.mobilenumber)); // filter out viewer details with a matching mobilenumber
      const profileData = filteredDetails.map(viewer => {
      const mobileNumber = viewer.mobilenumber;
      const profileImage = viewer.profile_img;
      const name = contactsMap[mobileNumber] || mobileNumber; // Use the contactsMap to get the name for the phone number, or use the number itself if no name is found
      return { mobileNumber, profileImage, name };
    });
    setProfile(profileData);
    setSeen(result.result.noOftimesseen[0])
    console.log("profiledata", profileData)
    setisloading(false)
    }
    
  })
  .catch(error => console.log('error', error));


 }
 getStory();

},[])

  const renderItem = ({ item }) => (
  
     <View style={styles.container}>
      <View>      
    <View style={styles.item}>
      <Image source={{ uri: ProfileImagesPath + `${item.profileImage}` }}  style={styles.image} />
      <View style={styles.details}>
        <Text style={styles.name}>{item.name}</Text>
        {/* <Text style={styles.number}>{item.mobileNumber}</Text> */}
        <Text style={styles.number}>{seen[item.mobileNumber]} times</Text>
      </View>
    </View>
   
    </View>
    
    </View> 
    
  );

  return (
    <View style={styles.container}>
       <View style={{flexDirection:'row', elevation:1}}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={{position:'absolute', top:7, left:10}}>
        <IconBack name="keyboard-backspace" color="#222" size={35}  />
      </TouchableOpacity>
        <Text style={styles.name1} >Viewers</Text>
        </View>
        {isloading ? (
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center", marginTop:50 }}>
        <ActivityIndicator color={"darkblue"} size={'large'} />
      </View>
    ) : (
      <>
    <FlatList
      data={profile}
      {...console.log("dsff",profile)}
      renderItem={renderItem}
      keyExtractor={(item) => item.number}
    />
     </>
     )}
    </View>
  );
}

const styles = StyleSheet.create({
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  details: {
    flex: 1,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
    color:'#222'
  },
  name1: {
    marginTop:7,
    fontSize: 25,
    fontWeight: 'bold',
    marginLeft: 50,
    color:'#222'    
  },
  number: {
    fontSize: 16,
    color: '#222',
    
  },
});

export default App;
