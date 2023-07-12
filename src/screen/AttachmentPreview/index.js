import React, { useState } from 'react';
import { View, Image, TouchableOpacity, Text, ActivityIndicator, StatusBar } from 'react-native';
import Video from 'react-native-video';
import PDFView from 'react-native-view-pdf';
import {API_URL, socket} from '../../service';
import IconBack from 'react-native-vector-icons/MaterialCommunityIcons';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function AttachmentPreview({ route, navigation }) {
    const { image, video, document, room_id, names, sender_id } = route.params;
    // console.log('name', document[0].name)
    const [isloading, setisloading] = useState(false);
   const uploadImage = async (navigation) => {
        setisloading(true)
        const photo = { uri : image.assets[0].uri,
            type : image.assets[0].type,
            name: image.assets[0].fileName,
      };

        var formdata = new FormData();
        formdata.append("room_id", room_id);
        formdata.append("senderName", names);
        formdata.append("sender_id", sender_id);
        formdata.append("gallery", photo);

        var requestOptions = {
        method: 'POST',
        body: formdata,
        redirect: 'follow'
        };
        // console.log('formdata before going into fetch',requestOptions)

        await fetch(API_URL+"imageupload", requestOptions)
        .then(response => response.json())
        .then(result => {
            console.log(result.result[0])
            if(result.status==='Success'){
                setisloading(false)
                socket.emit('user gallery',result.result[0])
                socket.emit('groupimage',result.result[0])
                navigation.goBack()
            }
            else{
                console.log(result)
            }
        })
        .catch(error => console.log('error', error));
    }

    const uploadVideo = async (navigation) => {
        setisloading(true)
        const videos = { uri : video.assets[0].uri,
            type : video.assets[0].type,
            name: video.assets[0].fileName,
      };

        var formdata = new FormData();
        formdata.append("sender_id", sender_id);
        formdata.append("senderName", names);
        formdata.append("gallery", videos);
        formdata.append("room_id", room_id);
        // formdata.append("message", this.state.chatMessage);

        var requestOptions = {
        method: 'POST',
        body: formdata,
        redirect: 'follow'
        };

        await fetch(API_URL+"videoupload", requestOptions)
        .then(response => response.json())
        .then(result => {
            console.log(result)
            if(result.status==='Success'){
                setisloading(false)
                socket.emit('user video',result.result[0])
                socket.emit('groupvideo',result.result[0])

                navigation.goBack()
            }
            else{
                console.log(result)
            }
        })
        .catch(error => console.log('error', error));
    }

    const uploadDocument = async () => {
        setisloading(true)
        const docs = { uri : document[0].uri,
            type : document[0].type,
            name: document[0].name,
        };
        
        var formdata = new FormData();
        formdata.append("sender_id", sender_id);
        formdata.append("senderName", names);
        formdata.append("document_file", docs );
        formdata.append("room_id", room_id);
        // formdata.append("message", chatMessage);

        var requestOptions = {
        method: 'POST',
        body: formdata,
        redirect: 'follow'
        };

        await fetch(API_URL+"documentfileupload", requestOptions)
        .then(response => response.json())
        .then(result => { console.log(result)
            if(result.status ==='Success'){
                setisloading(false)
                socket.emit('user document',result.result);
                socket.emit('groupdocument',result.result);

                navigation.goBack()
              }
            else {
              console.log(result)
            }

        })
        .catch(error => console.log('error', error));

    }
    
    
    if (image) {
        return (
            <SafeAreaView style={{
                flex:1,
                backgroundColor:'black'}}>
                    <StatusBar
                    translucent={false}
                    backgroundColor={'black'}
                    barStyle='default'
                    animated={true}
                    
                />
                   
            <View style={{
                flex:1,
                // backgroundColor:'black'
            }}>
                <View style={{flexDirection:'row',marginTop:12}}>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                    <IconBack name="keyboard-backspace" color="white" size={40} style={{ height: 40, width: 40}} />
                    </TouchableOpacity>
                    <Text style={{
                        marginTop:3,
                        fontSize: 25,
                        fontWeight: 'bold',
                        marginLeft: 25,
                        color:'white'
                    }}>Photo</Text>
                </View>
                {isloading ? (
                        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                        <ActivityIndicator color={"#ffffff"} size={'large'} />
                    </View>
                    ) : (
                    <>
                <Image source={{ uri: image.assets[0].uri }} style={{ width: '100%', height: 570, alignSelf: 'center', marginTop:20 }} />
                <TouchableOpacity onPress={()=>uploadImage(navigation)}
                style={{
                    position:'absolute',
                    bottom:15,
                    right:15,
                    backgroundColor: '#fff',
                    borderRadius: 90,
                    padding: 5,
                    elevation: 10,
                }}>
                    <Image
                        source={require('../../assets/Images2/send4.png')}
                        style={{ height: 45, width: 45 }}
                    />
                </TouchableOpacity>
                </>
            )}
            </View>
            
            </SafeAreaView>
        );
    } else if (video) {
        return (
            <SafeAreaView style={{flex:1, backgroundColor:'black'}}>
                <StatusBar
                    translucent={false}
                    backgroundColor={'black'}
                    barStyle='default'
                    animated={true}
                    
                />
            <View style={{
                flex:1}}>
                    <View style={{flexDirection:'row',marginTop:12}}>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                    <IconBack name="keyboard-backspace" color="white" size={40} style={{ height: 40, width: 40}} />
                    </TouchableOpacity>
                    <Text style={{
                        marginTop:3,
                        fontSize: 25,
                        fontWeight: 'bold',
                        marginLeft: 25,
                        color:'white'
                    }} >Video</Text>
                </View>
                {isloading ? (
                        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                        <ActivityIndicator color={"#ffffff"} size={'large'} />
                    </View>
                    ) : (
                    <>
                <Video source={{ uri: video.assets[0].uri }}
                        paused={true}
                        resizeMode={'contain'}
                        controls={true}
                 style={{ 
                    width: 300, 
                    height: 550, 
                    alignSelf:'center', 
                    marginTop:50 }} />
                <TouchableOpacity onPress={() => uploadVideo(navigation)}
                style={{
                    position:'absolute',
                    bottom:15,
                    right:15,
                    backgroundColor: '#fff',
                    borderRadius: 90,
                    padding: 5,
                    elevation: 10,
                }}>
                    <Image
                        source={require('../../assets/Images2/send4.png')}
                        style={{ height: 45, width: 45 }}
                    />
                </TouchableOpacity>
                </>
            )}
            </View>
            
            </SafeAreaView>
        );
    } else if (document) {
        return (
            <SafeAreaView style={{flex:1, backgroundColor:'black'}}>
                 <StatusBar
                    translucent={false}
                    backgroundColor={'black'}
                    barStyle='default'
                    animated={true}
                    
                />
            <View style={{
                flex:1,
                backgroundColor:'black'}}>
                    <View style={{flexDirection:'row',marginTop:12}}>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                    <IconBack name="keyboard-backspace" color="white" size={40} style={{ height: 40, width: 40}} />
                    </TouchableOpacity>
                    <Text style={{
                        marginTop:3,
                        fontSize: 25,
                        fontWeight: 'bold',
                        marginLeft: 25,
                        color:'white'
                    }} >{document[0].name}</Text>
                </View>
                {isloading ? (
                        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                        <ActivityIndicator color={"#ffffff"} size={'large'} />
                    </View>
                    ) : (
                    <>
                <PDFView
                source={{uri: document[0].uri}}
            
                    // source={{ uri: document[0].uri }}
                    style={{ width: 300, height: 550, alignSelf:'center', marginTop:50 }}
                />
                <TouchableOpacity onPress={() => uploadDocument(navigation)} 
                style={{
                    position:'absolute',
                    bottom:25,
                    right:20
                }}>
                    <Image
                        source={require('../../assets/Images2/send4.png')}
                        style={{ height: 40, width: 40 }}
                    />
                </TouchableOpacity>
                </>
                )}
            </View>
            
            </SafeAreaView>
        );
    }

};
