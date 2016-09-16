import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  ListView,
  View,
  AsyncStorage
} from 'react-native';

export default class Comment extends Component {
  constructor(props) {
    super(props);
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

    this.state = {
      comments: ds.cloneWithRows([])
    };
  }

  getComments() {
    AsyncStorage.getItem('@MySuperStore:token', (err, token) => {
      
    })
  }

  render() {
    return (
      <View>
        <Text>Hello</Text>
        <ListView
          dataSource={ this.state.comments }/>
      </View>
    )
  }
}