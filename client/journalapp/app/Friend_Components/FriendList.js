import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  ListView,
  View,
  AsyncStorage

} from 'react-native';

import Friend from './Friend';
import Swipeout from 'react-native-swipeout';
import styles from '../styles/FriendListStyles';

var FriendList = (props) => {

  var deleteFriend = function(friend) {
    console.log('FRIEND TO DELETE: ', friend);
    AsyncStorage.getItem('@MySuperStore:token', (err, token) => {
      fetch('http://localhost:3000/api/friends', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'x-access-token': token,
        },
        body: JSON.stringify({ /* the friend to be deleted */ })
      }).then(response => {

        /* RERENDER THE PAGE */
        console.log('DELETING FRIEND RESPONSE: ', response.json());

      }).catch(err => {
        console.log('Error deleting friend: ', err);
      })
    })
  }

  return (

    <View>
    <Text key={ 1 } style={ styles.subHeader } >Your Friends</Text>
      { props.friendList.map( (friend) => {
        return (
          <Swipeout right={[{
            text: 'Delete',
            backgroundColor: 'red',
            onPress: () => deleteFriend(friend)
          }]} autoClose='true' backgroundColor='transparent'>
            <Friend
            key={ friend.id }
            username={ friend.username }
            fullname={ friend.fullname }
            id={ friend.id }
            navigator={ props.navigator }
            updateFriend={ props.updateFriend }/>
          </Swipeout>
          );
      }) }

    </View>
  )
};


module.exports = FriendList;