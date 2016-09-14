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

var likePost = function () {

  AsyncStorage.getItem('@MySuperStore:token', (err, token) => {
    fetch('http://localhost:3000/api/likes', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        'x-access-token': token,
      }
    });
  });

};

var Entry = (props) => (
  <View style={ styles.container }>
    <View style={ styles.row }>
      <View style={ styles.rowHeader }>
        <Text style={ styles.date }>
          { parseDate(props.createdAt) }
        </Text>
        <Text style={ styles.location }>
          { props.location }
        </Text>
      </View>
      <View style={ styles.rowBody }>
        <Text style={ styles.entryText }>
          { props.text }     
        </Text>
        <Text style={ styles.rating } onPress={likePost}>
          Rating:{ props.rating }
        </Text>
      </View>
    </View>
  </View>
);

module.exports = Entry;
