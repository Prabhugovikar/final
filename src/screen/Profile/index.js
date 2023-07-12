import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity,TextInput,Alert } from 'react-native';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import Icon from 'react-native-vector-icons/FontAwesome'
import AsyncStorage from '@react-native-async-storage/async-storage';
import IconBack from 'react-native-vector-icons/MaterialCommunityIcons';
import {
  DEVICE_HEIGHT as dh,
  DEVICE_WIDTH as dw,
  STRING_VALIDATION,
} from '../../utils';
import { API_URL, ProfileImagesPath } from '../../service';

import { ScrollView } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';

class ProfileScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      mobilenumber: '',
      profilePicture: '', 
      about: '',
      newAbout:'',
      editingName: false,
      editingAbout:false,
      newName: '',
      id:'',
    };
    // this.openGallery = this.openGallery.bind(this);
  }

  async componentDidMount( ) {
    const mynumber = (await AsyncStorage.getItem('profileid')).replace(/"/g, '');
    console.log(mynumber);
    this.state.id=mynumber
  var raw = "";

var requestOptions = {
  method: 'GET',
  body: raw,
  redirect: 'follow'
};

await fetch(API_URL+`getProfile/${this.state.id}`, requestOptions)
  .then(response => response.json())
  .then((result) => {
    console.log(result);

    this.setState({
      profilePicture: result.response.profile_img,
      name:result.response.name,
      about:result.response.about,
      mobilenumber:result.response.mobilenumber
  })
console.log(this.state.profilePicture)
})
  .catch(error => console.log('error', error));

 }

handleEditName = () => {
  const { name } = this.state;
  this.setState({ newName: name, editingName: true });
};

handleSaveName = async () => {
  const { newName } = this.state;
  this.setState({ name: newName, editingName: false });

  var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      "name": newName,
      "userid": this.state.id
    });

    var requestOptions = {
      method: 'PUT',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };

    fetch(API_URL+"updateProfile", requestOptions)
      .then(response => response.json())
      .then(result => {
        console.log(result)
        this.setState({
          name: result.response.name
        })
      })
      .catch(error => console.log('error', error));

};


// For About
handleEditAbout = () => {
  const { about } = this.state;
  this.setState({ newAbout: about, editingAbout: true });
};

handleSaveAbout = () => {
  const { newAbout } = this.state;
  this.setState({ about: newAbout, editingAbout: false });

      var myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");

      var raw = JSON.stringify({
        "about": newAbout,
        "userid": this.state.id
      });

      var requestOptions = {
        method: 'PUT',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
      };

      fetch(API_URL+"updateProfile", requestOptions)
        .then(response => response.json())
        .then(result => console.log(result))
        .catch(error => console.log('error', error));

};


async uploadImage() {

    const photo = { uri : this.state.image.assets[0].uri,
        type : this.state.image.assets[0].type,
        name: this.state.image.assets[0].fileName,
  };
  console.log('profilepic',photo)

  

  var formdata = new FormData();
  formdata.append("profile_img", photo);
  formdata.append("userid", this.state.id);

  var requestOptions = {
    method: 'PUT',
    body: formdata,
    redirect: 'follow'
  };

  fetch(API_URL + "updateProfile", requestOptions)
    .then(response => response.json())
    .then((result) => {
      console.log(result);
      // this.getProfile()

        this.setState({
          profilePicture: result.response.profile_img,
          name:result.response.name,
          about:result.response.about

      })
      console.log(this.state.profilePicture)
      console.log(this.state.name)
      console.log(this.state.about)
    }
    )
    .catch(error => console.log('error', error));

  // var formdata = new FormData();
  // formdata.append("profile_img",photo);
  
  // var requestOptions = {
  //   method: 'PUT',
  //   body: formdata,
  //   redirect: 'follow'
  // };
  
  // await fetch(API_URL+`updateProfile/${this.state.id}`, requestOptions)
  //   .then(response => response.json())
  //        .then((result) => {
  //       console.log(result);

  //       this.setState({
  //         profilePicture: result.response.profile_img,
  //         name:result.response.name,
  //         about:result.response.about



  //     })
  //     console.log(this.state.profilePicture)
  //     console.log(this.state.name)
  //     console.log(this.state.about)
  //     }
  //   )
  //   .catch(error => console.log('error', error));
  }
