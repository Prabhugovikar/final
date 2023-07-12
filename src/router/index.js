// In App.js in a new project
import * as React from 'react';
import { Root } from 'native-base';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
// import ZegoUIKitPrebuiltCallService, {
//   ZegoCallInvitationDialog, ZegoUIKitPrebuiltCallWaitingScreen, ZegoUIKitPrebuiltCallInCallScreen, ZegoSendCallInvitationButton,
// } from '@zegocloud/zego-uikit-prebuilt-call-rn';

// Screens are Imported  STARTS

//Login module

import Splash from '../screen/Splash/index';
import SignUp from '../screen/SignUp/index';
import OtpVerification from '../screen/OtpVerification/index';
import Fingerprint from '../screen/Fingerprint/index';
import QRcode from '../screen/QRcode/index';
import QRscanner from '../screen/QRscanner/index';
import Sign_In from '../screen/Sign_In/index'
import OtpVerification2 from '../screen/OtpVerification2/index';
import QRscanner2 from '../screen/QRscanner2/index';
import QRcodeUpload from '../screen/QRcodeUpload/index';


import Home from '../screen/Home/index';
import Camera from '../screen/Story/Camera';
import GalleryPicker from '../screen/GalleryPicker';
import NFPicker from '../screen/GalleryPicker/NFPicker';
import Camera1 from '../screen/Story/Camera1';
import ImageEditor from '../screen/Story/ImageEditor';
import ChatRoom from '../screen/ChatRoom';
import StoryPreview from '../screen/Home/Status/StoryPreview';

import ViewOtherContact from '../screen/ViewOtherContact';
import Preview from '../screen/Preview';
import ProfilePreview from '../screen/ProfilePreview';
import ContactSelect from '../screen/ContactSelect/index';
import GroupCreation from '../screen/GroupCreation/index';

import AttachmentPreview from '../screen/AttachmentPreview';
import ChatRoom1 from '../screen/ChatRoom1/index';
import ChatRoom2 from '../screen/ChatRoom2/index';
import ChatRoom3 from '../screen/ChatRoom3/index';
import ChatRoom4 from '../screen/ChatRoom4/index';
import ChatRoom5 from '../screen/ChatRoom5/index';
import ChatRoom6 from '../screen/ChatRoom6/index';
import ChatRoom7 from '../screen/ChatRoom7/index';
import ChatRoom8 from '../screen/ChatRoom8/index';
import ChatRoom9 from '../screen/ChatRoom9/index';
import ChatRoom10 from '../screen/ChatRoom10/index';
import ChatRoom0 from '../screen/ChatRoom0/index';

import Profile from '../screen/Profile';
import Settings from '../screen/Settings';
import ViewGroup from '../screen/ViewGroup';
import Profile1 from '../screen/Profile1';
import Privacy from '../screen/Privacy';
import Accounts from '../screen/Accounts';
import BlockedContact from '../screen/BlockedContact';
import ChangeNumber from '../screen/ChangeNumber';
import ViewMedia from '../screen/ViewMedia';
import AddParticipants from '../screen/AddParticipants/index';
import Report from '../screen/Report/index';
import ReportGroup from '../screen/ReportGroup/index';
import otherStory from '../screen/Home/Status/otherStory';
import Viewers from '../screen/Home/Status/Viewers'

// Screens are Imported  STARTS

