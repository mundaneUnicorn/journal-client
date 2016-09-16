import React, { Component } from 'react';
import {
  View,
  Text,
  TextInput,
  Dimensions,
  AsyncStorage,
  TouchableHighlight,
  Stylesheet
} from 'react-native';

import Comment from './Comment';
import styles from '../styles/CommentSceneStyles';

export default class CommentScene extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dynamicHeight: () => { return {height: Dimensions.get('window').height - 70 - 460}}
    };
  }

  componentDidMount(){
    this.props.updateComment('');
  }

  render() {
    return (
      <View style={ styles.container }>
        <TextInput 
          keyboardType='default'
          keyboardAppearance='light' 
          multiline={ true }
          maxLength={ 420 }
          placeholder='Write a comment right over here dude...'
          style={ [this.state.dynamicHeight(), styles.bodyWidth, styles.fadedText, styles.textBox] }
          onChangeText={ (text) => this.props.updateComment(text) }/>
        <Comment style={ styles.comments } />
      </View>
    )
  }
}