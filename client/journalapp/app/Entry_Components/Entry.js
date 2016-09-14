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
    this.likePost = function () {
      AsyncStorage.getItem('@MySuperStore:token', (err, token) => {
        fetch('http://localhost:3000/api/likes', {
          method: 'POST',
          headers: {
            'content-type': 'application/json',
            'x-access-token': token,
          },
          body: JSON.stringify({ 
            user: props.user,
            entryId: props.id, 
          }),
        });
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
              Rating:{ this.props.rating }
            </Text>
          </View>
        </View>
      </View>
    )
  }
}
