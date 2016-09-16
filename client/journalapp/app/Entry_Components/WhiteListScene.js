import React, { Component } from 'react';
import { AppRegistry, Text, View } from 'react-native';
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
      specific: ['Jim', 'Dwight']
    }
  }

  render() {
    return (
      <View style={{
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
      }}>
        <Text>
          {'\n'}
          {'\n'}
          {'\n'}
        </Text>
        <View style={{ paddingLeft: 6, paddingTop: 10 }}>
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
        <Text>
          { this.state.specific }
        </Text>
        <SearchFriends
          navigator={ navigator }
          placeholder={ 'Who can read this?' }/>
      </View>
    );
  }
}
