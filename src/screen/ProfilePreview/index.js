import React, { useState, useRef, useEffect } from 'react';
import { View, StyleSheet, Text, Image, Dimensions, TouchableOpacity, StatusBar } from 'react-native';
import IconBack from 'react-native-vector-icons/MaterialCommunityIcons';
import {ProfileImagesPath} from '../../service';
import { SafeAreaView } from 'react-native-safe-area-context';
import { DEVICE_HEIGHT as dh, DEVICE_WIDTH as dw } from '../../utils';

const ProfilePreview = ({ route, navigation }) => {
  const { image } = route.params;
  console.log('image', image);
  

  return (
    <SafeAreaView style={{
      flex:1,
      backgroundColor:'black'
    }}>
      <View style={styles.container}>
      <StatusBar
      backgroundColor={'black'}
      barStyle='default'
      />
      <TouchableOpacity
      onPress={() => navigation.goBack()}>
        <IconBack name="keyboard-backspace" color="grey" size={45} />
      </TouchableOpacity>     
        <Image source={{ uri: ProfileImagesPath+image }} style={[styles.image]} />
        </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    alignSelf: 'center',
    backgroundColor: 'black',
    // justifyContent:'center',

  },
  image: {
    marginTop:20,
    // resizeMode: 'contain',
    height:dh*0.8,
    width:dw
  },
});

export default ProfilePreview;
