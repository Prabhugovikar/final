import React, { useCallback, useEffect, useRef, useState } from 'react';
import { View, StyleSheet, Text, Image, Dimensions, TouchableOpacity, FlatList, StatusBar } from 'react-native';
import Video from 'react-native-video';
import { API_URL, IP, StoryPath } from '../../../service';
import AsyncStorage from '@react-native-async-storage/async-storage';
import IconBack from 'react-native-vector-icons/MaterialCommunityIcons';


const StoryPreviewScreen = ({ route, navigation }) => {
  const params = route?.params;
  const image = params.items;
  console.log('prams', params)
  const imageSize = {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height*0.8,
  };
  const flatListRef = useRef(null); 
  const [currentItemIndex, setCurrentItemIndex] = useState(0);

  const onViewableItemsChanged = useCallback(({ viewableItems }) => {
    if (viewableItems.length > 0) {
      const index = viewableItems[0].index;
      setCurrentItemIndex(index);
    }
  }, []);
  
  useEffect(() => {
    
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
    }, 10000);
  
    return () => clearInterval(intervalId);
  }, [currentItemIndex, image]);
  
  
  const handleImageRender = async (item) => {
    // Call your function with the current index here
    console.log('Image index:', item);
    const currentindex =item.id;
    const mynumber = await AsyncStorage.getItem('number');
    console.log("my number",mynumber);
    const mynumarray = mynumber.split();
    console.log("my array", mynumarray);
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
      
    var raw = JSON.stringify({
      "_id": currentindex,
      "seenuser_id": mynumarray      
    });
      
    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };
    console.log("raw",raw)
      
    fetch(API_URL+"updateViewers", requestOptions)
      .then(response => response.json())
      .then(result => console.log('viewresp',result))
      .catch(error => console.log('error', error));
  
  }
  
  const renderImage = useCallback(({ item, index }) => {
    if (item.pic !== undefined && item.pic.endsWith('.mp4') === false) {
      return (
        <Image source={{ uri: StoryPath + `${item.pic}` }} style={[styles.image, imageSize]} onLoad={() => handleImageRender(image[index])} />
      );
    } else if (item.type !== undefined && item.type.endsWith('.mp4')) {
      return (
        <Video
          source={{ uri: StoryPath + `${item.type}` + '.webm' }}
          style={[styles.image1, imageSize]}
          resizeMode={'contain'}
          paused={false}
          onEnd={() => handleImageRender(index)}
        />
      );
    }
  }, []);
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
  
  
  return (
    <View style={styles.container}>
      <StatusBar
      backgroundColor={'black'}
      barStyle='default'
      />
      <StatusLines count={image.length} currentItemIndex={currentItemIndex}/>
      <TouchableOpacity onPress={() => navigation.goBack()}>
      <IconBack name="keyboard-backspace" color="grey" size={45} style={{marginTop:5}}/>
      </TouchableOpacity>
      <Text style={styles.text}>{params.name}</Text>
      <FlatList
        ref={flatListRef}
        data={image}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item, index }) => renderImage({ item, index })}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onViewableItemsChanged={onViewableItemsChanged}
      />
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
    marginTop:10,
    // resizeMode: 'contain',
  },
  statusLines: {
    flexDirection: 'row',
    height: 2,
    marginTop: 10,
  },
  image1:{
    resizeMode:'cover',
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
    position: 'absolute',
    top: 25,
    alignSelf: 'center',
  },
});

export default StoryPreviewScreen;