HandleProfilePictureChange = () => {
    const options = {
      mediaType: 'photo',
      quality: 3,
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
                this.state.image=response;
                // call API to upload the new image
                this.uploadImage(response.base64);
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
                this.state.image=response;
                console.log()
                // call API to upload the new image
                this.uploadImage();
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


  // deleteAccount = () => {
  //   var requestOptions = {
  //     method: 'DELETE',
  //     redirect: 'follow'
  //   };
  
  //   fetch(API_URL+`deleteAccount/${this.state.id}`, requestOptions)
  //     .then(response => response.json())
  //     .then(result => {
  //       console.log(result);
  //       if (result.status == "Success") {
  //         // Clear internal storage
  //         AsyncStorage.clear().then(() => {
  //           this.props.navigation.navigate('SignUp');
  //         });
  //       }
  //     })
  //     .catch(error => console.log('error', error));
  // }
  
  deleteAccount = () => {
    Alert.alert(
      'Confirm',
      'Are you sure you want to delete your account?',
      [
        {
          text: 'Cancel',
          style: 'cancel'
        },
        {
          text: 'OK',
          onPress: () => {
            var requestOptions = {
              method: 'DELETE',
              redirect: 'follow'
            };
  
            fetch(API_URL+`deleteAccount/${this.state.id}`, requestOptions)
              .then(response => response.json())
              .then(result => {
                console.log(result);
                if (result.status == "Success") {
                  // Clear internal storage
                  AsyncStorage.clear().then(() => {
                    this.props.navigation.navigate('SignUp');
                  });
                }
              })
              .catch(error => console.log('error', error));
          }
        }
      ]
    );
  }
  

  render() {
    const { name, mobilenumber, profilePicture,editingName,editingAbout, newName,about,newAbout} = this.state;
    const{navigation} = this.props;
    return (
      <SafeAreaView style={{flex:1}}>
      <View style={styles.container}>
        <View style={{flexDirection:'row',marginTop:10}}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
        <IconBack name="keyboard-backspace" color="black" size={50} style={{ height: 40, width: 40}} />
      </TouchableOpacity>
        <Text style={styles.name} >Profile</Text>
       
        </View>
       <View style={{marginTop:15}} >
        <TouchableOpacity onPress={()=>navigation.navigate('ProfilePreview', {image : profilePicture })}
        >
       <Image
  source={
    profilePicture
      ? { uri: ProfileImagesPath + profilePicture }
      :  require('../../assets/Profile/Emptypic.png')
  }
  style={styles.profilePicture}
/>
</TouchableOpacity>
  <TouchableOpacity onPress={this.HandleProfilePictureChange} style={styles.cameraIconContainer}>
    <Icon name="camera" size={35} color="darkblue" />
  </TouchableOpacity>


</View>


{/* For Name */}
<ScrollView>
<View style={{ padding: 16 ,marginTop:20, marginLeft:20,}}>
<Text style={styles.label}>Name</Text>
  {editingName ? (
    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
      
      <TextInput
        style={{ flex: 1, fontSize: 16, marginVertical: 16 }}
        placeholder="Enter your name"
        value={newName}
        onChangeText={(text) => this.setState({ newName: text })}
      />
      <TouchableOpacity onPress={this.handleSaveName}>
        <Text style={{ color: 'darkblue', fontSize: 16 }}>Save</Text>
      </TouchableOpacity>
    </View>
  ) : (
    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
      <Text style={{ fontSize: 16 }}>{name}</Text>
      <TouchableOpacity onPress={this.handleEditName} style={{ position: 'absolute', right:20, top: 16 }}>
        <Icon name="pencil" size={20} color="darkblue"/>
      </TouchableOpacity>
    </View>
  )}
</View>

{/* For About */}
<View style={{ padding: 16 ,marginTop:20, marginLeft:20,}}>
  
<Text style={styles.label}>About</Text>
  {editingAbout ? (
    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
      
      <TextInput
        style={{ flex: 1, fontSize: 16, marginVertical: 16 }}
        placeholder="Enter your about"
        value={newAbout}
        onChangeText={(text) => this.setState({ newAbout: text })}
      />
      <TouchableOpacity onPress={this.handleSaveAbout}>
        <Text style={{ color: 'darkblue', fontSize: 16 }}>Save</Text>
      </TouchableOpacity>
    </View>
  ) : (
    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
      <Text style={{ fontSize: 16 }}>{about}</Text>
      <TouchableOpacity onPress={this.handleEditAbout} style={{ position: 'absolute', right:20, top: 16 }}>
        <Icon name="pencil" size={20} color="darkblue"/>
      </TouchableOpacity>
    </View>
  )}
</View>
        <View style={{ padding: 16 ,marginTop:20, marginLeft:20,}}>
          <Text style={styles.label}>Phone Number</Text>
          <Text style={styles.text}>{mobilenumber}</Text>
        </View>

{/* delete */}

<View>
     <TouchableOpacity onPress={this.deleteAccount}  style={{marginTop:30,height:50,width:300,
            backgroundColor:"darkblue",borderRadius:10,alignSelf:'center'
            }}>
  <Text style={{marginTop :10, fontWeight:'bold',alignSelf:'center',fontSize:17,
  color:'#ffcc00',letterSpacing:0.03,fontFamily:'sans-serif'}}>
                    Delete My Account</Text>
        </TouchableOpacity>
            </View>
            </ScrollView>
      </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor:'#fff'
     
      // marginTop:20,
    },
   
    input: {
        height: 40,
        borderColor: 'gray',
        paddingLeft: 10,
        paddingRight: 10,   
        fontSize: 16,
      },
    name: {
        marginTop:13,
        fontSize: 20,
        fontWeight: 'bold',
        marginLeft: 25,
        color:'black'
      },
      profilePicture: {
        width: dw,
        height: 260,
        // resizeMode: 'contain',
        marginBottom: 16,
        borderColor:'#ddd',
        borderWidth:1
      },
      cameraIconContainer: {
        position: 'absolute',
        bottom: 0,
        right: 6,
        backgroundColor: '#fff',
        borderRadius: 20,
        padding: 5,
      },
    fieldContainer: {
      width: '100%',
      marginTop:25,
      marginBottom: 16,
      marginLeft:12,
    },
    label: {
      fontSize: 16,
      fontWeight: 'bold',
      marginBottom: 8,
      color:'black'
     
    },
    text: {
      fontSize: 16,
    },
  });

export default ProfileScreen;
