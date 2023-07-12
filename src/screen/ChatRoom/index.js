import React, { useEffect, Component } from 'react';
import {
    View,
    TouchableOpacity,
    Image,
    StatusBar,
    Text,
    TextInput,
    ScrollView,
    ActivityIndicator,
    ImageBackground,
    Pressable,
    Modal,
    Alert,
    StyleSheet,
    SafeAreaView,
    TouchableWithoutFeedback
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
import Video from 'react-native-video';
import { BottomSheet } from 'react-native-elements';
import IconBack from 'react-native-vector-icons/MaterialCommunityIcons';
import IconDot from 'react-native-vector-icons/Entypo';
import Iconclose from 'react-native-vector-icons/AntDesign';

import { launchImageLibrary, launchCamera } from 'react-native-image-picker';
import { PermissionsAndroid, Linking } from 'react-native';
import DocumentPicker from 'react-native-document-picker';
import Geolocation from '@react-native-community/geolocation';
import openMap from 'react-native-open-maps';
import Icon from 'react-native-vector-icons/FontAwesome';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { socket, API_URL, IP, ImagePath, VideoPath, DocumentPath, ProfileImagesPath } from '../../service';
import { AudioRecorder, AudioUtils } from 'react-native-audio';
import RNFS from 'react-native-fs';
import Contacts from 'react-native-contacts';
import EmojiSelector, { Categories } from "react-native-emoji-selector";


class ChatRoom extends Component {
    scrollViewRef = React.createRef();
    constructor(props) {

        super(props);
        this.state = {
            chatMessages3: [],
            isDisabled: false,
            isRecording: false,
            currentVideoIndex: null,
            isPlaying: false,
            currentAudio: null,
            selectedMessageIds: [],
            isLongPressed: false,
            modalVisible2: false,
            isDisabled: true,
            getmsg: [],
            sender_id: '',
            otherNum: '',
            room_id: '',
            names: '',
            contactname: '',
            result: '',
            search: '',
            modalVisible: false,
            image: '',
            filePath: '',
            image: '',
            audio: '',
            hrs: '',
            min: '',
            sec: '',
            doc: {},
            contact: null,
            contacts: [],
            location: null,
            region: {
                latitude: 37.78825,
                longitude: -122.4324,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
            },
            Activated: false,
            ProfileName: '',
            profilepic: '',
            chatMessage: '',
            seen: true,
            isVisible: false,
            hours: 10,
            minutes: 20,
            H_selectedcat: '',
            M_selectedcat: '',
            S_selectedcat: '',
            time: '',
            status1: '',
            other_id1: '',
            chatMessages: [

                // { id: 0, msg: '', img: '', v: '' },
            ],
            chatMessages2: [],
            data2: '',
            selected: false,
            isMounted: false,
            duration: 0,
            currentTime: 0,
            // isPlaying: false,
            group: '',
            image: '',
            theme: '',
            Alldata: '',
            isTyping: false,
            isOnline: false,
            isOpen: false,
            isloading: false,
            socketid: '',
            typing: '',
            online_id: '',
            other_id2: '',


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
        this.deleteRoom = this.deleteRoom.bind(this);
        this.openCamera = this.openCamera.bind(this);
        this.typingTimer = null;
    }


    Finger_print() {
        FingerprintScanner.authenticate({
            description: 'Scan your fingerprint on the device scanner to continue',
        })
            .then(() => {
                ToastMsg('Authenticated successfully', 'success');
                this.setState({ Activated: true });
                FingerprintScanner.release();
                console.log('true...')
            })
            .catch(error => {
                FingerprintScanner.release();
                ToastMsg(error.message, 'danger');
                console.log('false...')
            });
    }


    async componentDidMount() {
        // this.setState({isloading:true})
        this.state.socketid = socket.id

        this.scrollViewRef.current?.scrollToEnd({ animated: true });
        this.state.names = await AsyncStorage.getItem('username');
        console.log('username',this.state.names);

        this.state.sender_id = await AsyncStorage.getItem('number')
        console.log('userid', this.state.sender_id)
        const { navigation, route } = this.props;

        const value = await AsyncStorage.getItem('@user');
        const value1 = JSON.parse(value)
        console.log('_id....', value1)


        // const contactName = route?.params?.contactName;

        const storedTheme = await AsyncStorage.getItem('theme1');
        if (storedTheme) {
            this.setState({
                theme: storedTheme
            });
        }

        // const contactName2 = route?.params?.userName;
        // const ProfileName =
        //     contactName == 'undefined'
        //         ? contactName
        //         : contactName2 || contactName2 == 'undefined'
        //             ? contactName2
        //             : contactName;
        // const {onetoone, names}  = route.params; 
        // console.log('data', onetoone, names)
        const { onetoone, names, other_id } = route.params;
        console.log('onetoone:', onetoone);
        console.log('names:', names);
        console.log('other_id', other_id)
        // this.state.other_id2=other_id

        this.setState({
            Alldata: onetoone
        });
        this.setState({ ProfileName: JSON.stringify(names).replace(/\"/g, ''), other_id2: other_id })

        if (this.state.sender_id == onetoone.user_id) {
            this.state.otherNum = onetoone.other_id;
        }
        else {
            this.state.otherNum = onetoone.user_id;
        }
        if (onetoone.status === 'Success') {
            //     this.state.contactname=await AsyncStorage.getItem('name')
            // console.log(this.state.contactname)
            if (this.state.sender_id == onetoone.response[0].user_id) {

                this.setState({
                    // sender_id :  route.params.response[0].user_id,
                    room_id: onetoone.response[0].room_id,
                    otherNum: onetoone.response[0].other_id,
                    online_id: this.state.other_id2
                });
            }
            else {
                this.setState({
                    // sender_id :  route.params.response[0].user_id,
                    room_id: onetoone.response[0].room_id,
                    otherNum: onetoone.response[0].user_id,
                    online_id: this.state.other_id2
                });
            }


        }
        else {
            this.setState({
                profilepic: onetoone.otherdata[0].profile_img,
                room_id: onetoone.room_id,
                online_id: onetoone.otherdata[0]._id
                // sender_id:onetoone.user_id,
                // otherNum:onetoone.other_id
            });

        }


        // console.log('otherNum', this.state.sender_id);
        console.log('othernum', this.state.otherNum)
        await AsyncStorage.setItem('profilenum', JSON.stringify(this.state.otherNum));
        await AsyncStorage.setItem('profilename', this.state.ProfileName);
        await AsyncStorage.setItem('profilpic', this.state.profilepic);



        this.Finger_print();

        socket.on('typing', (room) => {
            console.log('typimg', room)
        });
        socket.on('stopTyping', (data) => {
            console.log("User stopped typing: ", data);
            // socket.broadcast.to(data.room).emit('stopTyping', data);
        });

        // for recieving image
        socket.on('user gallery', (data) => {
            console.log('image', data);
            // socket.emit('user document',data)
            this.setState({
                chatMessages: [...this.state.chatMessages, data]
            });
        })
        // socket emiting code....for recieving text
        socket.on('messageSend', (data) => {
            // socket.emit('messageSend', data)
            console.log('message', data.time)
            // this.setState({ isTyping: false, isOnline: true });
            this.setState({
                chatMessages: [...this.state.chatMessages, data]
            });
        })

        socket.on('typing1', (data) => {
            console.log('typingcheck', data)
            if (data[0].socket !== this.state.socketid) {
                this.setState({ typing: 'typing...' })
            }


        });
        socket.on('stopTyping1', (data) => {
            console.log('stopTypingcheck', data)
            if (data[0].socket !== this.state.socketid) {
                this.setState({ typing: '' })
            }
        });

        //for recieving document
        socket.on("user document", (data) => {
            console.log('document', data);
            // socket.emit('user document',data)
            this.setState({
                chatMessages: [...this.state.chatMessages, data]
            });
        })
        //for recieving audio files
        socket.on("user audio", (data) => {
            console.log('audio', data)
            // socket.emit('user audio',data)
            this.setState({
                chatMessages: [...this.state.chatMessages, data]
            });
        })
        //for recieving video
        socket.on("user video", (data) => {
            console.log('video', data)
            // socket.emit('user video',data)
            this.setState({
                chatMessages: [...this.state.chatMessages, data]
            });
        })

        socket.on('userStatusChanged', ({ userId, time, status }) => {
            console.log("userid", userId)
            console.log("id", this.state.otherNum)
            console.log("status", status)
            console.log("time", time)
            if (userId === this.state.otherNum) {
                const userIds = this.state.room_id

                const currentTime = new Date().toLocaleTimeString('en-US', {
                    hour: 'numeric',
                    minute: 'numeric',
                    hour12: true
                });
                console.log("userStatusChanged", userId, status, currentTime)
                this.setState({ status1: status, time: currentTime });
                //  AsyncStorage.setItem(`status_${userIds}`,status) 
                // AsyncStorage.setItem(`time_${userIds}`,time?time:'')
            }
        });



        //for online message
        // socket.emit('online message1',{online:true})
        // socket.on('online message',(online)=>{
        //     console.log('online message1',online)

        //     console.log('socketid', socket.id)
        //     if (online[0] !== socket.id && online[1] == true) {
        //         this.setState({isOnline:true})
        //         console.log('status:', this.state.isOnline)
        //     }
        //     else {
        //         this.setState({isOnline:false})
        //         console.log('elsestatus:', this.state.isOnline)

        //     }
        // })

        socket.on('typing', (data) => {
            console.log('recieveddata', data);
        });

        socket.on('stopTyping', (data) => {
            console.log('recieveddatastopped', data);
        });

        // Set an interval to periodically check the online status
        // setInterval(() => {
        //     // Call the online message event on the socket
        //     socket.emit('online message', (online) => {
        //     console.log('online message1', online)
        //     console.log('socketid', socket.id)

        //     // Check if the received socket value matches the local socket ID
        //     if (online[0] !== socket.id) {
        //         // If they do not match, set the isOnline flag to true
        //         this.setState({ isOnline: true }, () => {
        //         console.log('status:', this.state.isOnline)
        //         })
        //     } else {
        //         // If they match, set the isOnline flag to false
        //         this.setState({ isOnline: false }, () => {
        //         console.log('elsestatus:', this.state.isOnline)
        //         })
        //     }
        //     })
        // }, 2000)




        //for getting chat history
        // var requestOptions = {
        //     method: 'GET',
        //     redirect: 'follow'
        // };

        // fetch(API_URL + "getmsg/" + this.state.room_id, requestOptions)
        //     .then(response => response.json())
        //     .then(result => {
        //         console.log(result)
        //         if (result.status === "Success") {
        //             // this.setState({isloading:false})
        //             for (let i = 0; i < result.result.length; i++) {
        //                 this.state.chatMessages.push(result.result[i]);
        //             }
        //             console.log(this.state.chatMessages)
        //             this.setState(prevState => ({
        //                 chatMessages3: [...prevState.chatMessages3, ...result.result]
        //             }));
        //         } else {
        //             console.log(result)
        //         }
        //     })
        //     .catch(error => console.log('error', error));
        this.getMessage()

        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        var raw = JSON.stringify({
            "userId": this.state.online_id
        });
        console.log('raw', raw)
        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        fetch(API_URL + "getuseronlineorofline", requestOptions)
            .then(response => response.json())
            .then(result => {
                console.log('getuseronlineorofline', result)
                if (result.response[0].online == true) {
                    const userIds = this.state.room_id
                    const status = 'Online'
                    this.setState({ status1: status });
                    // AsyncStorage.setItem(`status_${userIds}`, status )
                }
                else {
                    const userIds = this.state.room_id;
                    const status = 'offline';
                    const time = result.response[0].time;
                    console.log('timestring', time)
                    this.setState({ status1: status, time: time });
                    // AsyncStorage.setItem(`status_${userIds}`,status) 
                    // AsyncStorage.setItem(`time_${userIds}`,time?time:'')
                }
            })
            .catch(error => console.log('error', error));
    }

    getMessage = () => {
        var requestOptions = {
            method: 'GET',
            redirect: 'follow'
        };

        fetch(API_URL + "getmsg/" + this.state.room_id, requestOptions)
            .then(response => response.json())
            .then(result => {
                console.log(result)
                if (result.status === "Success") {
                    // this.setState({isloading:false})
                    for (let i = 0; i < result.result.length; i++) {
                        this.state.chatMessages.push(result.result[i]);
                    }
                    console.log(this.state.chatMessages)
                    this.setState(prevState => ({
                        chatMessages3: [...prevState.chatMessages3, ...result.result]
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

    componentWillUnmount() {
        clearTimeout(this.typingTimer);
    }

    onChangeText = (input) => {

        this.handleTyping(input);

        clearTimeout(this.typingTimer);
        this.typingTimer = setTimeout(this.handleStoppedTyping, 2000); // Adjust the delay as needed
    };

    handleTyping = () => {
        // console.log(roomId)
        const data = [];
        data.push({ room: this.state.room_id, socket: this.state.socketid })
        // console.log('mysocketid',this.state.socketid )

        socket.emit('typing', data);
    };

    handleStoppedTyping = () => {
        // Call your second function here

        // console.log(roomId)
        const data = [];

        data.push({ room: this.state.room_id, socket: this.state.socketid })
        // console.log('mysocketid',this.state.socketid )

        socket.emit('stopTyping', data);
        // console.log('Stopped typing:', socket.id);
    };


    handleEmojiSelected = (emoji) => {
        console.log('emoji', emoji)

        const updatedMessage = `${this.state.chatMessage}${emoji}`;

        this.setState({ chatMessage: updatedMessage });
    };


    toggleEmojiPicker = () => {
        this.setState(prevState => ({
            isOpen: !prevState.showEmojiPicker,
        }));
    };



    async handleStoppedTyping() {
        const data = [];
        data.push({ room: this.state.room_id, socket: socket.id })
        console.log("stoptyping dta: ", data);
        socket.emit('stopTyping', data);

    }


    openGallery() {
        let options = {
            mediaType: 'mixed',
            maxWidth: 300,
            maxHeight: 550,
            quality: 2,
            videoQuality: 'high'
        };
        launchImageLibrary(options, async (response) => {
            console.log('Response = ', response);
            this.state.image = response;
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
                    {
                        image: response,
                        room_id: this.state.room_id,
                        names: this.state.names,
                        sender_id: this.state.sender_id
                    });
            } else if (response.assets[0].type === 'video/mp4') {
                // Call video upload API
                // this.uploadVideo();
                // Navigate to Preview screen with the selected video
                this.props.navigation.navigate('AttachmentPreview',
                    {
                        video: response,
                        room_id: this.state.room_id,
                        names: this.state.names,
                        sender_id: this.state.sender_id
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
                    this.state.image = response;
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
                            {
                                image: response,
                                room_id: this.state.room_id,
                                names: this.state.names,
                                sender_id: this.state.sender_id
                            });
                    } else if (response.assets[0].type === 'video/mp4') {
                        // Call video upload API
                        // this.uploadVideo();
                        // Navigate to Preview screen with the selected video
                        this.props.navigation.navigate('AttachmentPreview',
                            {
                                video: response,
                                room_id: this.state.room_id,
                                names: this.state.names,
                                sender_id: this.state.sender_id
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
            this.state.doc = result;
            this.setState({
                // image: response.uri,
                modalVisible: false
            });
            // this.setState({
            //     modalVisible: false
            // });
            // this.uploadDocument();
            this.props.navigation.navigate('AttachmentPreview',
                {
                    document: result,
                    room_id: this.state.room_id,
                    names: this.state.names,
                    sender_id: this.state.sender_id
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
        const docs = {
            uri: this.state.doc[0].uri,
            type: this.state.doc[0].type,
            name: this.state.doc[0].name,
        };

        var formdata = new FormData();
        formdata.append("sender_id", this.state.sender_id);
        formdata.append("senderName", this.state.names);
        formdata.append("document_file", docs);
        formdata.append("room_id", this.state.room_id);
        formdata.append("message", this.state.chatMessage);

        var requestOptions = {
            method: 'POST',
            body: formdata,
            redirect: 'follow'
        };

        await fetch(API_URL + "documentfileupload", requestOptions)
            .then(response => response.json())
            .then(result => {
                console.log(result)
                if (result.status === 'Success') {
                    socket.emit('user document', result.result);
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
            this.state.audio = result;
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

    async uploadAudio() {
        const audios = {
            uri: this.state.audio[0].uri,
            type: this.state.audio[0].type,
            name: this.state.audio[0].name,
        };
        console.log('audio', audios);

        var formdata = new FormData();
        formdata.append("sender_id", this.state.sender_id);
        formdata.append("senderName", this.state.names);
        formdata.append("audio", audios);
        formdata.append("room_id", this.state.room_id);

        var requestOptions = {
            method: 'POST',
            body: formdata,
            redirect: 'follow'
        };

        await fetch(API_URL + "audiofileupload", requestOptions)
            .then(response => response.json())
            .then(result => {
                console.log(result)
                if (result.status === 'Success') {
                    socket.emit('user audio', result.result);
                }
                else {
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



    submitChatMessage() {
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({
            "sender_id": this.state.sender_id,
            "room_id": this.state.room_id,
            "senderName": this.state.names,
            "msg": this.state.chatMessage
        });
        console.log('raw',raw)

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        fetch(API_URL + "storemsg", requestOptions)
            .then(response => response.json())
            .then(result => {
                console.log(result)
                if (result.status === "Success") {
                    socket.emit('message', result.result)

                } else {
                    console.log(result)
                }
            })

            .catch(error => console.log('error', error));
        this.setState({
            chatMessage: '',
            isOpen: false
        });
    }



    clearChat() {
        this.setState({ isloading: true })
        var requestOptions = {
            method: 'DELETE',
            redirect: 'follow'
        };

        fetch(API_URL + "clearallchat/" + this.state.room_id, requestOptions)
            .then(response => response.json())
            .then(result => {
                console.log(result);
                this.setState({ modalVisible2: false });
                this.setState({ isloading: false })
                // emit clear chat event to other users
                socket.emit('clear chat');

                // clear chatMessages state variable
                this.setState({ chatMessages: [] });
            })
            .catch(error => console.log('error', error));
    }

    setTheme() {
        this.setState({ isloading: true })

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

        fetch(API_URL + "settheme", requestOptions)
            .then(response => response.json())
            .then(async result => {
                console.log(result)
                this.setState({
                    theme: result.result.setTheme
                });
                this.setState({ isloading: false })

                console.log(this.state.theme)
                await AsyncStorage.setItem('theme1', result.result.setTheme);
            })
            .catch(error => console.log('error', error));
    }


    setbackground = () => {
        // console.log(this.state.room_id)
        const options = {
            mediaType: 'photo',
            quality: 1.5,
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

    deleteRoom() {
        this.setState({ isloading: true })
        var raw = "";

        var requestOptions = {
            method: 'DELETE',
            body: raw,
            redirect: 'follow'
        };

        fetch(API_URL + `deleteroom/${this.state.room_id}`, requestOptions)
            .then(response => response.json())
            .then(result => {
                // console.log(result)
                if (result.status === true) {
                    console.log(result)
                    this.setState({ isloading: false })
                    this.props.navigation.navigate('Home');
                }
            })
            .catch(error => console.log('error', error));
    }

    bottomsheet() {
        this.setState({ isVisible: true });
    }

    onValueChangeCatH(value) {
        console.log("hour", value)
        this.setState({
            hrs: value
        });
        this.setState({ H_selectedcat: value });
    }
    onValueChangeCatM(value) {
        console.log("min", value)
        this.setState({
            min: value
        });
        this.setState({ M_selectedcat: value });
    }
    onValueChangeCatS(value) {
        console.log("sec", value)
        this.setState({
            sec: value
        });
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
                    isDisabled: true,
                    deleteCompleted: true,
                    selectedMessageIds: [],
                    // remove deleted messages from chatMessages state
                    chatMessages: this.state.chatMessages.filter((msg) => !newArray.includes(msg._id))
                });
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

    chatHiddenly = () => {
        this.setState({ isloading: true })
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        console.log("API hrs", this.state.hrs)
        var raw = JSON.stringify({
            "room_id": this.state.room_id,
            "hours": this.state.hrs,
            "minutes": this.state.min,
            "seconds": this.state.sec
        });

        var requestOptions = {
            method: 'DELETE',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        fetch(API_URL + "chathiddenly", requestOptions)
            .then(response => response.json())
            .then(result => {
                this.setState({ isloading: false })
                console.log(result)
                Alert.alert(
                    'Alert Title',
                    'Messages will be dissapear',
                    [
                        { text: 'OK', onPress: () => this.setState({ isVisible: false }) }
                    ]
                );
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
            console.log('audiofile', audioFile, 'data', audioData)

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

            await fetch(API_URL + "audiofileupload", requestOptions)
                .then(response => response.json())
                .then(result => {
                    console.log(result)
                    if (result.status === 'Success') {
                        socket.emit('user audio', result.result);
                    }
                    else {
                        console.log(result)
                    }
                })
                .catch(error => console.log('error', error));



        } catch (error) {
            console.error(error);
        }
    };

    render() {
        const { Activated, ProfileName, isloading, modalVisible, names, selectedMessageIds, theme, isOpen, isOnline, isVisible } = this.state;
        const { chatMessage, navigation, route } = this.props;
        // const statusText = isTyping ? 'typing...' : (isOnline ? 'online' : '');
        const displayValue = this.state.status1 === 'offline' ? 'Last Seen at ' + this.state.time : this.state.status1;

        const chatMessages = this.state.chatMessages.map((chatMessage, id) => (
            <View>
                {chatMessage.video === '' ? null : (
                    <View style={{
                        backgroundColor: selectedMessageIds.includes(chatMessage._id)
                            ? "#cde"
                            : "transparent",
                    }}>
                        <TouchableOpacity onPress={() => navigation.navigate('Preview', { image: chatMessage.video })}
                            onLongPress={() => this.handlePress(chatMessage._id)}
                        // delayLongPress={100}
                        >
                            <Video
                                source={{
                                    uri: VideoPath + chatMessage.video
                                }}
                                style={{
                                    height: dh * 0.4,
                                    maxWidth: dw * 0.6,
                                    borderRadius: 20,
                                    borderWidth: 2,
                                    marginTop: '2%',
                                    margin: '2%',
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
                            ? "#cde"
                            : "transparent",
                    }}>
                        <TouchableOpacity onPress={() => navigation.navigate('Preview', { image: chatMessage.image })}
                            onLongPress={() => this.handlePress(chatMessage._id)}
                        // delayLongPress={100}
                        >
                            <Image
                                source={{ uri: ImagePath + chatMessage.image }}
                                style={{
                                    height: dh * 0.4,
                                    maxWidth: dw * 0.6,
                                    borderRadius: 20,
                                    borderWidth: 2,
                                    borderColor: '#fff',
                                    marginTop: '2%',
                                    margin: '2%',
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
                        margin: '2%',
                        borderColor: '#fff',
                        alignSelf: chatMessage.senderName === names ? 'flex-end' : 'flex-start',
                    }}>
                        <TouchableOpacity
                            onLongPress={() => {
                                this.handlePress(chatMessage._id);
                            }}
                            delayLongPress={50}
                        >
                            {/* <Text
                                style={{
                                    backgroundColor: selectedMessageIds.includes(chatMessage._id)
                                        ? "grey"
                                        : "transparent",
                                    margin: "2%",
                                    alignSelf: "center",
                                    flexDirection:'column'
                                }}
                            >
                                {chatMessage.message}
                            </Text> */}
                            {chatMessage.message && (
                                <Text
                                    style={{
                                        backgroundColor: selectedMessageIds.includes(chatMessage._id)
                                            ? "#cde"
                                            : "transparent",
                                        margin: "3%",
                                        alignSelf: "center",
                                        flexDirection: 'column',
                                        color: 'black',
                                    }}
                                >
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
                        backgroundColor: selectedMessageIds.includes(chatMessage._id)
                            ? "#cde"
                            : "transparent",
                        height: dh * 0.2,
                        maxWidth: dw * 0.3,
                        borderRadius: 20,
                        borderWidth: 2,
                        borderColor: '#fff',
                        marginTop: '2%',
                        margin: '2%',
                        // marginLeft: chatMessage.senderName === names ? 120 : 0,
                        alignSelf: chatMessage.senderName === names ? 'flex-end' : 'flex-start',
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
                                    alignSelf: chatMessage.senderName === names ? 'flex-end' : 'flex-start',
                                }}>
                                {chatMessage.time}
                            </Text>
                        </TouchableOpacity>
                    </View>
                )}

                {chatMessage.audio == '' ? null : (
                    <View
                        style={{
                            //   height: dh * 0.05,
                            maxWidth: dw * 0.6,
                            backgroundColor:
                                chatMessage.senderName === names ? '#99ed64' : '#f2f2f2',
                            borderRadius: 20,
                            borderWidth: 2,
                            marginTop: '2%',
                            margin: '2%',
                            borderColor: '#fff',
                            alignItems: 'center',
                            alignSelf: chatMessage.senderName === names ? 'flex-end' : 'flex-start',
                        }}>
                        <TouchableOpacity
                            onPress={() => navigation.navigate('Preview', { image: chatMessage.audio })}
                            onLongPress={() => this.handlePress(chatMessage._id)}
                        // delayLongPress={100}
                        >

                            <Text style={{ fontWeight: 'bold', color: 'black', alignSelf: 'center', margin: '2%' }}>
                                {chatMessage.audio}{'\n'}
                                <Text
                                    style={{
                                        fontSize: Com_font.txt14,
                                        color: Com_color.labletxt2,

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
            <SafeAreaView style={styles.container}>
                <StatusBar
                    translucent={true}
                    backgroundColor={
                        isVisible == true ? 'rgba(0.5, 0.25, 0, 0.2)' : 'transparent'
                    }
                    barStyle="dark-content"
                />
                {this.state.Activated != false ? (
                    <View style={styles.toolmain}>

                        <View style={styles.chatmain}>
                            <Pressable
                                onPress={() => this.props.navigation.goBack()}
                                style={styles.backIcon}>
                                <IconBack name="keyboard-backspace" color="#3b3b3b" size={30} />
                            </Pressable>
                            <TouchableOpacity onPress={() => this.props.navigation.navigate('ViewOtherContact',
                                { id: this.state.room_id, messages: this.state.chatMessages3, Alldata: this.state.Alldata, contactname: this.state.ProfileName })}>
                                <Image source={
                                    this.state.profilepic
                                        ? { uri: ProfileImagesPath + this.state.profilepic }
                                        : require('../../assets/Profile/Emptypic.png')
                                } style={styles.proImg} />
                            </TouchableOpacity>

                            <View style={styles.txtmain}>
                                <Text style={styles.usernametxt}>{ProfileName}</Text>
                                {/* <Text style={styles.onlinetxt}></Text> */}
                                <Text style={styles.onlinetxt}>
                                    {this.state.typing ? this.state.typing : displayValue}
                                </Text>
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
                                    <TouchableWithoutFeedback onPress={() => this.setState({ modalVisible2: false })}>
                                        <View style={{ flex: 1 }}></View>
                                    </TouchableWithoutFeedback>
                                    <View style={styles.modalContainer}>
                                        <TouchableOpacity
                                            style={styles.modalOption}
                                            onPress={() => this.clearChat()}
                                        >
                                            <Text style={styles.modalOptionText}>Clear Chat</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity
                                            style={styles.modalOption}
                                            onPress={() => this.setbackground()}
                                        >
                                            <Text style={styles.modalOptionText}>Set Background</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity
                                            style={styles.modalOption}
                                            onPress={() => this.deleteRoom()}
                                        >
                                            <Text style={styles.modalOptionText}>Delete Room</Text>
                                        </TouchableOpacity>
                                    </View>
                                </Modal>
                            </TouchableOpacity>

                        </View>
                    </View>
                ) : (
                    <Toolbar navigation={this.props} />
                )}
                {this.state.Activated != false ? (
                    <Container style={{ marginTop: '3%' }}>
                        <ImageBackground
                            source={theme ? { uri: theme } : { backgroundColor: '#3d53f5' }}
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
                                {isloading ? (
                                    <View style={{ flex: 1, justifyContent: "center", alignItems: "center", marginTop: '40%' }}>
                                        <ActivityIndicator color={"darkblue"} size={'large'} />
                                    </View>
                                ) : (
                                    <>
                                        <View style={styles.chatmainview}>
                                            {chatMessages}
                                            {/* {chatMessages2} */}
                                        </View>
                                    </>
                                )}
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
                                    <TouchableWithoutFeedback onPress={() => this.setState({ modalVisible: false })}>
                                        <View style={{ flex: 1 }}></View>
                                    </TouchableWithoutFeedback>

                                    <View style={styles.bottomView}>
                                        <View style={{ ...styles.modalView, height: 300, width: 370, position: 'absolute', bottom: 30 }}>
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
                                            <TouchableWithoutFeedback onPress={() => this.setState({ isOpen: false })}>
                                                <View style={{ flex: 1 }}></View>
                                            </TouchableWithoutFeedback>
                                            <View
                                                style={{
                                                    height: '45%',
                                                    width: dw,
                                                    alignItems: 'center',
                                                    backgroundColor: 'white',
                                                    position: 'absolute',
                                                    bottom: 0,

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
                                                        width: dw,
                                                        // height:dh*0.06,
                                                        flexDirection: 'row',
                                                        justifyContent: 'center'
                                                    }}>
                                                    <TextInput
                                                        // style={styles.footertxt}
                                                        style={{
                                                            width: dw * 0.65,
                                                            borderEndColor: 'black',
                                                            borderWidth: 1,
                                                            borderRadius: 20,
                                                            backgroundColor: 'white',
                                                            bottom: 7
                                                        }}
                                                        placeholder=""
                                                        autoCorrect={false}
                                                        value={this.state.chatMessage}
                                                        multiline={true}
                                                        onChangeText={(text) => {
                                                            // this.handleTyping(text)
                                                            clearTimeout(this.typingTimeout);
                                                            this.typingTimeout = setTimeout(() => {
                                                                this.handleStoppedTyping(text);
                                                            }, 1000);
                                                            this.setState({ chatMessage: text });
                                                        }}
                                                    />

                                                    <TouchableOpacity
                                                        style={{
                                                            position: 'absolute',
                                                            bottom: 9,
                                                            right: 10

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
                                            this.setState({ chatMessage: text });
                                            this.onChangeText();
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
                                        onValueChange={(selectedValue) => this.onValueChangeCatH(selectedValue)}>
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
                                        onValueChange={(selectedValue) => this.onValueChangeCatM(selectedValue)}>
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
                                        onValueChange={(selectedValue) => this.onValueChangeCatS(selectedValue)}>
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
                                    onPress={() => this.chatHiddenly()}
                                    style={styles.Btnview}>
                                    <Text style={styles.Btntxt}>Set</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </BottomSheet>


            </SafeAreaView>
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
    footertxt: { width: dw * 0.50 },
    toolmain: {
        flexDirection: 'row',
        marginTop: '10%',
        width: dw,
    },
    Icons: { margin: '3%', bottom: '2%' },
    chatmain: { flexDirection: 'row', alignItems: 'center', },
    notifyImage: { width: 40, height: 40, marginLeft: '20%' },
    txtmain: { width: dw * 0.4, paddingLeft: '4%' },
    usernametxt: { fontSize: Com_font.txt16, color: Com_color.labletxt, fontWeight: 'bold' },
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
        backgroundColor: '#eee',
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
        backgroundColor: '#eee',
        borderRadius: 10,
        padding: 10,
        // marginHorizontal: 20,
        position: 'absolute',
        top: 15,
        right: 5,
        elevation: 5,
    },
    modalOption: {
        paddingVertical: 10,
        paddingHorizontal: 20,
        // borderBottomWidth: 1,
        // borderBottomColor: '#ccc',
    },
    modalOptionText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333'
    },


};

export default ChatRoom;
