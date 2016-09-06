// app/index.js

import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  AsyncStorage,
  Navigator
} from 'react-native';

import FriendList from './FriendList';
import EntryList from './EntryList';

export default class FriendsTab extends Component {
  constructor(props) {
    super(props);
    this.props = props;

    this.state = {
      friendList: [{username:"test", fullname:"test"}]
    };
  };

  componentWillMount(){
    this.getFriends();
  }

  getFriends(){
    AsyncStorage.getItem('@MySuperStore:token', (err, token) => {
      fetch('http://localhost:3000/api/friends', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'x-access-token': token
        }
      })    
      .then( resp => { resp.json()
        .then( json => {
          this.setState({
            friendList: json
          })
        })
        .catch((error) => {
          console.warn("fetch error on getrequest:", error)
        });
      });
    });
  }

  render() {
    return (
      <FriendList friendList={ this.state.friendList } navigator={this.props.navigator} />
    )
  }
}
