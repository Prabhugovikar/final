import React, { useEffect, Component } from 'react';
import {
    View,
    TouchableOpacity,
    Image,
    StatusBar,
    Text,
    TextInput,
    ScrollView,
    KeyboardAvoidingView,
    ImageBackground,
    Pressable,
    Modal,
    Alert,
    StyleSheet
} from 'react-native';
//import APP_STORE from '../../storage';
import {
    DEVICE_HEIGHT as dh,
    DEVICE_WIDTH as dw,
    STRING_VALIDATION,
} from '../../utils';
import { Const_Images, Com_color, Com_font } from '../../constants';
import Toolbar from '../../templates/Toolbar';
import FingerprintScanner from 'react-native-fingerprint-scanner';
import ToastMsg from '../../templates/ToastMessage';
import Iconadd from 'react-native-vector-icons/MaterialIcons';
import Iconsfooter from 'react-native-vector-icons/SimpleLineIcons';
import { Container, Picker } from 'native-base';
import io from 'socket.io-client';
import Video from 'react-native-video';
import { BottomSheet } from 'react-native-elements';
import IconBack from 'react-native-vector-icons/MaterialCommunityIcons';
import IconDot from 'react-native-vector-icons/Entypo';
import Iconclose from 'react-native-vector-icons/AntDesign';

import { TimePicker } from 'react-native-simple-time-picker';
import { launchImageLibrary, launchCamera } from 'react-native-image-picker';
import { PermissionsAndroid, Linking } from 'react-native';
import DocumentPicker from 'react-native-document-picker';
import MapView, { Marker } from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';
import openMap from 'react-native-open-maps';
import Icon from 'react-native-vector-icons/FontAwesome';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { socket, API_URL, IP, ImagePath, VideoPath, DocumentPath, ProfileImagesPath } from '../../service';
import { Menu, MenuOptions, MenuOption, MenuTrigger, MenuProvider } from 'react-native-popup-menu';
import CheckBox from 'react-native-check-box';
import RNRestart from 'react-native-restart';
import Sound from 'react-native-sound';
import { AudioRecorder, AudioUtils } from 'react-native-audio';
import RNFS from 'react-native-fs';
import EmojiSelector, { Categories } from "react-native-emoji-selector";

class ChatRoom extends Component {
    scrollViewRef = React.createRef();
    constructor(props) {
        super(props);
        this.state = {
            selectedMessageIds: [],
            isRecording:false,
            _id:'',
            groupPic:'',
            isDisabled: false,
            currentVideoIndex: null,
            isPlaying: false,
            currentAudio: null,
            getmsg: [],
            sender_id: '',
            otherNum:'',
            room_id: '',
            names: '',
            contactname:'',
            result: '',
            search: '',
            modalVisible: false,
            modalVisible2: false,
            image: '',
            filePath: '',
            image: '',
            audio: '',
            doc: {},
            contact: null,
            contacts: [],
            location: null,
            isOpen:false,
            region: {
                latitude: 37.78825,
                longitude: -122.4324,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
            },
            Activated: false,
            ProfileName: '',
            chatMessage: '',
            seen: true,
            isVisible: false,
            hours: 10,
            minutes: 20,
            H_selectedcat: '',
            M_selectedcat: '',
            S_selectedcat: '',
            chatMessages: [

                // { id: 0, msg: '', img: '', v: '' },
            ],
            chatMessages2: [],
            chatMessages4: [],
            data2: '',
            selected: false,
            isMounted: false,
            group: '',
            image: '',
            theme: '',

            housrArr: [
                {
                    itemName: '00',
                },
                {
                    itemName: '01',
                },
                {
                    itemName: '02',
                },
                {
                    itemName: '03',
                },
                {
                    itemName: '04',
                },
                {
                    itemName: '05',
                },
                {
                    itemName: '06',
                },
                {
                    itemName: '07',
                },
                {
                    itemName: '08',
                },
                {
                    itemName: '09',
                },
                {
                    itemName: '10',
                },
                {
                    itemName: '11',
                },
                {
                    itemName: '12',
                },
                {
                    itemName: '13',
                },
                {
                    itemName: '14',
                },
                {
                    itemName: '15',
                },
                {
                    itemName: '16',
                },
                {
                    itemName: '17',
                },
                {
                    itemName: '18',
                },
                {
                    itemName: '19',
                },
                {
                    itemName: '20',
                },
                {
                    itemName: '21',
                },
                {
                    itemName: '22',
                },
                {
                    itemName: '23',
                },
                {
                    itemName: '24',
                },
            ],
            minutesArr: [
                {
                    itemName: '00',
                },
                {
                    itemName: '01',
                },
                {
                    itemName: '02',
                },
                {
                    itemName: '03',
                },
                {
                    itemName: '04',
                },
                {
                    itemName: '05',
                },
                {
                    itemName: '06',
                },
                {
                    itemName: '07',
                },
                {
                    itemName: '08',
                },
                {
                    itemName: '09',
                },
                {
                    itemName: '10',
                },
                {
                    itemName: '11',
                },
                {
                    itemName: '12',
                },

                {
                    itemName: '13',
                },
                {
                    itemName: '14',
                },
                {
                    itemName: '15',
                },
                {
                    itemName: '16',
                },
                {
                    itemName: '17',
                },
                {
                    itemName: '18',
                },
                {
                    itemName: '19',
                },
                {
                    itemName: '20',
                },
                {
                    itemName: '21',
                },
                {
                    itemName: '22',
                },
                {
                    itemName: '23',
                },
                {
                    itemName: '24',
                },
                {
                    itemName: '25',
                },
                {
                    itemName: '26',
                },
                {
                    itemName: '27',
                },
                {
                    itemName: '28',
                },
                {
                    itemName: '29',
                },
                {
                    itemName: '30',
                },
                {
                    itemName: '31',
                },
                {
                    itemName: '32',
                },
                {
                    itemName: '33',
                },
                {
                    itemName: '34',
                },
                {
                    itemName: '35',
                },
                {
                    itemName: '36',
                },
                {
                    itemName: '37',
                },
                {
                    itemName: '38',
                },
                {
                    itemName: '39',
                },
                {
                    itemName: '40',
                },
                {
                    itemName: '41',
                },
                {
                    itemName: '42',
                },
                {
                    itemName: '43',
                },
                {
                    itemName: '44',
                },
                {
                    itemName: '45',
                },
                {
                    itemName: '46',
                },
                {
                    itemName: '47',
                },
                {
                    itemName: '48',
                },
                {
                    itemName: '49',
                },
                {
                    itemName: '50',
                },
                {
                    itemName: '51',
                },
                {
                    itemName: '52',
                },
                {
                    itemName: '53',
                },
                {
                    itemName: '54',
                },
                {
                    itemName: '55',
                },
                {
                    itemName: '56',
                },
                {
                    itemName: '57',
                },
                {
                    itemName: '58',
                },
                {
                    itemName: '59',
                },
            ],
            secArr: [
                {
                    itemName: '00',
                },
                {
                    itemName: '01',
                },
                {
                    itemName: '02',
                },
                {
                    itemName: '03',
                },
                {
                    itemName: '04',
                },
                {
                    itemName: '05',
                },
                {
                    itemName: '06',
                },
                {
                    itemName: '07',
                },
                {
                    itemName: '08',
                },
                {
                    itemName: '09',
                },
                {
                    itemName: '10',
                },
                {
                    itemName: '11',
                },
                {
                    itemName: '12',
                },

                {
                    itemName: '13',
                },
                {
                    itemName: '14',
                },
                {
                    itemName: '15',
                },
                {
                    itemName: '16',
                },
                {
                    itemName: '17',
                },
                {
                    itemName: '18',
                },
                {
                    itemName: '19',
                },
                {
                    itemName: '20',
                },
                {
                    itemName: '21',
                },
                {
                    itemName: '22',
                },
                {
                    itemName: '23',
                },
                {
                    itemName: '24',
                },
                {
                    itemName: '25',
                },
                {
                    itemName: '26',
                },
                {
                    itemName: '27',
                },
                {
                    itemName: '28',
                },
                {
                    itemName: '29',
                },
                {
                    itemName: '30',
                },
                {
                    itemName: '31',
                },
                {
                    itemName: '32',
                },
                {
                    itemName: '33',
                },
                {
                    itemName: '34',
                },
                {
                    itemName: '35',
                },
                {
                    itemName: '36',
                },
                {
                    itemName: '37',
                },
                {
                    itemName: '38',
                },
                {
                    itemName: '39',
                },
                {
                    itemName: '40',
                },
                {
                    itemName: '41',
                },
                {
                    itemName: '42',
                },
                {
                    itemName: '43',
                },
                {
                    itemName: '44',
                },
                {
                    itemName: '45',
                },
                {
                    itemName: '46',
                },
                {
                    itemName: '47',
                },
                {
                    itemName: '48',
                },
                {
                    itemName: '49',
                },
                {
                    itemName: '50',
                },
                {
                    itemName: '51',
                },
                {
                    itemName: '52',
                },
                {
                    itemName: '53',
                },
                {
                    itemName: '54',
                },
                {
                    itemName: '55',
                },
                {
                    itemName: '56',
                },
                {
                    itemName: '57',
                },
                {
                    itemName: '58',
                },
                {
                    itemName: '59',
                },
            ],
        };
        this.deleteOneMessage = this.deleteOneMessage.bind(this);
        this.deleteManyMessage = this.deleteManyMessage.bind(this);
        this.openGallery = this.openGallery.bind(this);
        this.pickDocument = this.pickDocument.bind(this);
        this.pickAudioFiles = this.pickAudioFiles.bind(this);
        this.handlePress = this.handlePress.bind(this);
        this.openCamera = this.openCamera.bind(this);

    }


