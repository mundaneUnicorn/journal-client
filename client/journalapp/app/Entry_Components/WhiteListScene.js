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

  // componentWillMount() {
  //   getInitialPrivacies();
  // }
  //
  // getInitialPrivacies(entryId) {
  //   AsyncStorage.getItem('@MySuperStore:token', (err, token) => {
  //     fetch('http://localhost:3000/api/entries', {
  //       method: 'GET',
  //       headers: {
  //         'Content-Type': 'application/json',
  //         'x-access-token': token
  //       }
  //     });
  //   });
  // }

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
        <SearchFriends
          navigator={ navigator }
          placeholder={ 'Who can read this?' }/>
      </View>
    );
  }
}
