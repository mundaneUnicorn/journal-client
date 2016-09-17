import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  ListView,
  View,
  AsyncStorage
} from 'react-native';

import DateFormatter from 'dateformat';
import styles from '../styles/CommentStyles';

export default class Comment extends Component {
  constructor(props) {
    super(props);
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

    this.state = {
      comments: ds.cloneWithRows([])
      // comments: ds.cloneWithRows(['job', 'bob', 'hi'])
    };
  }

  componentWillMount() {
    this.getComments();
  }

  componentDidMount() {
    this.render();
  }

  parseDate(date) {
    if (date) {
      date = new Date(date);
      return DateFormatter(date, "ddd, mmm d");
    } else {
      return 'October 10th';
    }
  }

  getComments() {
    AsyncStorage.getItem('@MySuperStore:token', (err, token) => {
      fetch(`http://journal-app-mundane-unicorns.herokuapp.com/api/comment?postID=${this.props.postID}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'x-access-token': token
        }
      }).then(response => {
        response.json().then(json => {
          console.log('returned json: ', json);
          const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
          this.setState({
            comments: ds.cloneWithRows(json)
          })
        }).catch(err => {
          console.log('fetching comments error: ', err);
        })
      }).catch(err => {
        console.log('fetching comments error: ', err);
      })
    })
  }

  renderRow(rowData) {
    console.log('row data: ', rowData);
    return (
      <View style={ styles.comment } >
        <View style={ styles.namedate } >
          <Text style={ styles.name }>{rowData.fullname}</Text>
          <Text style={ styles.date }>{ this.parseDate(rowData.createdAt) }</Text>
        </View>
        <Text style={ styles.message }>{rowData.message}</Text>
      </View>
    )
  }

  render() {
    return (
      <View style={ styles.container }>
        <Text style={ styles.header }>Comments</Text>
        <ListView
          style={ styles.listView }
          dataSource={ this.state.comments }
          renderRow={ this.renderRow.bind(this) } />
      </View>
    )
  }
}