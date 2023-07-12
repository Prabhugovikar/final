import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Switch, Modal, TouchableWithoutFeedback } from 'react-native';
import { RadioButton } from 'react-native-paper';
import Icon from 'react-native-vector-icons/Ionicons';
import IconBack from 'react-native-vector-icons/MaterialCommunityIcons';

class SettingsScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      lastSeenOption: 'myContacts',
      lastSeenEnabled: false,
      lastProfileOption : 'everyone',
      lastProfileEnabled: false,
      lastAboutOption: 'nobody',
      lastAboutEnabled: false,
      lastStatusOption: 'noboday',
      lastStatusEnabled: false,
    };
  }

//Last Seen
  handleLastSeenOptionChange = (option) => {
    this.setState({ lastSeenOption: option });
  };

  toggleLastSeen = () => {
    this.setState((prevState) => ({ lastSeenEnabled: !prevState.lastSeenEnabled }));
  };

  //Profile 
  handleProfileOptionChange = (option) => {
    this.setState({ lastProfileOption: option });
  };

  toggleProfileSeen = () => {
    this.setState((prevState) => ({ lastProfileEnabled: !prevState.lastProfileEnabled }));
  };

  // About

  handleAboutOptionChange = (option) => {
    this.setState({ lastAboutOption: option });
  };

  toggleAboutSeen = () => {
    this.setState((prevState) => ({ lastAboutEnabled: !prevState.lastAboutEnabled }));
  };

  // Status

  handleStatusOptionChange = (option) => {
    this.setState({ lastStatusOption: option });
  };

  toggleStatusSeen = () => {
    this.setState((prevState) => ({ lastStatusEnabled: !prevState.lastStatusEnabled }));
  };


  render() {
    const { lastSeenOption, lastSeenEnabled ,
      lastProfileOption,lastProfileEnabled,
    lastAboutOption,lastAboutEnabled,
  lastStatusOption,lastStatusEnabled } = this.state;
    const { navigation } = this.props;

    return (
      <View style={{ marginTop:0 }}>
        <View style={{flexDirection:'row', backgroundColor:'#ddd', paddingBottom:10}}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
        <IconBack name="keyboard-backspace" color="#111" size={45} style={{ height: 40, width: 40, marginTop:8}} />
      </TouchableOpacity>
        <Text style={styles.name} >Privacy</Text>
        </View>
        <View style={styles.setting}>
        <View style={styles.option}>
          <Text style={styles.optionText}>Who can see my personal info</Text>
          <Text style={styles.optionSubtext}>If you don't share your Last Seen, you won't be able to see other peoples's Last Seen</Text>
        </View>
        </View>

<View style={styles.option}>
        {/* Last Seen View  */}
        <TouchableOpacity onPress={this.toggleLastSeen}>
        <View style={styles.setting}>
        
        <View style={styles.option}>
          
            <Text style={styles.optionText}>Last Seen</Text>
            <Text style={styles.optionSubtext}> Everyone  </Text>
         
          </View>
          <Modal
            visible={lastSeenEnabled}
            transparent={true}
            animationType='slide'
            onRequestClose={() => this.setState({ lastSeenEnabled: false })}
          >
            <TouchableWithoutFeedback onPress={() => this.setState({lastSeenEnabled:false})}>
                                        <View style={{flex:1}}></View>
                                    </TouchableWithoutFeedback>
            <View style={styles.modalContainer}>
              <View style={styles.modalHeader}>
                <Text style={styles.modalHeaderText}>Last Seen</Text>
                <TouchableOpacity onPress={() => this.setState({ lastSeenEnabled: false })}>
                  <Icon name='close' size={24} color='#555' style={styles.modalCloseIcon} />
                </TouchableOpacity>
              </View>
              <TouchableOpacity onPress={() => this.handleLastSeenOptionChange('nobody')}>
                <View style={styles.radioButtonOption}>
                  <RadioButton
                  color='darkblue'
                    value='nobody'
                    status={lastSeenOption === 'nobody' ? 'checked' : 'unchecked'}
                    onPress={() => this.handleLastSeenOptionChange('nobody')}
                  />
                  <Text style={styles.optionSubtext}>Nobody</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => this.handleLastSeenOptionChange('everyone')}>
                <View style={styles.radioButtonOption}>
                  <RadioButton
                    color='darkblue'
                    value='everyone'
                    status={lastSeenOption === 'everyone' ? 'checked' : 'unchecked'}
                    onPress={() => this.handleLastSeenOptionChange('everyone')}
                  />
                  <Text style={styles.optionSubtext}>Everyone</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => this.handleLastSeenOptionChange('myContacts')}>
                <View style={styles.radioButtonOption}>
                  <RadioButton
                    color='darkblue'
                    value='myContacts'
                    status={lastSeenOption === 'myContacts' ? 'checked' : 'unchecked'}
                    onPress={() => this.handleLastSeenOptionChange('myContacts')}
                  />
                  <Text style={styles.optionSubtext}>My Contacts</Text>
                </View>
              </TouchableOpacity>
            </View>
          </Modal>
        </View>
        </TouchableOpacity>

        {/* Profile View */}
        <TouchableOpacity onPress={this.toggleProfileSeen}>
        <View style={styles.setting}>
        <View style={styles.option}>
          
            <Text style={styles.optionText}>Profile Photo</Text>
            <Text style={styles.optionSubtext}> Everyone  </Text>
          
          </View>
          <Modal
            visible={lastProfileEnabled}
            transparent={true}
            animationType='slide'
            onRequestClose={() => this.setState({ lastProfileEnabled: false })}
          >
            <TouchableWithoutFeedback onPress={() => this.setState({lastProfileEnabled:false})}>
                                        <View style={{flex:1}}></View>
                                    </TouchableWithoutFeedback>
            <View style={styles.modalContainer}>
              <View style={styles.modalHeader}>
                <Text style={styles.modalHeaderText}>Profile</Text>
                <TouchableOpacity onPress={() => this.setState({ lastProfileEnabled: false })}>
                  <Icon name='close' size={24} color='#555' style={styles.modalCloseIcon} />
                </TouchableOpacity>
              </View>
              <TouchableOpacity onPress={() => this.handleProfileOptionChange('nobody')}>
                <View style={styles.radioButtonOption}>
                  <RadioButton
                    color='darkblue'
                    value='nobody'
                    status={lastProfileOption === 'nobody' ? 'checked' : 'unchecked'}
                    onPress={() => this.handleProfileOptionChange('nobody')}
                  />
                  <Text style={styles.optionSubtext}>Nobody</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => this.handleProfileOptionChange('everyone')}>
                <View style={styles.radioButtonOption}>
                  <RadioButton
                    color='darkblue'
                    value='everyone'
                    status={lastProfileOption === 'everyone' ? 'checked' : 'unchecked'}
                    onPress={() => this.handleProfileOptionChange('everyone')}
                  />
                  <Text style={styles.optionSubtext}>Everyone</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => this.handleProfileOptionChange('myContacts')}>
                <View style={styles.radioButtonOption}>
                  <RadioButton
                    color='darkblue'
                    value='myContacts'
                    status={lastProfileOption === 'myContacts' ? 'checked' : 'unchecked'}
                    onPress={() => this.handleProfileOptionChange('myContacts')}
                  />
                  <Text style={styles.optionSubtext}>My Contacts</Text>
                </View>
              </TouchableOpacity>
            </View>
          </Modal>
        </View>
        </TouchableOpacity>

        {/* About */}
        <TouchableOpacity onPress={this.toggleAboutSeen}>
        <View style={styles.setting}>
        <View style={styles.option}>
          
            <Text style={styles.optionText}>About</Text>
            <Text style={styles.optionSubtext}> Everyone  </Text>
          </View>
          <Modal
            visible={lastAboutEnabled}
            transparent={true}
            animationType='slide'
            onRequestClose={() => this.setState({ lastAboutEnabled: false })}
          >
            <TouchableWithoutFeedback onPress={() => this.setState({lastAboutEnabled:false})}>
                                        <View style={{flex:1}}></View>
                                    </TouchableWithoutFeedback>            
            <View style={styles.modalContainer}>
              <View style={styles.modalHeader}>
                <Text style={styles.modalHeaderText}>About</Text>
                <TouchableOpacity onPress={() => this.setState({ lastAboutEnabled: false })}>
                  <Icon name='close' size={24} color='#555' style={styles.modalCloseIcon} />
                </TouchableOpacity>
              </View>
              <TouchableOpacity onPress={() => this.handleAboutOptionChange('nobody')}>
                <View style={styles.radioButtonOption}>
                  <RadioButton
                    color='darkblue'
                    value='nobody'
                    status={lastAboutOption === 'nobody' ? 'checked' : 'unchecked'}
                    onPress={() => this.handleAboutOptionChange('nobody')}
                    
                  />
                  <Text style={styles.optionSubtext}>Nobody</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => this.handleAboutOptionChange('everyone')}>
                <View style={styles.radioButtonOption}>
                  <RadioButton
                    color='darkblue'
                    value='everyone'
                    status={lastAboutOption === 'everyone' ? 'checked' : 'unchecked'}
                    onPress={() => this.handleAboutOptionChange('everyone')}
                  />
                  <Text style={styles.optionSubtext}>Everyone</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => this.handleAboutOptionChange('myContacts')}>
                <View style={styles.radioButtonOption}>
                  <RadioButton
                    color='darkblue'
                    value='myContacts'
                    status={lastAboutOption === 'myContacts' ? 'checked' : 'unchecked'}
                    onPress={() => this.handleAboutOptionChange('myContacts')}
                  />
                  <Text style={styles.optionSubtext}>My Contacts</Text>
                </View>
              </TouchableOpacity>
            </View>
          </Modal>
        </View>
        </TouchableOpacity>

       {/* Status */}
       <TouchableOpacity onPress={this.toggleStatusSeen}>
       <View style={styles.setting}>
       <View style={styles.option}>
            <Text style={styles.optionText}>Status</Text>
            <Text style={styles.optionSubtext}>
                  Everyone
                </Text>
          </View>
          <Modal
            visible={lastStatusEnabled}
            transparent={true}
            animationType='slide'
            onRequestClose={() => this.setState({ lastStatusEnabled: false })}
          >
             <TouchableWithoutFeedback onPress={() => this.setState({lastStatusEnabled:false})}>
                                        <View style={{flex:1}}></View>
                                    </TouchableWithoutFeedback>
            <View style={styles.modalContainer}>
              <View style={styles.modalHeader}>
                <Text style={styles.modalHeaderText}>Status</Text>
                <TouchableOpacity onPress={() => this.setState({ lastStatusEnabled: false })}>
                  <Icon name='close' size={24} color='#555' style={styles.modalCloseIcon} />
                </TouchableOpacity>
              </View>
              <TouchableOpacity onPress={() => this.handleStatusOptionChange('nobody')}>
                <View style={styles.radioButtonOption}>
                  <RadioButton
                    color='darkblue'
                    value='nobody'
                    status={lastStatusOption === 'nobody' ? 'checked' : 'unchecked'}
                    onPress={() => this.handleStatusOptionChange('nobody')}
                  />
                  <Text style={styles.optionSubtext}>Nobody</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => this.handleStatusOptionChange('everyone')}>
                <View style={styles.radioButtonOption}>
                  <RadioButton
                    color='darkblue'
                    value='everyone'
                    status={lastStatusOption === 'everyone' ? 'checked' : 'unchecked'}
                    onPress={() => this.handleStatusOptionChange('everyone')}
                  />
                  <Text style={styles.optionSubtext}>Everyone</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => this.handleStatusOptionChange('myContacts')}>
                <View style={styles.radioButtonOption}>
                  <RadioButton
                    color='darkblue'
                    value='myContacts'
                    status={lastStatusOption === 'myContacts' ? 'checked' : 'unchecked'}
                    onPress={() => this.handleStatusOptionChange('myContacts')}
                  />
                  <Text style={styles.optionSubtext}>My Contacts</Text>
                </View>
              </TouchableOpacity>
            </View>
          </Modal>
        </View>
        </TouchableOpacity>

       
        <TouchableOpacity onPress={() => navigation.navigate('BlockedContact')}>
        <View style={styles.setting}>
          <View style={styles.option}>
            <View style={styles.optionContent}>
              <View>
                <Text style={styles.optionText}>Blocked Contacts</Text>
                <Text style={styles.optionSubtext}>
                  None
                </Text>
              </View>
            </View>
          </View>
            
            </View>
            </TouchableOpacity>
            </View>
      </View>
    );
  }
}
export default SettingsScreen;
const styles = StyleSheet.create({
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  optionContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  optionSubtext: {
    fontSize: 14,
    color: '#111',
    // marginLeft: 10,
  },
  optionText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'black',
    // marginLeft: 10,
  },
  option: {
    // borderBottomWidth: 1,
    // borderBottomColor: 'lightgray',
    paddingVertical: 10,
    paddingHorizontal: 20,
    flexDirection: 'column',
    // justifyContent: 'space-between',
  },
  name: {
    marginTop:13,
    fontSize: 25,
    fontWeight: 'bold',
    marginLeft: 25,
    color: '#111'
  },
  radioButtonsContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
      width: '50%',
  },
  radioButtonOption: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    marginRight: 20,
  },
  lastRadioButtonOption: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  selectedOption: {
    fontWeight: 'bold',
  },
  setting: {
    flexDirection: 'row',
    // alignItems: 'center',
    justifyContent: 'space-between',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: 'lightgray',
  },
  modalContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#fff',
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  
  modalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  modalHeaderText: {
    fontSize: 20,
    fontWeight: 'bold',
    color:'#111'
  },
  modalCloseIcon: {
    marginLeft: 10,
  },
  radioButtonOption: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 5,
  },
  modalCancel: {
    color: 'red',
    alignSelf: 'center',
    marginTop: 10,
    fontWeight: 'bold',
  },
});

