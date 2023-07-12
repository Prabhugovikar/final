import React, { Component } from 'react';
import { View, StatusBar } from 'react-native';
import { RNCamera } from 'react-native-camera';
import { deviceHeight as dh, deviceWidth as dw } from '../_utils/CommonUtils';
import { CameraTools } from './camera_utils';

const flashon = require('../../assets/Images/flash_on.png');
const flashoff = require('../../assets/Images/flash_off.png');
const flashauto = require('../../assets/Images/flash_auto.png');

export default class Camera1 extends Component {
  static navigationOptions = {
    header: null,
  };

  constructor(props) {
    super(props);
    this.state = {
      camType: RNCamera.Constants.Type.back,
      flash: {
        mode: RNCamera.Constants.FlashMode.on,
        Index: 0,
        Image: flashon,
      },
    };
  }

  closeCamera() {
    this.props.navigation.goBack();
  }

  changeFlash() {
    const { flash } = this.state;

    if (flash.Index === 0) {
      this.setState({
        flash: {
          Index: 0 + 1,
          mode: RNCamera.Constants.FlashMode.auto,
          Image: flashauto,
        },
      });
    } else if (flash.Index === 1) {
      this.setState({
        flash: {
          Index: 1 + 1,
          mode: RNCamera.Constants.FlashMode.off,
          Image: flashoff,
        },
      });
    } else if (flash.Index === 2) {
      this.setState({
        flash: {
          Index: 0,
          mode: RNCamera.Constants.FlashMode.on,
          Image: flashon,
        },
      });
    }
  }

  _openGallery = () => {
    this.props.navigation.navigate('GalleryPicker', {
      screen: 'ImageEditor',
      type: 'All',
    });
  };

  takePicture = async function () {
    if (this.camera) {
      const options = { quality: 2, base64: true };
      const datas = await this.camera.takePictureAsync(options);
      console.log('the data bf cond', datas);
      if (datas) {
        const data = {
          uri: datas.uri,
          dimensions: {
            height: datas.height,
            width: datas.width,
          },
        };
        this.props.navigation.navigate('ImageEditor', { image: data });
      }
    }
  };

  _turnCamera = () => {
    const { camType } = this.state;
    if (camType == RNCamera.Constants.Type.back) {
      this.setState({ camType: RNCamera.Constants.Type.front });
    } else {
      this.setState({ camType: RNCamera.Constants.Type.back });
    }
  };

  render() {
    const {flash,camType} =this.state
    return (
      <View style={{flex:1}}>
       {/* <StatusBar hidden /> */}
       <StatusBar backgroundColor="black" barStyle='default' />
       {/* <View style={{height:dh,width:dw,}}> */}

         {/* Camera lib */}
         <RNCamera 
           ref={ref => { this.camera = ref; }} 
           style={{flex:1}} 
           type={camType}
           flashMode={flash.mode} 
           permissionDialogTitle={'Permission to use camera'}
           permissionDialogMessage={'Been need your permission to use your camera phone'} 
         />

         {/*Tools for Camera*/}
         <CameraTools 
          flashImage = {flash.Image}
          closeCamera = {()=>this.closeCamera()}
          flashMode = {()=>this.changeFlash()}
          gallery = {()=>this._openGallery()}
          snap = {()=>this.takePicture()}
          cameraTurn = {()=>this._turnCamera()}
         />

       {/* </View>       */}
      </View>
    );
  }
}