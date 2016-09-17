import React, { Component } from 'react';
import { AppRegistry, Text, View, AsyncStorage } from 'react-native';
import CheckBox from 'react-native-checkbox';
import Icon from 'react-native-vector-icons/MaterialIcons';

import SearchFriends from '../Friend_Components/SearchFriends';


export default class WhiteListScene extends Component {
  constructor(props) {
    super(props);
    this.props = props;
    this.state = {
      all: true,
      none: false,
      whiteList: false,
      privacies: []
    }
    console.log('WhitListScene entryId: ', this.props.clickedEntry);
  }

  componentWillMount() {
    this.getInitialPrivacies();
  }

  setPrivacies() {
    var userIds = this.state.privacies.map(function(privEntry) {
      return privEntry.userId;
    })

    AsyncStorage.getItem('@MySuperStore:token', (err, token) => {
      fetch('http://localhost:3000/api/privacy', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-access-token': token
        },
        body: JSON.stringify({
          userIds: userIds,
          entryId: this.props.clickedEntry
        })
      })
      .then(data => console.log('Server results: ', data))
    });
  }

  getInitialPrivacies(entryId) {
    AsyncStorage.getItem('@MySuperStore:token', (err, token) => {
      fetch('http://localhost:3000/api/privacy?entryId=2', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'x-access-token': token
        }
      })
      // .then( res =>  console.log( 'getInitialPrivacies response: ', res.json() ))
      .then(res => {
        res.json().then(results => {
          console.log(results);
        })
      })
    });
  }

  render() {
    return (
      <View style={{
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        paddingTop: 80
      }}>
        <View style={{ paddingLeft: 6 }}>
          <CheckBox
            checkboxStyle={{width: 18, height: 18}}
            label='All'
            checked={this.state.all}
            onChange={ () => this.setState({all: !this.state.all, none: !this.state.none }) }
          />
        </View>
        <View style={{ paddingLeft: 6 }}>
          <CheckBox
            checkboxStyle={{width: 18, height: 18}}
            label='None (This entry is private)'
            checked={this.state.none}
            onChange={ () => this.setState({none: !this.state.none, all: !this.state.all }) }
          />
        </View>
      </View>
    );
  }
}