    async componentDidMount() {
        this.scrollViewRef.current?.scrollToEnd({ animated: true });
        this.state.names = await AsyncStorage.getItem('username');
        this.state.sender_id = await AsyncStorage.getItem('number')
        console.log(this.state.names);

        const storedTheme = await AsyncStorage.getItem('theme');
        if (storedTheme) {
            this.setState({
                theme: storedTheme
            });
        }

        const { navigation, route } = this.props;
        const contactName = route?.params?.contactName;
        const contactName2 = route?.params?.userName;
        const group = route.params;
        console.log('group', group)

        this.setState({ group: { ...this.state.group, ...group } });
        if (group.status === 'Success') {
      
        this.setState({ ProfileName:group.result.groupName,
            groupPic:group.result.group_profile_img,
            room_id:group.result.room_id,
            _id:group.result._id

        });
        AsyncStorage.setItem('roomid', this.state._d);
        console.log("roomid1", this.state._id)
        
        }
        else {
            this.setState({ ProfileName:group.groupName,
                groupPic:group.group_profile_img,
                room_id:group.room_id,
                _id:group._id
                
            });
            AsyncStorage.setItem('roomid', this.state._id);
            console.log("roomid2", this.state._id )
        }

        // console.log('group', group)
        // const ProfileName =
        //     contactName == 'undefined'
        //         ? contactName
        //         : contactName2 || contactName2 == 'undefined'
        //             ? contactName2
        //             : contactName;
        

        this.Finger_print();

        // this.socket = io("http://127.0.0.1:3000");
        socket.on('groupmessage', (data) => {
            // socket.emit('groupmessage', data)
            console.log('message', data)
            this.setState({
                chatMessages: [...this.state.chatMessages, data]
            });
        })

        socket.on('groupimage', (data) => {
            // socket.emit('groupmessage', data)
            console.log('image', data)
            this.setState({
                chatMessages: [...this.state.chatMessages, data]
            });
        })

        socket.on('groupvideo', (data) => {
            // socket.emit('groupmessage', data)
            console.log('video', data)
            this.setState({
                chatMessages: [...this.state.chatMessages, data]
            });
        })

        socket.on('groupaudio', (data) => {
            // socket.emit('groupmessage', data)
            console.log('audio', data)
            this.setState({
                chatMessages: [...this.state.chatMessages, data]
            });
        })

        socket.on('groupdocument', (data) => {
            // socket.emit('groupmessage', data)
            console.log('document', data)
            this.setState({
                chatMessages: [...this.state.chatMessages, data]
            });
        })

                var requestOptions = {
            method: 'GET',
            redirect: 'follow'
          };
          
          fetch(API_URL+"getmsggroup/"+ this.state.room_id, requestOptions)
            .then(response => response.json())
            .then(result => {
                console.log(result)
                if (result.status === "Success") {
                    for (let i = 0; i < result.result.length; i++) {
                        this.state.chatMessages.push(result.result[i]);
                    }
                    console.log(this.state.chatMessages)
                    this.setState(prevState => ({
                        chatMessages4: [...prevState.chatMessages4, ...result.result]
                    }));
                } else {
                    console.log(result)
                }
            })
            .catch(error => console.log('error', error));
    }

    componentDidUpdate() {
        // Scroll to the bottom whenever the component updates
        this.scrollViewRef.current?.scrollToEnd({ animated: true });
      }

    
    GetMedia() {
        var requestOptions = {
            method: 'GET',
            redirect: 'follow'
        };
        fetch(API_URL + "getmsggroup/" + this.state.room_id, requestOptions)
            .then(response => response.json())
            .then(result => {
                console.log(result)
                if (result.status === "Success") {
                    // for (let i = 0; i < result.result.length; i++) {
                    //     this.state.chatMessages.push(result.result[i]);
                    // }
                    console.log(this.state.chatMessages)
                    this.setState(prevState => ({
                        chatMessages4: [...prevState.chatMessages4, ...result.result]
                    }));
                } else {
                    console.log(result)
                }
            })
            .catch(error => console.log('error', error));
    }

