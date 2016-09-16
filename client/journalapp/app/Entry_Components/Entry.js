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

var moddedStyle = {
  borderBottomWidth: 0.5,
  borderColor: '#cccccc',
  paddingTop: 40,
  paddingBottom:12
}

export default class Entry extends Component {
  constructor(props) {
    super(props);
    this.props = props;
    this.state = {
      entryStyle: props.friendPost ? moddedStyle : styles.container
    }
  }

  updateCurrentEntry() {
    this.props.updatePostID(this.props.id);
  }

  likePost() {
    var entryContext = this;
    fetch('http://localhost:3000/api/likes', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        'x-access-token': entryContext.props.token,
      },
      body: JSON.stringify({
        user: entryContext.props.user,
        entryId: entryContext.props.id,
      }),
    }).then(function (response) {
      var votesArray = entryContext.props.votes;
      var userIndex = votesArray.indexOf(entryContext.props.user);

      if (userIndex === -1) {
        votesArray.push(entryContext.props.user);
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

  checkLikesForFullHeart() {
    var userIndex = this.props.votes.indexOf(this.props.user);
    if (userIndex === -1) {
      return styles.hideImage;
    } else {
      return styles.showImage;
    }
  }

  checkLikesForEmptyHeart() {
    var userIndex = this.props.votes.indexOf(this.props.user);
    if (userIndex === -1) {
      return styles.showImage;
    } else {
      return styles.hideImage;
    }
  }

  allowComments() {
    if (this.props.friendPost) {
      return (
        <TouchableHighlight style={ styles.commentContainer } underlayColor='#dcdcdc' onPress={ this.addComment.bind(this) }>
          <Text style={ styles.rating } style={{color: 'blue'}}>Comment</Text>
        </TouchableHighlight>
      )
    }
  }

  addComment() {
    this.updateCurrentEntry();
    this.props.navigator.push({ title: 'CommentScene' })
  }

  render() {
    return (
      <View style={ this.state.entryStyle }>
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

            <View style={ styles.commentratingContainer }>

              { this.allowComments() }

              <TouchableHighlight style={ styles.ratingContainer } onPress={ this.likePost.bind(this) }>
                <View style={ styles.ratingContainer }>
                  <Text style={ styles.rating }>
                    { this.props.votes.length }
                  </Text>
                  <Image style={ this.checkLikesForEmptyHeart() } source={require('../images/empty_heart.png')}></Image>
                  <Image style={ this.checkLikesForFullHeart() } source={require('../images/full_heart.png')}></Image>
                </View>
              </TouchableHighlight>
            </View>
          </View>
        </View>
      </View>
    );
  }
}