const Stack = createNativeStackNavigator();
function App() {
  return (
    <Root>
    <NavigationContainer>
    {/* <ZegoCallInvitationDialog /> */}
      <Stack.Navigator initialRouteName="Splash" screenOptions={{headerShown: false}}>

        {/* Loginmodule */}
        <Stack.Screen name="Splash" component={Splash} />
        <Stack.Screen name="SignUp" component={SignUp} />
        <Stack.Screen name='OtpVerification' component={OtpVerification}/>
        <Stack.Screen name="Fingerprint" component={Fingerprint} />
        <Stack.Screen name="QRcode" component={QRcode}/>
        <Stack.Screen name='QRscanner' component={QRscanner}/>
        <Stack.Screen name='Sign_In' component={Sign_In}/>
        <Stack.Screen name='OtpVerification2' component={OtpVerification2}/>
        <Stack.Screen name='QRscanner2' component={QRscanner2}/>
        <Stack.Screen name='QRcodeUpload' component={QRcodeUpload}/>

        {/* status */}
        <Stack.Screen name='Home' component={Home}/>
        {/* <Stack.Screen name='Story' component={Story}/> */}
        <Stack.Screen name="GalleryPicker" component={GalleryPicker} />
        <Stack.Screen name="NFPicker" component={NFPicker} />
        <Stack.Screen name="Camera1" component={Camera1} /> 
        <Stack.Screen name="Camera" component={Camera}/>
        <Stack.Screen name="ImageEditor" component={ImageEditor}/>
        <Stack.Screen name="ChatRoom" component={ChatRoom} />
        <Stack.Screen name="StoryPreview" component={StoryPreview}/>

        <Stack.Screen name="ViewOtherContact" component={ViewOtherContact}/>
        <Stack.Screen name="Preview" component={Preview}/>
        <Stack.Screen name="ProfilePreview" component={ProfilePreview}/>
        <Stack.Screen name="ContactSelect" component={ContactSelect}/>
        <Stack.Screen name="GroupCreation" component={GroupCreation}/>

        <Stack.Screen name="AttachmentPreview" component={AttachmentPreview} />
        <Stack.Screen name="ChatRoom1" component={ChatRoom1} />
        <Stack.Screen name="ChatRoom2" component={ChatRoom2} />
        <Stack.Screen name="ChatRoom3" component={ChatRoom3} />
        <Stack.Screen name="ChatRoom4" component={ChatRoom4} />
        <Stack.Screen name="ChatRoom5" component={ChatRoom5} />
        <Stack.Screen name="ChatRoom6" component={ChatRoom6} />
        <Stack.Screen name="ChatRoom7" component={ChatRoom7} />
        <Stack.Screen name="ChatRoom8" component={ChatRoom8} />
        <Stack.Screen name="ChatRoom9" component={ChatRoom9} />
        <Stack.Screen name="ChatRoom10" component={ChatRoom10}/>
        <Stack.Screen name="ChatRoom0" component={ChatRoom0}/>

        <Stack.Screen name="Profile" component={Profile}  />
        <Stack.Screen name="Settings" component={Settings} />
        <Stack.Screen name="ViewGroup" component={ViewGroup}/>
        <Stack.Screen name="Profile1" component={Profile1}  />
        <Stack.Screen name="Accounts" component={Accounts}/>
        <Stack.Screen name='Privacy' component={Privacy}/>
        <Stack.Screen name='BlockedContact' component={BlockedContact} />
        <Stack.Screen name="ChangeNumber" component={ChangeNumber}/>
        <Stack.Screen name="ViewMedia" component={ViewMedia} />
        <Stack.Screen name="AddParticipants" component={AddParticipants} />
        <Stack.Screen name="Report" component={Report} />
        <Stack.Screen name="ReportGroup" component={ReportGroup} />
        <Stack.Screen name='otherStory' component={otherStory} />
        <Stack.Screen name='Viewers' component={Viewers} />
        {/* <Stack.Screen
        options={{ headerShown: false }}
        // DO NOT change the name 
        name="ZegoUIKitPrebuiltCallWaitingScreen"
        component={ZegoUIKitPrebuiltCallWaitingScreen}
      />
        <Stack.Screen
          options={{ headerShown: false }}
          // DO NOT change the name
          name="ZegoUIKitPrebuiltCallInCallScreen"
          component={ZegoUIKitPrebuiltCallInCallScreen}
        /> */}
        
      </Stack.Navigator>
    </NavigationContainer>
    </Root>
  );
}

export default App;  