    openGallery() {
        let options = {
            mediaType: 'mixed',
            maxWidth: 300,
            maxHeight: 550,
            quality: 1,
            videoQuality: 'low'
        };
        launchImageLibrary(options, async (response) => {
            console.log('Response = ', response);
            this.state.image=response;
            // if (response.assets[0].type === 'image/jpeg' || response.assets[0].type === 'image/png') {
            //     // Call image upload API
            //     // this.uploadImage();
            //   } else if (response.assets[0].type === 'video/mp4') {
            //     // Call video upload API
            //     // this.uploadVideo();                    
            //   }
            if (response.assets[0].type === 'image/jpeg' || response.assets[0].type === 'image/png') {
                // Call image upload API
                // this.uploadImage();
                // Navigate to Preview screen with the selected image
                this.props.navigation.navigate('AttachmentPreview',
                 {  image: response, 
                    room_id : this.state.room_id,
                    names : this.state.names,
                    sender_id : this.state.sender_id    
                });
            } else if (response.assets[0].type === 'video/mp4') {
                // Call video upload API
                // this.uploadVideo();
                // Navigate to Preview screen with the selected video
                this.props.navigation.navigate('AttachmentPreview', 
                {   video: response,
                    room_id : this.state.room_id,
                    names : this.state.names,
                    sender_id : this.state.sender_id 
                });
            }
              

            if (response.didCancel) {
                console.log('User cancelled image picker');
            } else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            } else if (response.customButton) {
                console.log('User tapped custom button: ', response.customButton);
            } else {
                this.setState({
                    filePath: response,
                    // image: response.uri,
                    modalVisible: false
                });
               
            }
        });
    }

    async uploadImage() {

        const photo = { uri : this.state.image.assets[0].uri,
            type : this.state.image.assets[0].type,
            name: this.state.image.assets[0].fileName,
      };

            var formdata = new FormData();
            formdata.append("room_id", this.state.room_id);
            formdata.append("senderName", this.state.names);
            formdata.append("sender_id", this.state.sender_id);
            formdata.append("gallery", photo);
            
            var requestOptions = {
                method: 'POST',
                body: formdata,
                redirect: 'follow'
            };
            
            fetch(API_URL +"imageuploadgroup", requestOptions)
                .then(response => response.json())
                .then(result =>{
                     console.log(result)
                     if(result.status==='Success'){
                        socket.emit('groupimage',result.result)
                    }
                    else{
                        console.log(result)
                    }
                    })
                .catch(error => console.log('error', error));
    }

    async uploadVideo() {
        const video = { uri : this.state.image.assets[0].uri,
            type : this.state.image.assets[0].type,
            name: this.state.image.assets[0].fileName,
      };

            var formdata = new FormData();
            formdata.append("sender_id", this.state.sender_id);
            formdata.append("senderName", this.state.names);
            formdata.append("gallery", video);
            formdata.append("room_id", this.state.room_id);
            
            var requestOptions = {
                method: 'POST',
                body: formdata,
                redirect: 'follow'
            };
            
            fetch(API_URL+"videouploadgroup", requestOptions)
                .then(response => response.json())
                .then(result =>{
                     console.log(result)
                     if(result.status==='Success'){
                        socket.emit('groupvideo',result.result)
                    }
                    else{
                        console.log(result)
                    }
                    })
                .catch(error => console.log('error', error));
    }

    async openCamera() {
        const grantedcamera = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.CAMERA,
            {
                title: "App Camera Permission",
                message: "App needs access to your camera ",
                buttonNeutral: "Ask Me Later",
                buttonNegative: "Cancel",
                buttonPositive: "OK"
            }
        );
        const grantedstorage = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
            {
                title: "App Camera Permission",
                message: "App needs access to your camera ",
                buttonNeutral: "Ask Me Later",
                buttonNegative: "Cancel",
                buttonPositive: "OK"
            }
        );
        if (grantedcamera === PermissionsAndroid.RESULTS.GRANTED && grantedstorage === PermissionsAndroid.RESULTS.GRANTED) {
            console.log("Camera & storage permission given");

            let options = {
                mediaType: 'photo',
                maxWidth: 300,
                maxHeight: 550,
                quality: 1,
            };
            launchCamera(options, (response) => {
                console.log('Response = ', response);
                if (response.didCancel) {
                    console.log('User cancelled camera');
                } else if (response.error) {
                    console.log('Camera Error: ', response.error);
                } else if (response.customButton) {
                    console.log('User tapped custom button: ', response.customButton);
                } else {
                    this.state.image=response;
                    // this.setState({
                    //     filePath: response,
                    //     image: response.uri,
                    //     modalVisible: false,
                    // });
                    this.setState({
                        filePath: response,
                        // image: response.uri,
                        modalVisible: false
                    });
                    if (response.assets[0].type === 'image/jpeg' || response.assets[0].type === 'image/png') {
                        // Call image upload API
                        // this.uploadImage();
                        // Navigate to Preview screen with the selected image
                        this.props.navigation.navigate('AttachmentPreview',
                         {  image: response, 
                            room_id : this.state.room_id,
                            names : this.state.names,
                            sender_id : this.state.sender_id    
                        });
                    } else if (response.assets[0].type === 'video/mp4') {
                        // Call video upload API
                        // this.uploadVideo();
                        // Navigate to Preview screen with the selected video
                        this.props.navigation.navigate('AttachmentPreview', 
                        {   video: response,
                            room_id : this.state.room_id,
                            names : this.state.names,
                            sender_id : this.state.sender_id 
                        });
                    }
                }
            });
           
        } else {
            console.log("Camera permission denied");
        }
    }

    async pickDocument() {
        try {
            const result = await DocumentPicker.pick({
                type: [DocumentPicker.types.allFiles],
            });
            console.log(
                result
            );
            this.state.doc=result;
            this.setState({
                // image: response.uri,
                modalVisible: false
            });
            // this.setState({
            //     modalVisible: false
            // });
            // this.uploadDocument();
            this.props.navigation.navigate('AttachmentPreview', 
            {   document: result,
                room_id : this.state.room_id,
                names : this.state.names,
                sender_id : this.state.sender_id
            });
        } catch (err) {
            if (DocumentPicker.isCancel(err)) {
                console.log('User cancelled document picker');
            } else {
                throw err;
            }
        }
        
    }

    async uploadDocument() {
        const docs = { uri : this.state.doc[0].uri,
            type : this.state.doc[0].type,
            name: this.state.doc[0].name,
        };
        
        var formdata = new FormData();
        formdata.append("sender_id", this.state.sender_id);
        formdata.append("senderName", this.state.names);
        formdata.append("document_file", docs);
        formdata.append("room_id", this.state.room_id);
        
        var requestOptions = {
          method: 'POST',
          body: formdata,
          redirect: 'follow'
        };
        
        fetch(API_URL + "documentfileuploadgroup", requestOptions)
          .then(response => response.json())
          .then(result => {
            console.log(result)
            if(result.status ==='Success'){
                    socket.emit('groupdocument',result.result);
              }
            else {
              console.log(result)
            }
    
        })
          .catch(error => console.log('error', error));

    }
    

    async pickAudioFiles() {
        try {
            const result = await DocumentPicker.pick({
                type: [DocumentPicker.types.allFiles],
            });
            console.log(
                result
            );
            this.state.audio=result;
            this.setState({
                modalVisible: false
            });
            this.uploadAudio();
        } catch (err) {
            if (DocumentPicker.isCancel(err)) {
                console.log('User cancelled document picker');
            } else {
                throw err;
            }
        }
    }

    async uploadAudio () {
        const audios = {
            uri: this.state.audio[0].uri,
            type: this.state.audio[0].type,
            name: this.state.audio[0].name,
        };
        console.log('audio', audios);

        var formdata = new FormData();
        formdata.append("sender_id", this.state.sender_id);
        formdata.append("room_id", this.state.room_id);
        formdata.append("audio", audios);
        formdata.append("senderName", this.state.names);
        
        var requestOptions = {
          method: 'POST',
          body: formdata,
          redirect: 'follow'
        };
        
        fetch(API_URL + "audiofileuploadgroup", requestOptions)
          .then(response => response.json())
          .then(result => {
            console.log(result)
            if(result.status==='Success'){
                socket.emit('groupaudio',result.result);
              }
            else{
              console.log(result)
            }
        
        })
          .catch(error => console.log('error', error));
    }
    
   

    getLocation() {
        Geolocation.getCurrentPosition(
            position => {
                const { latitude, longitude } = position.coords;
                console.log(`Latitude: ${latitude}, Longitude: ${longitude}`);
                // Send the location to the chat room
                openMap(`Latitude: ${latitude}, Longitude: ${longitude}`);
                this.setState({
                    modalVisible: false
                });
            },
            error => console.log(error),
            { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 },
        );
    }

    Finger_print() {
        FingerprintScanner.authenticate({
            description: 'Scan your fingerprint on the device scanner to continue',
        })
            .then(() => {
                ToastMsg('Authenticated successfully', 'success');
                this.setState({ Activated: true });
                FingerprintScanner.release();
            })
            .catch(error => {
                FingerprintScanner.release();
                ToastMsg(error.message, 'danger');
            });
    }

    async submitChatMessage() {
        var myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");

            var raw = JSON.stringify({
            "sender_id": this.state.sender_id,
            "room_id": this.state.room_id,
            "senderName": this.state.names,
            "msg": this.state.chatMessage
            });

            var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
            };

            fetch(API_URL+"storemsggroup", requestOptions)
            .then(response => response.json())
            .then(result => {
                console.log(result)
                if (result.status === "Success") {
                    // socket.emit('message', result.result)
                    socket.emit('groupmessage', result.result );


                } else {
                    console.log(result)
                }
            })
            .catch(error => console.log('error', error));
            this.setState({ chatMessage: '' });
    }

    setTheme() {
        console.log(this.state.image)
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({
            "room_id": this.state.room_id,
            "setTheme": this.state.image
        });

        var requestOptions = {
            method: 'PUT',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        fetch(API_URL + "setthemegroup", requestOptions)
            .then(response => response.json())
            .then(result => {
                console.log(result)
                this.setState({
                    theme: result.result.setTheme
                });
                console.log(this.state.theme)
                AsyncStorage.setItem('theme', result.result.setTheme);
            })
            .catch(error => console.log('error', error));
    }

    HandleGroupPictureChange = () => {
        // console.log(this.state.room_id)
        const options = {
            mediaType: 'photo',
            quality: 1,
            maxWidth: 300,
            maxHeight: 300,
            includeBase64: true,
        };

        // show camera or image gallery based on user selection
        Alert.alert(
            'Change profile picture',
            '',
            [
                {
                    text: 'Camera',
                    onPress: () => {
                        launchCamera(options, (response) => {
                            if (response.didCancel) {
                                console.log('User cancelled camera');
                            } else if (response.error) {
                                console.log('Camera Error: ', response.error);
                            } else {
                                // update profile picture with the new image
                                // 
                                console.log(response);
                                this.setState({
                                    image: response.assets[0].uri
                                });
                                this.setTheme()
                                // call API to upload the new image

                            }
                        });
                    },
                },
                {
                    text: 'Gallery',
                    onPress: () => {
                        launchImageLibrary(options, (response) => {
                            if (response.didCancel) {
                                console.log('User cancelled image picker');
                            } else if (response.error) {
                                console.log('ImagePicker Error: ', response.error);
                            } else {
                                // update profile picture with the new image
                                this.setState({
                                    image: response.assets[0].uri
                                });
                                // console.log("response", response)
                                this.setTheme()
                                // call API to upload the new image

                            }
                        });
                    },
                },
                {
                    text: 'Cancel',
                    style: 'cancel',
                },
            ],
            { cancelable: false }
        );
    };



    clearChat() {
        var requestOptions = {
            method: 'DELETE',
            redirect: 'follow'
        };

        fetch(API_URL + "clearallchat/" + this.state.room_id, requestOptions)
        .then(response => response.json())
        .then(result => {
            console.log(result);
            this.setState({ modalVisible2: false });

            // emit clear chat event to other users
            socket.emit('clear chat');

            // clear chatMessages state variable
            this.setState({ chatMessages: [] });
        })
            .catch(error => console.log('error', error));
    }

    handleOptionPress = (option) => {
        this.setState({ modalVisible2: false });
        if (option === 'screen1') {
            this.props.navigation.navigate('ContactSelect');
        } else if (option === 'screen2') {
            this.props.navigation.navigate('Settings');
        }
    };


    bottomsheet() {
        this.setState({ isVisible: true });
    }

    onValueChangeCatH(value) {
        this.setState({ H_selectedcat: value });
    }
    onValueChangeCatM(value) {
        this.setState({ M_selectedcat: value });
    }
    onValueChangeCatS(value) {
        this.setState({ S_selectedcat: value });
    }

    handlePress = (chatMessageId) => {
        const chatMessages2 = [...this.state.chatMessages2];

        // Check if the message ID is already in the array of selected IDs
        const isAlreadySelected = chatMessages2.includes(chatMessageId);

        // If the message is already selected, remove it from the array
        if (isAlreadySelected) {
            const index = chatMessages2.indexOf(chatMessageId);
            chatMessages2.splice(index, 1);
        } else {
            // If not, add it to the array
            chatMessages2.push(chatMessageId);
        }

        // Update the state with the new array of selected message IDs
        this.setState({ chatMessages2 });

        this.setState((prevState) => {
            const isSelected = prevState.selectedMessageIds.includes(chatMessageId);
            if (isSelected) {
                // Message is already selected, so remove it from the selectedMessageIds array
                const updatedSelectedIds = prevState.selectedMessageIds.filter((msgId) => msgId !== chatMessageId);
                const isDisabled = updatedSelectedIds.length === 0; // Disable the delete button if no messages are selected
                return {
                    selectedMessageIds: updatedSelectedIds,
                    isDisabled,
                };
            } else {
                // Message is not selected, so add it to the selectedMessageIds array
                const updatedSelectedIds = [...prevState.selectedMessageIds, chatMessageId];
                const isDisabled = false; // Enable the delete button if at least one message is selected
                return {
                    selectedMessageIds: updatedSelectedIds,
                    isDisabled,
                };
            }
        });
    }

    deleteOneMessage() {
        // console.log(this.state.chatMessages2)


        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({
            "_id": this.state.chatMessages2
        });

        var requestOptions = {
            method: 'DELETE',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        fetch(API_URL + "deletonemessage", requestOptions)
            .then(response => response.json())
            .then(result => {
                console.log(result)
                // RNRestart.Restart()
                // this.forceUpdate()
            })
            .catch(error => console.log('error', error));
    }

    deleteManyMessage() {
        // console.log(this.state.chatMessages2)
        const newArray = this.state.chatMessages2.map((item) => item.replace(/'/g, ""));
        console.log(newArray);
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({
            "_id":
                newArray

        });

        var requestOptions = {
            method: 'DELETE',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        fetch(API_URL + "deletonemanymessage", requestOptions)
        .then(response => response.json())
        .then(result => {
            console.log(result);

            // emit delete message event to other users
            newArray.forEach((_id) => {
                socket.emit('delete message', { _id });
            });

            this.setState({
                isDisabled: false,
                deleteCompleted: true,
                selectedMessageIds: [],
                // remove deleted messages from chatMessages state
                chatMessages: this.state.chatMessages.filter((msg) => !newArray.includes(msg._id))
            });
        })
        .catch(error => console.log('error', error));
    }

    handleRecordStart = async () => {
        const audioPath = AudioUtils.DocumentDirectoryPath + '/test.mp3';
    
        try {
          await AudioRecorder.prepareRecordingAtPath(audioPath, {
            SampleRate: 22050,
            Channels: 1,
            AudioQuality: 'Low',
            AudioEncoding: 'aac',
          });
          await AudioRecorder.startRecording();
          this.setState({ isRecording: true });
        } catch (error) {
          console.error(error);
        }
      };
    
    handleRecordStop = async () => {
        this.setState({ isRecording: false });
      
        try {
          const audioFile = await AudioRecorder.stopRecording();
          const audioData = await RNFS.readFile(audioFile, 'base64');
          console.log('audio', audioFile, 'data', audioData)

          const recording = {
            uri: 'file://' + audioFile,
            type: 'audio/mpeg',
            name: 'test.mp3',
        };
          var formdata = new FormData();
            formdata.append("sender_id", this.state.sender_id);
            formdata.append("senderName", this.state.names);
            formdata.append("audio", recording);
            formdata.append("room_id", this.state.room_id);
            console.log('formdata', formdata)

            var requestOptions = {
            method: 'POST',
            body: formdata,
            redirect: 'follow'
            };

            await fetch(API_URL+"audiofileuploadgroup", requestOptions)
            .then(response => response.json())
            .then(result => {
                console.log(result)
                if(result.status==='Success'){
                    socket.emit('groupaudio',result.result);
                  }
                else{
                  console.log(result)
                }
            })
            .catch(error => console.log('error', error));
         
         
          
        } catch (error) {
          console.error(error);
        }
      };
      handleEmojiSelected = (emoji) => {
        console.log('emoji',emoji)

        const updatedMessage = `${this.state.chatMessage}${emoji}`;
    
        this.setState({ chatMessage: updatedMessage });
    };


  toggleEmojiPicker = () => {
    this.setState(prevState => ({
      isOpen: !prevState.showEmojiPicker,
    }));
  };    


      
    render() {
        const { Activated, ProfileName, isVisible, modalVisible, modalVisible2, search, getmsg, names, isOpen, selectedMessageIds, theme } = this.state;
        const { chatMessage, navigation, route } = this.props;
        const chatMessages = this.state.chatMessages.map((chatMessage, id) => (
            <View>
            {chatMessage.video === '' ? null : (
                    <View style={{
                        backgroundColor: selectedMessageIds.includes(chatMessage._id)
                            ? "grey"
                            : "transparent",
                    }}>
                        <TouchableOpacity onPress={() => navigation.navigate('Preview', { image: chatMessage.video })}
                            onLongPress={() => this.handlePress(chatMessage._id)}
                            // delayLongPress={100}
                        >
                         <Video
                            source={{
                                uri: VideoPath+chatMessage.video
                            }}
                            style={{
                                height: dh * 0.2,
                                maxWidth: dw * 0.6,
                                borderRadius: 20,
                                borderWidth: 2,
                                marginTop: '2%',
                                margin:'2%',
                                borderColor: '#333',
                                marginLeft: chatMessage.senderName === names ? 120 : 0,

                            }}
                            resizeMode={'cover'}
                            // controls={true}
                            // onLoad={{paused:true}}
                                                        
                            muted={true}
                            paused={false}
                            // audioOnly={true}
                            fullscreenOrientation={'all'}
                            fullscreen={true}
                            poster={chatMessage.video} 
                            ref={ref => {
                                this.player = ref;
                            }}
                        />
                        <Icon
                            name="play"
                            size={40}
                            color="#fff"
                            style={{
                            position: 'absolute',
                            top: '50%',
                            left: '50%',
                            marginLeft: chatMessage.senderName === names ? 40 : -70,
                            marginTop: -25,
                            }}
                        />
                        <Text
                            style={{
                                fontSize: Com_font.txt14,
                                color: Com_color.labletxt2,
                                marginLeft: chatMessage.senderName === names ? 250 : 0,
                            }}>
                            {chatMessage.time}
                            </Text>
                        </TouchableOpacity>
                    </View>
                )}
                {chatMessage.image == '' ? null : (
                    <View style={{
                        backgroundColor: selectedMessageIds.includes(chatMessage._id)
                            ? "grey"
                            : "transparent",
                    }}> 
                        <TouchableOpacity onPress={() => navigation.navigate('Preview', { image: chatMessage.image })}
                            onLongPress={() => this.handlePress(chatMessage._id)}
                            // delayLongPress={100}
                        >
                        <Image
                            source={{uri:ImagePath+chatMessage.image}}
                            style={{
                                height: dh * 0.2,
                                maxWidth: dw * 0.6,
                                borderRadius: 20,
                                borderWidth: 2,
                                borderColor: '#fff',
                                marginTop: '2%',
                                margin:'2%',
                                marginLeft: chatMessage.senderName === names ? 120 : 0,
                            }}
                        />
                        <Text
                            style={{
                                fontSize: Com_font.txt14,
                                color: Com_color.labletxt2,
                                marginLeft: chatMessage.senderName === names ? 250 : 0,
                            }}>
                            {chatMessage.time}
                            </Text>
                        </TouchableOpacity>

                    </View>                    
                )}
                {chatMessage.message === '' ? null : (
                    <View style={{
                        // height: dh * 0.05,
                        maxWidth: dw * 0.5,
                        backgroundColor:
                        chatMessage.senderName === names ? '#99ed64' : '#f2f2f2',
                        borderRadius: 10,
                        borderWidth: 2,
                        marginTop: '2%',
                        margin:'2%',
                        borderColor: '#fff',
                        alignSelf:chatMessage.senderName === names ? 'flex-end' : 'flex-start',
                      }}>
                        <TouchableOpacity
                            onLongPress={() => {
                                this.handlePress(chatMessage._id);
                            }}
                            delayLongPress={50}
                        >
                           
                            {chatMessage.message && (
                                <Text
                                    style={{
                                        backgroundColor: selectedMessageIds.includes(chatMessage._id)
                                            ? "grey"
                                            : "transparent",
                                        margin: "3%",
                                        alignSelf: "center",
                                        flexDirection:'column',
                                        color:'black',

                                    }}
                                >
                                    {/* {chatMessage.message} */}
                                    {chatMessage.message} {'\n'}
                                    <Text
                                        style={{
                                            fontSize: Com_font.txt14,
                                            color: Com_color.labletxt2,
                                        }}>
                                        {chatMessage.time}
                                        </Text>
                                </Text>
                            )}
                        </TouchableOpacity>
                        </View>
                )}
                  {chatMessage.document == '' ? null : (
                <View style={{
                    height: dh * 0.2,
                    maxWidth: dw * 0.3,
                    borderRadius: 20,
                    borderWidth: 2,
                    borderColor: '#fff',
                    marginTop: '2%',
                    margin:'4%',
                    // marginLeft: chatMessage.senderName === names ? 120 : 0,
                    alignSelf: chatMessage.senderName === names ? 'flex-end' : 'flex-start',
                        backgroundColor: selectedMessageIds.includes(chatMessage._id)
                            ? "grey"
                            : "transparent"
                }} >
                        <TouchableOpacity onPress={() => Linking.openURL(DocumentPath + chatMessage.document)}
                            onLongPress={() => this.handlePress(chatMessage._id)}
                            // delayLongPress={100}
                        >
                        <Image 
                            style={{
                                height: dh * 0.2,
                                maxWidth: dw * 0.3,
                                borderRadius: 20,
                                borderWidth: 2,
                                // resizeMode: 'contain'
                            }}
                            source={require('../../assets/Images/PDF.jpg')}
                        />
                        {/* <Text>{chatMessage.document}</Text> */}
                        <Text
                            style={{
                                fontSize: Com_font.txt14,
                                color: Com_color.labletxt2,
                                alignSelf: chatMessage.senderName === names ? 'flex-end' : 'flex-start',                            }}>
                            {chatMessage.time}
                            </Text>
                    </TouchableOpacity>
                </View>
            )}

                {chatMessage.audio == '' ? null : (
                    <View
                    style={{
                      height: dh * 0.05,
                      maxWidth: dw * 0.5,
                      backgroundColor:
                      chatMessage.senderName === names ? '#99ed64' : '#f2f2f2',
                      borderRadius: 20,
                      borderWidth: 2,
                      marginTop: '2%',
                      margin:'2%',
                      borderColor: '#fff',
                      alignItems:'center',
                      alignSelf:chatMessage.senderName === names ? 'flex-end' : 'flex-start',
                    }}>
                    <TouchableOpacity
                            onPress={() => navigation.navigate('Preview', { image: chatMessage.audio })}
                            onLongPress={() => this.handlePress(chatMessage._id)}
                            // delayLongPress={100}
                        >
                    
                      <Text style={{fontWeight:'bold', color:'black', alignSelf:'center', margin:'2%'}}>
                        {chatMessage.audio}
                        <Text
                            style={{
                                fontSize: Com_font.txt14,
                                color: Com_color.labletxt2,
                                // marginLeft: chatMessage.senderName === names ? 250 : 0,
                                alignSelf:chatMessage.senderName === names ? 'flex-end' : 'flex-start',
                                

                            }}>
                            {chatMessage.time}
                            </Text>
                        </Text>
                     
                      
                    </TouchableOpacity>
                  </View>
                )}
          </View>
    ));

        

        return (
            <View style={styles.container}>
                <StatusBar
                    translucent={true}
                    backgroundColor={
                        isVisible == true ? 'rgba(0.5, 0.25, 0, 0.2)' : 'transparent'
                    }
                    barStyle="dark-content"
                />
                {Activated != false ? (
                    <View style={styles.toolmain}>
                        <View style={styles.chatmain}>
                            <Pressable
                                onPress={() => this.props.navigation.navigate('Home')} 
                                style={styles.backIcon}>
                                <IconBack name="keyboard-backspace" color="#3b3b3b" size={30} />
                            </Pressable>
                            <TouchableOpacity onPress={() => {
                                this.GetMedia();
                                this.props.navigation.navigate('ViewGroup', {
                                    id: this.state.group,
                                    messages: this.state.chatMessages4,
                                    group: this.state.group
                                });
                            }}
                            >
                            <Image  source={
                                            this.state.groupPic
                                                ? { uri: ProfileImagesPath + this.state.groupPic }
                                                : require('../../assets/Profile/Emptypic.png')
                                            } style={styles.proImg} />
                            </TouchableOpacity>
                            
                            <View style={styles.txtmain}>
                                <Text style={styles.usernametxt}>{ProfileName}</Text>
                                {/* <Text style={styles.onlinetxt}>online</Text> */}
                            </View>
                            
                            {selectedMessageIds.length > 0 && (
                                <TouchableOpacity onPress={this.deleteManyMessage}>
                                    <View>
                                        <Image
                                            source={require('../../assets/delete/delete.png')}
                                            style={{ marginBottom: 20, width: 30, height: 30 }}
                                        />
                                    </View>
                                </TouchableOpacity>
                            )}
                            <TouchableOpacity onPress={() => this.bottomsheet()}>
                                <View style={{ alignItems: 'center' }}>
                                    <Image
                                        source={Const_Images.Chat}
                                        style={{ height: 20, width: 20 }}
                                    />
                                    <Text style={styles.labletxt}>Chat hiddenly</Text>
                                </View>
                            </TouchableOpacity>   
                            <TouchableOpacity>
                                <IconDot
                                    style={styles.Icons}
                                    name="dots-three-vertical"
                                    size={20}
                                    onPress={() => this.setState({ modalVisible2: true })}
                                />
                                <Modal
                                    visible={this.state.modalVisible2}
                                    animationType="fade"
                                    transparent={true}
                                    onRequestClose={() => this.setState({ modalVisible2: false })}
                                >
                                    <View style={styles.modalContainer}>
                                        <TouchableOpacity
                                            style={styles.modalOption}
                                            onPress={() => this.
                                                clearChat()}
                                        >
                                            <Text style={styles.modalOptionText}>Clear Chat</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity
                                            style={styles.modalOption}
                                            onPress={() => this.HandleGroupPictureChange()}
                                        >
                                            <Text style={styles.modalOptionText}>Set Background</Text>
                                        </TouchableOpacity>
                                    </View>
                                </Modal>
                            </TouchableOpacity>
                        </View>
                    </View>
                ) : (
                    <Toolbar navigation={this.props} />
                )}
                {Activated != false ? (
                    // <ImageBackground source={{ uri: this.state.theme }} style={{ width: '100%', height: '80%' }}>
                    <Container style={{ marginTop: '3%' }}>
                        <ImageBackground
                            source={theme ? { uri: theme } : { style: { backgroundColor: '#3d53f5' } }}
                            style={{ height: '100%', width: '100%', resizeMode: 'cover' }}>

                        <ScrollView
                        ref={this.scrollViewRef}
                        onContentSizeChange={() =>
                          this.scrollViewRef.current?.scrollToEnd({ animated: true })
                        }
                        onLayout={() =>
                          this.scrollViewRef.current?.scrollToEnd({ animated: true })
                        }
                        >
                            <View style={styles.chatmainview}>
                                {chatMessages}
                                {/* {chatMessages2} */}
                            </View>
                        </ScrollView>
                        <View style={styles.footermainview}>


                            <Modal
                                style={{}}
                                animationType="slide"
                                transparent={true}
                                visible={modalVisible}
                                onRequestClose={() => {
                                    Alert.alert('Modal has been closed.');
                                    this.setState({ modalVisible: !modalVisible });
                                }}>

                                <View style={styles.bottomView}>
                                    <View style={{ ...styles.modalView, height: 300, width: 370, position: 'absolute', bottom: 25 }}>
                                        <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' }}>
                                            <TouchableOpacity onPress={this.openGallery} style={styles.options}>
                                                <View style={styles.options1}>
                                                    <Icon name="image" size={20} color='darkblue' />
                                                </View>
                                                <Text style={styles.optiontext}>Gallery</Text>
                                            </TouchableOpacity>
                                            <TouchableOpacity onPress={this.openCamera} style={styles.options}>
                                                <View style={styles.options1}>
                                                    <Icon name="camera" size={20} color='darkblue' />
                                                </View>
                                                <Text style={styles.optiontext}>Camera</Text>
                                            </TouchableOpacity>
                                            <TouchableOpacity onPress={this.pickDocument} style={styles.options}>
                                                <View style={styles.options1}>
                                                    <Icon name="file" size={20} color='darkblue' />
                                                </View>
                                                <Text style={styles.optiontext}>Documents</Text>
                                            </TouchableOpacity>
                                            <TouchableOpacity onPress={this.pickAudioFiles} style={styles.options}>
                                                <View style={styles.options1}>
                                                    <Icon name="music" size={20} color='darkblue' />
                                                </View>
                                                <Text style={styles.optiontext}>Audio</Text>
                                            </TouchableOpacity>
                                            <TouchableOpacity style={styles.options}>
                                                <View style={styles.options1}>
                                                    <Icon name="address-book" size={20} color='darkblue' />
                                                </View>
                                                <Text style={styles.optiontext}>Contacts</Text>
                                            </TouchableOpacity>
                                            <TouchableOpacity onPress={this.getLocation} style={styles.options}>
                                                <View style={styles.options1}>
                                                    <Icon name="map-marker" size={25} color='darkblue' />
                                                </View>
                                                <Text style={styles.optiontext}>Location</Text>
                                            </TouchableOpacity>
                                        </View>

                                        <Pressable
                                            style={{ ...styles.button, ...styles.buttonClose, position: 'absolute', top: 5, right: 5 }}
                                            onPress={() => this.setState({ modalVisible: !modalVisible })}>
                                            <Text style={styles.textStyle}>x</Text>
                                        </Pressable>
                                    </View>
                                </View>
                            </Modal>
                            {/* <Pressable
                        style={{ ...styles.button, ...styles.buttonOpen, position: "absolute", bottom: 20, left: 20 }}
                        onPress={() => this.setState({ modalVisible: true })}>
                        <Text style={styles.textStyle}>+</Text>
                    </Pressable> */}




                            <Iconadd onPress={() => this.setState({ modalVisible: true })} color={Com_color.txtblue} name="add" size={40} />
                            <View style={styles.Brmainview}>
                            <TouchableOpacity onPress={this.toggleEmojiPicker} >
                                <Iconsfooter
                                    color={Com_color.labletxt2}
                                    name="emotsmile"
                                    size={25}
                                />
                                </TouchableOpacity>
                                
                                    {isOpen && (
                                        <Modal
                                            visible={isOpen}
                                            transparent={true}
                                            onRequestClose={() => {
                                                this.setState({ isOpen: false });
                                            }}
                                        >
                                            <View
                                                style={{
                                                    height: '45%',
                                                    width: dw,
                                                    alignItems: 'center',
                                                    backgroundColor: 'white',
                                                    position:'absolute',
                                                    bottom:0,

                                                }}
                                            >
                                                <EmojiSelector
                                                    showTabs={true}
                                                    showSearchBar={false}
                                                    showHistory={true}
                                                    showSectionTitles={false}
                                                    columns={'10'}
                                                    placeholder={'Search'}
                                                    category={Categories.history}
                                                    onEmojiSelected={this.handleEmojiSelected} 
                                                />
                                                <View 
                                                style={{
                                                    width:dw,
                                                    // height:dh*0.06,
                                                    flexDirection:'row',
                                                    justifyContent:'center'
                                                }}>
                                                <TextInput
                                    // style={styles.footertxt}
                                    style={{
                                        width: dw * 0.65,
                                        borderEndColor:'black',
                                        borderWidth:1,
                                        borderRadius:20,
                                        backgroundColor:'white',
                                        bottom:7
                                    }}
                                    placeholder=""
                                    autoCorrect={false}
                                    value={this.state.chatMessage}
                                    multiline={true}                                    
                                    onChangeText={(text) => {
                                        // this.handleTyping(text)
                                        this.setState({ chatMessage: text });
                                    }}
                                />
                                
                                 <TouchableOpacity 
                                 style={{
                                position:'absolute',
                                bottom:9,
                                right:10

                                }}
                                  onPress={() => this.submitChatMessage()}>
                                        <Image
                                            source={require('../../assets/Images2/send4.png')}
                                            style={{ height: 45, width: 45 }}
                                        />
                                    </TouchableOpacity>
                                    </View>
                                            </View>
                                        </Modal>
                                    )}
                              
                                <TextInput
                                    // style={styles.footertxt}
                                    style={styles.footertxt}
                                    placeholder="Type a message"
                                    autoCorrect={false}
                                    value={this.state.chatMessage}
                                    multiline={true}                                    
                                    onChangeText={(text) => {
                                        // this.handleTyping(text)
                                        
                                        this.setState({ chatMessage: text });
                                    }}
                                />
                                
                                <Iconsfooter
                                    color={Com_color.labletxt2}
                                    name="location-pin"
                                    size={25}
                                />
                            </View>
                            {this.state.chatMessage.length < 1 ?
                                <TouchableOpacity
                                onPressIn={this.handleRecordStart}
                                onPressOut={this.handleRecordStop}
                                >
                                    <Image
                                        source={require('../../assets/Images2/footer_mic.png')}
                                        style={{ height: 40, width: 40 }}
                                    />
                                </TouchableOpacity>
                                : (
                                    <TouchableOpacity onPress={() => this.submitChatMessage()}>
                                        <Image
                                            source={require('../../assets/Images2/send4.png')}
                                            style={{ height: 40, width: 40 }}
                                        />
                                    </TouchableOpacity>

                                )
                            }


                        </View>
                        </ImageBackground>
                    </Container>
                    // </ImageBackground>
                ) : (
                    <View>
                        <Image style={styles.FingerImg} source={Const_Images.Finger} />
                        <Text style={styles.welcometxt}>Use Fingerprint</Text>
                        <Text style={styles.lable}>
                            Use Your Fingerprint to Unlock the ChatRoom{' '}
                        </Text>
                    </View>
                )}

                <BottomSheet
                    isVisible={this.state.isVisible}
                    containerStyle={{
                        backgroundColor: 'rgba(0.5, 0.25, 0, 0.2)',
                    }}>
                    <View style={styles.BSmainview}>
                        <View style={{ margin: '10%' }}>
                            <View
                                style={{
                                    flexDirection: 'row',
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                }}>
                                <Text style={styles.poplabletxt}>Chat Hiddenly</Text>
                                <Iconclose
                                    onPress={() => this.setState({ isVisible: false })}
                                    name="close"
                                    size={30}
                                />
                            </View>
                            <Text style={styles.poplable}>
                                Setting on this will make new messages disappear from this chat
                                after time limit.
                            </Text>

                            {/* <DatePicker date={new Date()} mode={'time'} /> */}
                            <View>
                                <View style={{ flexDirection: 'row' }}>
                                    <Picker
                                        itemStyle={styles.itemStyle}
                                        mode="dropdown"
                                        style={styles.pickerStyle}
                                        selectedValue={this.state.H_selectedcat}
                                        onValueChange={this.onValueChangeCatH.bind(this)}>
                                        {this.state.housrArr.map((item, index) => (
                                            <Picker.Item
                                                color={Com_color.labletxt}
                                                label={item.itemName}
                                                value={item.itemName}
                                                index={index}
                                            />
                                        ))}
                                    </Picker>
                                    <Picker
                                        itemStyle={styles.itemStyle}
                                        mode="dropdown"
                                        style={styles.pickerStyle}
                                        selectedValue={this.state.M_selectedcat}
                                        onValueChange={this.onValueChangeCatM.bind(this)}>
                                        {this.state.minutesArr.map((item, index) => (
                                            <Picker.Item
                                                color={Com_color.labletxt}
                                                label={item.itemName}
                                                value={item.itemName}
                                                index={index}
                                            />
                                        ))}
                                    </Picker>
                                    <Picker
                                        itemStyle={styles.itemStyle}
                                        mode="dropdown"
                                        style={styles.pickerStyle}
                                        selectedValue={this.state.S_selectedcat}
                                        onValueChange={this.onValueChangeCatS.bind(this)}>
                                        {this.state.secArr.map((item, index) => (
                                            <Picker.Item
                                                color={Com_color.labletxt}
                                                label={item.itemName}
                                                value={item.itemName}
                                                index={index}
                                            />
                                        ))}
                                    </Picker>
                                </View>
                                <View style={styles.timemainview}>
                                    <Text style={styles.timetxt}>hours</Text>
                                    <Text style={styles.timetxt}>minutes</Text>
                                    <Text style={styles.timetxt}>seconds</Text>
                                </View>
                            </View>
                            <View>
                                <TouchableOpacity
                                    onPress={() => alert('Set')}
                                    style={styles.Btnview}>
                                    <Text style={styles.Btntxt}>Set</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </BottomSheet>


            </View>
        );
    }
}

const styles = {
    container: { flex: 1 },
    FingerImg: { width: 350, height: 350, alignSelf: 'center', marginTop: '35%' },
    welcometxt: {
        fontSize: Com_font.txt20,
        alignSelf: 'center',
        color: Com_color.labletxt,
        marginTop: '10%',
    },
    lable: {
        fontSize: Com_font.txt16,
        color: Com_color.lightlabletxt,
        textAlign: 'center',
        margin: 40,
    },
    chatmainview: {
        marginTop: '2%',
        paddingHorizontal: '5%',
        marginBottom:'2%'
    },
    footermainview: {
        flexDirection: 'row',
        height: dh * 0.07,
        alignItems: 'center',
        justifyContent: 'space-evenly',
    },
    Brmainview: {
        flexDirection: 'row',
        width: dw * 0.75,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: Const_Images.labletxt2,
        alignItems: 'center',
        justifyContent: 'space-evenly',
        height: '75%',
        backgroundColor: '#fff',
    },
    footertxt: { width: dw * 0.55 },
    toolmain: {
        flexDirection: 'row',
        marginTop: '13%',
        width: dw,
    },
    Icons: { margin: '3%', bottom: '2%' },
    chatmain: { flexDirection: 'row', alignItems: 'center' },
    notifyImage: { width: 40, height: 40, marginLeft: '20%' },
    txtmain: { width: dw * 0.4, paddingLeft: '4%' },
    usernametxt: { fontSize: Com_font.txt16, color: Com_color.labletxt, fontWeight:'bold' },
    onlinetxt: { fontSize: Com_font.txt16, color: '#67c781', fontWeight: 'bold' },
    labletxt: {
        fontSize: Com_font.txt14,
        color: Com_color.labletxt,
        fontWeight: 'bold',
    },
    backIcon: { marginHorizontal: '3%' },
    proImg: {
        borderRadius: 25,
        width: 50,
        height: 50,
    },
    BSmainview: {
        height: dh * 0.5,
        backgroundColor: '#fff',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
    },
    poplabletxt: {
        fontSize: Com_font.txt16,
        color: Com_color.labletxt,
        fontWeight: 'bold',
    },
    poplable: {
        fontSize: Com_font.txt16,
        color: Com_color.lightlabletxt,
        textAlign: 'center',
        marginVertical: '10%',
    },
    Btnview: {
        height: 50,
        borderRadius: 10,
        backgroundColor: Com_color.Btnblue,
        justifyContent: 'center',
        alignItems: 'center',
    },
    Btntxt: {
        fontSize: Com_font.txt20,
        color: Com_color.txtyellow,
        fontWeight: 'bold',
    },

    itemStyle: {
        fontSize: 10,
        fontFamily: 'Roboto-Regular',
        color: Com_color.labletxt,
    },
    pickerStyle: {
        width: '25%',
        height: 40,
        color: Com_color.labletxt,
        fontSize: Com_font.txt14,
        fontFamily: 'Roboto-Regular',
    },
    textStyle: {
        fontSize: Com_font.txt14,
        fontFamily: 'Roboto-Regular',
    },
    timemainview: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginVertical: '5%',
    },
    timetxt: { color: Com_color.labletxt2 },
    bottomView: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
        marginTop: 22,
    },
    modalView: {

        margin: 20,
        backgroundColor: 'lightgray',
        borderRadius: 10,
        padding: 35,
        alignItems: 'flex-start',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    button: {

        borderRadius: 25,
        padding: 5,
        elevation: 2,
    },
    buttonOpen: {
        backgroundColor: 'white',
    },
    buttonClose: {
        backgroundColor: 'lightgray',
    },
    textStyle: {
        fontSize: 20,
        color: 'darkblue',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    modalText: {
        marginBottom: 15,
        textAlign: 'center',
    },
    options: {
        flexDirection: 'column',
        alignItems: 'center',
        marginVertical: 10,
        width: '33.33%'
    },

    options1: {
        width: 50,
        height: 50,
        backgroundColor: 'white',
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center'
    },
    optiontext: {
        fontSize: 17,
        color: 'darkblue'
    },
    menuOptionText: {
        fontSize: 18,
        paddingVertical: 10,
        paddingHorizontal: 20,
    },
    modalContainer: {
        backgroundColor: 'lightgrey',
        borderRadius: 10,
        padding: 10,
        marginHorizontal: 20,
        marginTop: 80,
        elevation: 4,
    },
    modalOption: {
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
    modalOptionText: {
        fontSize: 18,
        fontWeight: 'bold',
    },

};

export default ChatRoom;
