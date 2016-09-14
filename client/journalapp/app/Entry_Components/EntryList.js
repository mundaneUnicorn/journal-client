import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  ListView,
  View
} from 'react-native';

// VB: Refactored require to use import, for consistency
// import Swipeout from 'react-native-swipeout';
var Swipeout = require('react-native-swipeout');
import Entry from './Entry';
import styles from '../styles/EntryListStyles';

var EntryList = ({entries}) => (
    <ListView style ={styles.container}
      dataSource={entries}
      renderRow={ (rowData) => {
        let swipeBtn = [{
          text: 'Delete',
          backgroundColor: 'red',
          underlayColor: 'rgba(0, 0, 0, 1, 0.6)',
          onPress: () => {
            // this.deleteNote(rowData)
          }
        }]
        return (
          <Swipeout right={swipeBtn}>
            <Entry id={ rowData.id } votes={ rowData.votes } text={ rowData.text } createdAt={ rowData.createdAt } location={ rowData.location }/>
          </Swipeout>
        )
      }}/>
)

module.exports = EntryList;

