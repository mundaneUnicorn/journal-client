
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
  Image
} from 'react-native';

import DateFormatter from 'dateformat';
import Button from 'react-native-button';
import EntryList from '../Entry_Components/EntryList';

import GeoCoder from 'react-native-geocoder';

import styles from '../styles/EntriesTabStyles';

export default class FeedTab extends Component {
  constructor(props) {
    super(props);
    this.props = props;
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

    this.state = ({
      entries: ds.cloneWithRows([]),
      user: undefined,
      token: undefined,
    });
  }

  getAllFriendsPosts() {
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    var mainContext = this;
    var url = 'http://localhost:3000/api/entries/?userId=*';
    AsyncStorage.getItem('@MySuperStore:token', (err, token) => {
      fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'x-access-token': token
        }
      })
      .then( resp => { resp.json()
        .then( json => {
          console.log('Fetched friends posts', json);
          const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
          mainContext.setState({
            entries: ds.cloneWithRows(json)
          })
        })
        .catch((error) => {
          console.log("fetch error on getrequest:", error)
        });
      });
    });
  } 

  componentWillMount() {
    this.getAllFriendsPosts();
    var entryTabContext = this;

    AsyncStorage.getItem('@MySuperStore:token', (err, retrievedToken) => {
      entryTabContext.setState({ token: retrievedToken });
    });

    AsyncStorage.getItem('@MySuperStore:username', (err, username) => {
      entryTabContext.setState({ user: username });
    });
  }

  render() {

    // Note that the posting of a new message to the database actually occurs in Main.js. When the user 
    // wants to enter a new message, the navigator scene here tells the Navigator in Main.js to render
    // the post new entry view. The onPress method of the Button here sets this off. 
    return (
      <View style={ styles.container }>
        <EntryList 
            navigator={ this.props.navigator } 
            updatePostID={ this.props.updatePostID } 
            user={ this.state.user } 
            token={ this.state.token } 
            entries={ this.state.entries } 
            rerender={ this.getAllFriendsPosts.bind(this) } 
            userEntries={ false } />
      </View>

     )
  }
}

