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
      dynamicHeight: () => { return {height: Dimensions.get('window').height - 70}}
    };
  }

  componentDidMount(){
    this.props.updateComment('');
  }

  moveUpForKeyboardShow(){
    setTimeout( ()=> {
      this.setState(
        { dynamicHeight : () => { return { height: Dimensions.get('window').height * .45 }} }
      );
    }, 200); 
  }

  moveDownForKeyboardHide(){
    this.setState(
      { dynamicHeight : () => { return {height: Dimensions.get('window').height - 49 - 70}} }
    );
  }

  render() {
    return (
      <View style={ styles.container }>
        <TextInput 
          keyboardType='default'
          keyboardAppearance='light' 
          multiline={ true }
          maxLength={ 600 }
          placeholder='Write a comment right over here dude...'
          style={ [this.state.dynamicHeight(), styles.bodyWidth, styles.fadedText] }
          onChangeText={ (text) => this.props.updateComment(text) }
          onFocus= { this.moveUpForKeyboardShow.bind(this) }
          onBlur= { this.moveDownForKeyboardHide.bind(this) }/>
      </View>
    )
  }
}