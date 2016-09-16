import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  ListView,
  View,
  AsyncStorage
} from 'react-native';

// VB: Refactored require to use import, for consistency
import Swipeout from 'react-native-swipeout';
import Entry from './Entry';
import Comment from './Comment';
import styles from '../styles/EntryListStyles';

var EntryList = ({user, token, entries, rerender, userEntries, navigator, updatePostID}) => (
    <ListView
      dataSource={entries}
      style={styles.container}
      renderRow={ (rowData) => {
        let swipeBtn = [{
          text: 'Delete',
          backgroundColor: 'red',
          onPress: () => {
            AsyncStorage.getItem('@MySuperStore:token', (err, token) => {
              fetch('http://localhost:3000/api/entries', {
                method: 'DELETE',
                headers: {
                  'Content-Type': 'application/json',
                  'x-access-token': token,
                },
                body: JSON.stringify({ id: rowData.id })
              }).then(response => {
                console.log('Message deleting entry: ', response);
                if (userEntries) {
                  rerender();
                }
              }).catch(err => {
                console.log('Error deleting entry: ', err);
              })
            })
          }
        }]
        return userEntries ? (
          <View>
            <Swipeout right={swipeBtn} autoClose='true' backgroundColor='transparent'>
              <Entry 
                    navigator={ navigator } 
                    id={ rowData.id } 
                    author={ rowData.user } 
                    entryFeed={ this.props.entryFeed } 
                    user={ user } 
                    token={ token } 
                    votes={ rowData.votes } 
                    text={ rowData.text } 
                    createdAt={ rowData.createdAt } 
                    friendPost={ false } 
                    location={ rowData.location }/>
            </Swipeout>
          </View>
        ) : (<Entry
                 id={ rowData.id }
                 author={ rowData.user } 
                 entryFeed={ this.props.entryFeed } 
                 user={ user } 
                 token={ token } 
                 votes={ rowData.votes } 
                 text={ rowData.text } 
                 createdAt={ rowData.createdAt } 
                 friendPost={ true } 
                 location={ rowData.location } 
                 updateText={ updateText } 
                 updatePostID={ updatePostID }
                 navigator={ navigator }/>)
      }}/>
)

module.exports = EntryList;
