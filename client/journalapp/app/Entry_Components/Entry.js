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
  Image,
  TouchableHighlight,
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
    this.state = {
      user: undefined,
      token: undefined,
      full: styles.hideImage,
      empty: styles.showImage,
    };

  }

  likePost() {
    var entryContext = this;
    fetch('http://localhost:3000/api/likes', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        'x-access-token': entryContext.state.token,
      },
      body: JSON.stringify({ 
        user: entryContext.state.user,
        entryId: entryContext.props.id, 
      }),
    }).then(function (response) {
      var votesArray = entryContext.props.votes;
      var userIndex = votesArray.indexOf(entryContext.state.user);

      if (userIndex === -1) {
        votesArray.push(entryContext.state.user);
        entryContext.setState({ 
          full: styles.showImage,
          empty: styles.hideImage,
        });
      } else {
        votesArray.splice(userIndex, 1);
        entryContext.setState({ 
          full: styles.hideImage,
          empty: styles.showImage,
        });
      }
      entryContext.forceUpdate();
    }).catch(function (error) {
      console.log(error);
    });
  }

  componentWillMount() {
    
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
            <TouchableHighlight style={ styles.ratingContainer } onPress={ this.likePost.bind(this) }>
              <View style={ styles.ratingContainer }>
                <Text style={ styles.rating }>
                  { this.props.votes.length }
                </Text> 
                <Image style={ this.state.empty } source={require('../images/empty_heart.png')}></Image>
                <Image style={ this.state.full } source={require('../images/full_heart.png')}></Image>
              </View>
            </TouchableHighlight>
          </View>
        </View>
      </View>
    );
  }
}
