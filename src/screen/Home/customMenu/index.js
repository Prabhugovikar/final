import React, {useEffect, Component} from 'react';
import {
  View,
  TouchableOpacity,
  Image,
  StatusBar,
  Text,
  TextInput,
  ScrollView,
  BackHandler,
  Alert,
} from 'react-native';
import Menu, {MenuItem, MenuDivider} from 'react-native-material-menu';
import IconDot from 'react-native-vector-icons/Entypo';

class CustomMenu extends Component {
    constructor(props) {
      super(props);
      this._menu = null;
    }
  
    render() {
      return (
        <View>
          <Menu
            ref={ref => (this._menu = ref)}
            button={
              <TouchableOpacity onPress={() => this._menu.show()}>
                <IconDot
                  style={{marginLeft: '17%'}}
                  name="dots-three-vertical"
                  size={20}
                />
              </TouchableOpacity>
            }>
            <MenuItem
              onPress={() => {
                this.props.navigation.navigate('Newgroup');
              }}>
              New group
            </MenuItem>
            <View style={{borderBottomColor: '#3b3b3b', borderBottomWidth: 0.5}} />
            <MenuItem
              onPress={() => {
                Alert.alert('Settings PopUp Menu Button Clicked...');
              }}>
              Settings
            </MenuItem>
          </Menu>
        </View>
      );
    }
  }
  
  export default CustomMenu;