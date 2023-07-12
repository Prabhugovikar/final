import React, { useState,useCallback,useEffect,useRef } from 'react';
import { View, StyleSheet, Text, Image, Dimensions, TouchableOpacity, FlatList, ScrollView, StatusBar, ActivityIndicator} from 'react-native';
import Video from 'react-native-video';
import { API_URL, IP, StoryPath } from '../../../service';
import Icon from 'react-native-vector-icons/AntDesign';
import AsyncStorage from '@react-native-async-storage/async-storage';
import IconBack from 'react-native-vector-icons/MaterialCommunityIcons';

const StoryPreviewScreen = ({ route, navigation, }) => {
const[profiledata,setprofiledata] = useState([]);
const [currentItemIndex, setCurrentItemIndex] = useState(0);
const [mynumberArray, setmynumberArray]=useState([]);
const [seen, setSeen] = useState([]);
const [id,setid]= useState('');
const [isloading, setisloading] = useState(true)


const { image, isMyStory , views} = route.params || {};
  console.log('pic',image[0].id)
   const imageSize = {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height*0.8,
  };

  const flatListRef = useRef(null); 

  const onViewableItemsChanged = useCallback(({ viewableItems }) => {
    if (viewableItems.length > 0) {
      const index = viewableItems[0].index;
      setCurrentItemIndex(index);
    }
  }, []);

useEffect (()=>{
  const getdata = async () => { 
  const mynumber = await AsyncStorage.getItem('number');
    console.log("my number",mynumber)
    
    setmynumberArray(mynumber)
    setisloading(false)
  }
  getdata();
  const intervalId = setInterval(() => {
    if (currentItemIndex < image.length - 1) {
      flatListRef.current.scrollToIndex({
        index: currentItemIndex + 1,
        animated: true,
      });
    } else {
      clearInterval(intervalId);
      navigation.goBack();
    }
  }, 15000);

  return () => clearInterval(intervalId);
},[currentItemIndex, image])


  const deleteStory = (id) => {
    setisloading(true)
      console.log("id image",id)

      var myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");

      var raw = JSON.stringify({
        "_id": id
      });

      var requestOptions = {
        method: 'DELETE',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
      };

      fetch("http://212.47.226.119:4002/deleteStory", requestOptions)
        .then(response => response.json())
        .then(result =>{ console.log(result)
        if(result.Status==true)
        {
          setisloading(false)
          navigation.navigate('Home');
        }
        })
        .catch(error => console.log('error', error));

  }

   const handleViewPress = (id) => {
            navigation.navigate('Viewers',id);
            console.log("id" , id)
      };

      const StatusLines = ({ count, currentItemIndex }) => {
        const lines = [];
        for (let i = 0; i < count; i++) {
          lines.push(
            <View
              key={i}
              style={{
                flex: 1,
                backgroundColor: i <= currentItemIndex ? '#FFF' : 'rgba(255, 255, 255, 0.5)',
                marginHorizontal: 2,
                borderRadius: 2,
                transitionProperty: 'background-color',
                transitionDuration: '1s',
              }}
            />,
          );
        }
      
        return <View style={styles.statusLines}>{lines}</View>;
      };
  

  const renderImage = ({ item }) => {
    console.log("item",item)
    const { pic, type } = item;
    const media = pic || type;
 
    if (media !== undefined && media.endsWith('.mp4') === false) {
      return (
        <View>
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',marginTop:0 }}>
  <TouchableOpacity onPress={() => navigation.goBack()} style={{ height: 40, width: 40 }}>
    <IconBack name="keyboard-backspace" color="#ffffff" size={50} />
  </TouchableOpacity>
  <Text style={styles.name1}>My Status</Text>
  <TouchableOpacity onPress={() => deleteStory(item.id)} style={{ height: 40, width: 40,marginTop:30 }}>
    <Icon name="delete" size={25} color="#ffffff" />
  </TouchableOpacity>
</View>


        <View>
          <Image
            source={{ uri: StoryPath + `${media}` }}
            style={[styles.image, imageSize]}
          />
          {item.views !== undefined && (
            <View>
         <TouchableOpacity onPress={() => handleViewPress(item.id)} style={styles.viewsContainer}>
         <Icon name="eye" size={16} color="#ffffff" />
         {/* <Text style={styles.viewsText}>{`${item.views-1} views`}</Text> */}
         <Text style={styles.viewsText}>
  {item.views==null || item.views== '0'? `0 views` :  `${item.views} views`}
</Text>

             </TouchableOpacity>
         
     </View>
     
          )}
        </View>
        </View>
      );
    } else if (media !== undefined && media.endsWith('.mp4')) {
      return (
        <View>
             <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',marginTop:30}}>
  <TouchableOpacity onPress={() => navigation.goBack()} style={{ height: 40, width: 40 }}>
    <IconBack name="keyboard-backspace" color="#ffffff" size={50} />
  </TouchableOpacity>
  <Text style={styles.name1}>My Status</Text>
  <TouchableOpacity onPress={() => deleteStory(item.id)} style={{ height: 40, width: 40,marginTop:30}}>
    <Icon name="delete" size={25} color="#ffffff" />
  </TouchableOpacity>
</View>

          <Video
            source={{ uri: StoryPath + `${media}` + '.webm' }}
            style={[styles.image1, imageSize]}
            resizeMode={'contain'}
            paused={false}
          />
          {item.views !== undefined && (
            <TouchableOpacity onPress={() => handleViewPress(item.id)} style={styles.viewsContainer}>
            <Icon name="eye" size={16} color="#ffffff" />
            {/* <Text style={styles.viewsText}>{`${item.views-1} views`}</Text> */}
                    <Text style={styles.viewsText}>
          {item.views==null || item.views== '0'? `0 views` :  `${item.views-1} views`}
        </Text>
        </TouchableOpacity>
        
          )}
        </View>
      
      );
    }
  };
  
    return (
    
    <View style={styles.container}>
      <StatusBar
      backgroundColor={'black'}
      barStyle='default'
      />
      <StatusLines count={image.length} currentItemIndex={currentItemIndex} />
      {isloading ? (
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator color={"#ffffff"} size={'large'} />
      </View>
    ) : (
      <>
      <ScrollView>
    <FlatList
      ref={flatListRef}
      data={image.map((item, index) => ({ ...item, views: views[index] ,index}))}
      keyExtractor={(item, index) => index.toString()}
      renderItem={({ item, index }) => renderImage({ item, index })}
      horizontal
      pagingEnabled
      showsHorizontalScrollIndicator={false}
      onViewableItemsChanged={onViewableItemsChanged}
    />
    </ScrollView>
     </>
     )}
  </View>
);
  
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'black',
  },
  image: {
    // resizeMode: 'contain',
    // width: Dimensions.get('window').width,
    // height: Dimensions.get('window').height,
  },
  image1:{
    width: Dimensions.get('window').width,
    // height: Dimensions.get('window').height,
  },
  statusLines: {
    flexDirection: 'row',
    height: 2,
    marginTop: 10,
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
    position: 'absolute',
    top: 50,
    alignSelf: 'center',
  },
  viewsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    position: 'absolute',
    justifyContent:'center',
    bottom: 20,
    left: 150,
  },
  viewsText: {
    alignItems:'center',
    color: '#ffffff',
    fontSize: 20,
    marginLeft: 4,
  },
  name1: {
    marginTop:13,
    fontSize: 25,
    fontWeight: 'bold',
    marginLeft: 0,
    color:'white',
  },
});

export default StoryPreviewScreen;

