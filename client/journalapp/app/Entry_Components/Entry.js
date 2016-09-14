import React, { Component } from 'react';
import DateFormatter from 'dateformat';

import {
  StyleSheet,
  Text,
  TextInput,
  ListView,
  View,
  Dimensions,
  AsyncStorage,
} from 'react-native';

import Swipeout from 'react-native-swipeout';

import styles from '../styles/EntryStyles';

var parseDate = (date) => {
  if (date) {
    date = new Date(date);
    return DateFormatter(date, "ddd, mmm d");
  } else {
    return 'October 10th';
  }
};

export default class Entry extends Component {
  constructor(props) {
    super(props);
    this.props = props;
    this.state = {
      votes: props.votes,
    };
    
    var entryContext = this;
    this.likePost = () => {
      
      var token;
      var user;
      var queryServer = () => {
        fetch('http://localhost:3000/api/likes', {
          method: 'POST',
          headers: {
            'content-type': 'application/json',
            'x-access-token': token,
          },
          body: JSON.stringify({ 
            user: user,
            entryId: props.id, 
          }),
        }).then(function (response) {
          var votesArray = entryContext.state.votes;
          var userIndex = votesArray.indexOf(user);
          if (userIndex === -1) {
            votesArray.push(user);
          } else {
            votesArray.splice(userIndex, 1);
          }
          entryContext.setState({ votes: votesArray });
        }).catch(function (error) {
          console.log(error);
        });
      };

      var queryCounter = 0;
      AsyncStorage.getItem('@MySuperStore:token', (err, retrievedToken) => {
        queryCounter++;
        token = retrievedToken;
        if (queryCounter >= 2) {
          queryServer();
        }
      });

      AsyncStorage.getItem('@MySuperStore:username', (err, username) => {
        queryCounter++;
        user = username;
        if (queryCounter >= 2) {
          queryServer();
        }
      });
    };
  }

  render() {
    return (
      <View style={ styles.container }>
        <View style={ styles.row }>
          <View style={ styles.rowHeader }>
            <Text style={ styles.date }>
              { parseDate(this.props.createdAt) }
            </Text>
            <Text style={ styles.location }>
              { this.props.location }
            </Text>
          </View>
          <View style={ styles.rowBody }>
            <Text style={ styles.entryText }>
              { this.props.text }     
            </Text>
            <Text style={ styles.rating } onPress={ this.likePost }>
              Rating:{ this.state.votes.length }
            </Text>
          </View>
        </View>
      </View>
    )
  }
}
