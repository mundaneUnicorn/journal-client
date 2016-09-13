// app/index.js

import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  ListView,
  View,
  AsyncStorage,
  Dimensions,
  TouchableHighlight
} from 'react-native';

import Button from 'react-native-button';
import Icon from 'react-native-vector-icons/MaterialIcons';

import styles from '../styles/SettingsTabStyles';

export default class SettingsTab extends Component {
  constructor(props) {
    super(props);
    this.props = props;
    this.state = {
      username: ''
    }
    AsyncStorage.getItem('@MySuperStore:username', (err, username) => {
      this.setState({
        username: username
      });
    });
  }

  render() {
    console.log('signout tab');

   return (
    <View style={ styles.container }>

      <Text style={ styles.subHeader }>Profile information</Text>
      <TouchableHighlight onPress={ () => console.log('/* navigate to new scene */') }>
        <View style={ styles.rowContainer }>
          <View style={ styles.row }>
            <Text style={ styles.bodyText }>Username: { this.state.username }</Text>
            <Icon style= {styles.arrow} name="navigate-next" ></Icon>
          </View>
        </View>
      </TouchableHighlight>

      <TouchableHighlight onPress={ () => this.props.navigator.push({title: 'PasswordScene'}) }>
        <View style={ styles.rowContainer }>
          <View style={ styles.row }>
            <Text style={ styles.bodyText }>Change password</Text>
            <Icon style= {styles.arrow} name="navigate-next" ></Icon>
          </View>
        </View>
      </TouchableHighlight>

      <Button onPress= { () => this.props.signOut() } style={ {padding: 20} }>Sign Out</Button>
    </View>
   )
 }
}

