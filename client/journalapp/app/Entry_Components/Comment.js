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
      // comments: ds.cloneWithRows(['job', 'bob', 'hi'])
    };
  }

  componentWillMount() {
    this.getComments();
  }

  getComments() {
    AsyncStorage.getItem('@MySuperStore:token', (err, token) => {
      fetch('http://localhost:3000/api/comment', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'x-access-token': token
        }
      }).then(response => {
        response.json().then(json => {
          console.log('returned json: ', json);
          const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
          this.setState({
            entries: ds.cloneWithRows(json)
          })
        }).catch(err => {
          console.log('fetching comments error: ', err);
        })
      })
    })
  }

  renderRow(rowData) {
    
  }

  render() {
    return (
      <View>
        <Text>Hello</Text>
        <ListView
          dataSource={ this.state.comments }
          renderRow={ (rowData) => (<Text>{rowData}</Text>) } />
      </View>
    )
  }
}