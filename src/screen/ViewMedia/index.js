import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Image, Text, Switch, ScrollView, TouchableOpacity, FlatList, Button } from 'react-native';
import { API_URL, ProfileImagesPath, ImagePath, VideoPath, DocumentPath } from '../../service';
import Video from 'react-native-video';
import AsyncStorage from '@react-native-async-storage/async-storage';
import IconBack from 'react-native-vector-icons/MaterialCommunityIcons';

const App = ({ navigation, route }) => {
    const [id, setId] = useState([])

    const renderMedia = () => {
        return id.map((chatMessage) => (
            <View key={chatMessage._id} style={styles.mediaWrapper}>
                {(chatMessage.image && (
                    <Image source={{ uri: ImagePath + chatMessage.image }} style={styles.mediaImage} />
                )) || (chatMessage.video && chatMessage.video.endsWith('.mp4') && (
                    <Video source={{ uri: VideoPath + chatMessage.video }} style={styles.mediaImage} muted={true} />
                )) || null}
            </View>
        ));
    };

    useEffect(() => {
        const renderMedia2 = async () => {
            const IDs = await AsyncStorage.getItem('id');
            const IDs2 = JSON.parse(IDs);
            console.log(IDs2);
            setId(IDs2)
            console.log("set id", id)
        }
        renderMedia2();
    }, []);

    return (
        <View style={styles.container}>
            <View style={{ flexDirection: 'row', marginTop: 10 }}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <IconBack name="keyboard-backspace" color="grey" size={40} style={{ height: 40, width: 40 }} />
                </TouchableOpacity>
            </View>
            <ScrollView contentContainerStyle={styles.scrollViewContent}>
                <View style={styles.mediaContainer}>{renderMedia()}</View>
            </ScrollView>
        </View>
    )
}

export default App;

const styles = StyleSheet.create({
    container2: {
        flex: 1,
        marginTop: 20,
    },
    container: {
        flex: 1,
        backgroundColor: '#fff',
        // alignItems: 'center',
        // justifyContent: 'center',
        marginTop: 10,
    },
    scrollViewContent: {
        paddingVertical: 20,
        paddingHorizontal: 10,
    },
    mediaContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    mediaWrapper: {
        width: 150,
        height: 150,
        marginHorizontal: 5,
        marginVertical: 10,
    },
    mediaImage: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
    },
})

