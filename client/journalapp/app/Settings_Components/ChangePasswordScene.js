import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  Navigator,
  TouchableHighlight
} from 'react-native';

import styles from '../styles/ChangePasswordSceneStyles';

export default class ChangePassword extends Component {
  constructor(props) {
    super(props);
    this.props = props;

    this.state = {
      oldPW: '',
      newPW: ''
    }
  }

  updateOldPW(val) {
    this.setState({
      oldPW: val
    })
  }

  updateNewPW(val) {
    this.setState({
      newPW: val
    })
  }

  checkOldPW() {
    AsyncStorage.getItem('@MySuperStore:username', (err, username) => {
      /* check is the password matches */
    })
  }

  render() {
    return (
      <View style={ styles.container }>
        <Text style={ styles.label }>Old password: </Text>
        <TextInput 
          type='TextInput'
          secureTextEntry={ true } 
          style={ styles.textinput }></TextInput>
        <Text style={ styles.label }>New password: </Text>
        <TextInput 
          type='TextInput'
          secureTextEntry={ true }
          style={ styles.textinput }></TextInput>
        <TouchableHighlight 
          onPress={ () => console.log('clicked') } 
          underlayColor='#218c23' 
          style={ styles.button }>
          <Text style={ styles.submit }>Submit</Text>
        </TouchableHighlight>
      </View>
    )
  }
}