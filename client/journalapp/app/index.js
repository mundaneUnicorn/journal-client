import React, { Component } from 'react';

import {
    AsyncStorage
} from 'react-native';


import AuthParent from './Signup_Login_Components/AuthParent';
import Main from './Main';

export default class Journalapp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedIn: false
    };
  }

  componentWillMount(){
    AsyncStorage.getItem('@MySuperStore:token', (err, token) => {
      var message = {text:this.state.text};
      if (token) {
        this.updateStatus(true);
      }
    });
  }

  signOut(){
    AsyncStorage.removeItem('@MySuperStore:token', (err) => {
      if (err) {console.log('Error: ', err)}
      this.updateStatus(false);
    })
  }

  updateStatus(status) {
    this.setState({
      loggedIn: status
    })
  }

  render() {
    console.disableYellowBox = true;
    return this.state.loggedIn ?
    (<Main signOut={ this.signOut.bind(this) }/>) :
    (<AuthParent updateStatus={this.updateStatus.bind(this)}/>)
  }
}
