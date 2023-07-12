import React, { useState, useEffect } from 'react';
import { View, Text, SectionList, TouchableOpacity, StyleSheet, Image, ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { IP, StoryPath, API_URL } from '../../../service';
import Icon from 'react-native-vector-icons/FontAwesome';
import Video from 'react-native-video';
import { ScrollView } from 'react-native-gesture-handler';
import { Searchbar } from 'react-native-paper';
import { useFocusEffect, useIsFocused } from '@react-navigation/native';


const StatusScreen = () => {
  const navigation = useNavigation();
  const [id, setId] = useState('');
  const [myStories, setMyStories] = useState([]);
  const [otherStories, setOtherStories] = useState([]);
  const [currentNumber, setCurrentNumber] = useState(null);
  const [contacts, setContacts] = useState({});
  const [seen, setSeen] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [isloading, setisloading] = useState(false);
  const isFocused = useIsFocused();

  useEffect(() => {
    getStory();
    // const interval = setInterval(() => {
    //   getStory();
    // }, 5000);
    // return () => {
    //   clearInterval(interval);
    // };
  }, []);
  useEffect(() => {
    if (isFocused) {
      getStory();
    }
  }, [isFocused]);

  const getStory = async () => {
    setisloading(true)
    AsyncStorage.getItem('contacts').then((value) => {
      if (value) {
        const contactsObj = JSON.parse(value);
        console.log('Contacts retrieved:', contactsObj);
        setContacts(contactsObj);
      }
    });

    const mynumber = await AsyncStorage.getItem('number');
    console.log("my number", mynumber)

    const contactsJson = await AsyncStorage.getItem('contactsArray');
    const contactsArray = JSON.parse(contactsJson);
    console.log('contactarray', contactsArray)

    const contactsMap = {};
    for (const contact of contactsArray) {
      contactsMap[contact.phoneNumber] = contact.name;
      // console.log("contact map", contactsMap)
    }
    // console.log("contact map", contactsMap)

    // Get All Story
    fetch(API_URL + 'getAllStory', requestOptions)
      .then(response => response.json())
      .then(result => {
        if (result.Status == true) {

          const allStories = result.user
            .filter(story => story.sender_id !== mynumber) // filter out my own story
            .filter(story => {
              const contactName = contactsMap[story.sender_id];
              // add conditions to filter out stories with unwanted names
              return contactName && (contactName !== "Name1" && contactName !== "Name2");
            })
            .map(story => {
              const contactName = contactsMap[story.sender_id];
              return {
                id: story._id,
                number: story.sender_id,
                pic: story.pic,
                content: story.text,
                type: story.video,
                isMyStory: false,
                name: contactName || story.sender_id
              };
            });

          setOtherStories(allStories);
          console.log("alll story", allStories)
          setisloading(false)

        }

      })
      .catch(error => console.log('error', error));



    // Get story Api
    var myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');

    var raw = JSON.stringify({
      sender_id: mynumber
    });

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };

    fetch(API_URL + 'getstory', requestOptions)
      .then(response => response.json())
      .then(result => {
        if (result.Status == true) {
          console.log("Result", result)
          console.log("totalviwers", result?.user[0]?.totalViewers)
          let totalViewsArray = [];

          for (let i = 0; i < result.user.length; i++) {
            totalViewsArray.push(result.user[i].totalViewers);
          }
          console.log(totalViewsArray);
          setSeen(totalViewsArray)

          const myStories = result.user.map(story => {
            return {
              id: story._id,
              pic: story.pic,
              content: story.text,
              type: story.video,
              isMyStory: true // set is MyStory to true for the user's own stories
            };
          });

          setMyStories(myStories);
          console.log("get story", myStories)
          setisloading(false)
        }

      })
      .catch(error => console.log('error', error));
  };



  const navigateToPreview = item => {
    navigation.navigate('StoryPreview', { isMyStory: true, image: item, views: seen });
  };
  const filteredStories = otherStories.filter(story =>
    story.name.toLowerCase().includes(searchQuery.toLowerCase())
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
            onChangeText={setSearchQuery}
          />

          <ScrollView>

            <View >
              {myStories.length === 0 ? (
                <TouchableOpacity onPress={() => navigation.navigate('Camera1')}>
                  <View style={styles.addStoryContainer}>
                    <Text style={styles.sectionHeaderText}>My Status</Text>
                    <Image style={styles.myImage}
                      source={require('../../../assets/Profile/Emptypic.png')} />
                    <Icon name='plus' size={30} color="darkblue" style={{ position: 'absolute', top: 80, left: 50 }} />

                    <Text style={{ position: 'absolute', left: 80, top: 70, fontWeight: 'bold', fontSize: 15 }}>Tap to add status</Text>
                  </View>
                </TouchableOpacity>
              ) : (
                <View>
                  <Text style={styles.sectionHeaderText}>My Status</Text>
                  <TouchableOpacity onPress={() => navigateToPreview(myStories)}>
                    {/* <Text  style={{position:'absolute', top:25, left:90, fontWeight:'bold', fontSize:18}}>My Status</Text> */}

                    {myStories[0]?.pic ? (
                      <Image source={{ uri: StoryPath + myStories[0].pic }} style={styles.myImage} />
                    ) : myStories[0]?.type?.endsWith('.mp4') ? (
                      <Video
                        source={{ uri: StoryPath + `${myStories[0].type}` + '.webm' }}
                        style={styles.myVideo}
                        resizeMode="cover"
                        muted={true}
                        paused={false}
                      />
                    ) : null}
                  </TouchableOpacity>
                </View>
              )}
            </View>
            <View>
              <Text style={styles.sectionHeaderText}>Others Status</Text>

              {filteredStories.reduce((acc, story) => {
                const existingStory = acc.find(s => s.number === story.number);
                if (existingStory) {
                  existingStory.items.push(story);
                } else {
                  acc.push({ number: story.number, items: [story], name: story.name });
                }
                return acc;
              }, []).map(container => (
                <View key={container.number}>
                  <Text style={{ position: 'absolute', top: 25, left: 90, fontWeight: 'bold', fontSize: 18, color: 'black' }}>{container.name}</Text>
                  {container.items.length > 0 && (
                    <TouchableOpacity onPress={() => navigation.navigate("otherStory", container)}>
                      {container.items[0].pic ? (
                        <Image source={{ uri: StoryPath + container.items[0].pic }} style={styles.otherImage} />
                      ) : container.items[0].type ? (
                        <Video source={{ uri: StoryPath + container.items[0].type + '.webm' }} style={styles.otherVideo} muted={true} />
                      ) : null}
                    </TouchableOpacity>
                  )}
                </View>
              ))}

            </View>

          </ScrollView>



          <TouchableOpacity
            onPress={() => navigation.navigate('Camera1')}
            style={styles.cameraIcon}
          >
            <Icon name="camera" size={25} color="yellow" />
          </TouchableOpacity>
        </>
      )}
    </View>





  );
};


export default StatusScreen;

const styles = StyleSheet.create({

  container: {
    flex: 1,
    marginTop: 10,
    marginBottom: 10,
    marginHorizontal: 10
  },
  cameraIcon: {
    position: 'absolute',
    bottom: 40,
    right: 20,
    backgroundColor: 'darkblue',
    borderRadius: 30,
    padding: 15,
    elevation: 10,
  },

  myImage: {
    width: 60,
    height: 60,
    borderRadius: 50,
    margin: 10,
    resizeMode: 'contain'
  },
  otherImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    margin: 5,
    marginLeft: 12
  },
  myVideo: {
    width: 60,
    height: 60,
    borderRadius: 50,
    margin: 10
  },
  otherVideo: {
    width: 60,
    height: 60,
    borderRadius: 30,
    margin: 10
  },
  sectionHeaderText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    color: 'black',
    marginLeft: 12
  },

});
