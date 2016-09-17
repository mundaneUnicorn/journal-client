import React, { Component } from 'react';
import {
  AppRegistry,
  Text,
  View,
  AsyncStorage,
  ListView } from 'react-native';
import CheckBox from 'react-native-checkbox';
import Icon from 'react-native-vector-icons/MaterialIcons';
import SearchFriends from '../Friend_Components/SearchFriends';
import styles from '../styles/WhiteListSceneStyles';

export default class WhiteListScene extends Component {
  constructor(props) {
    super(props);
    this.props = props;

    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      public: true,
      private: false,
      // Specific will be for the friends who have been clicked
      privacies: [],
      friendList: ds.cloneWithRows([])
    }
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
      .then(res => {
        res.json().then(results => {
          this.setState({ privacies: results });
          this.props.updatePrivacies(results);
        })
      })
    });
  }

  componentWillMount() {
    this.getInitialPrivacies();
    this.fetchFriends();
  }

  componentDidMount() {
    this.render();
  }

  fetchFriends() {
    AsyncStorage.getItem('@MySuperStore:token', (err, token) => {
      fetch('http://localhost:3000/api/friends', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'x-access-token': token
        }
      })
      .then( resp => { resp.json()
        .then( json => {
          if (json.name !== 'SequelizeDatabaseError') {
            console.log('HERE IS THE JSON FRIENDS: ', json);
            const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
            this.setState({
              friendList: ds.cloneWithRows(json)
            });
          };
        }).catch((error) => {
          console.log("error on json():", error)
        });
      }).catch( error => {
        console.log("error on fetch()", error)
      });
    });
  }

  renderRow(rowData) {
    console.log('rowData for friends: ', rowData);
    return (
      <View style={ styles.friend }>
        <Text>{ rowData.fullname }</Text>
      </View>
    )
  }

  render() {
    return (
      <View style={ styles.container }>
        <View style={{ paddingLeft: 6 }}>
          <CheckBox
            checkboxStyle={{width: 18, height: 18}}
            label='Public'
            checked={this.state.all}
            onChange={ () => this.setState({all: !this.state.all, none: !this.state.none }) }
          />
        </View>
        <View style={{ paddingLeft: 6 }}>
          <CheckBox
            checkboxStyle={{width: 18, height: 18}}
            label='Private'
            checked={this.state.none}
            onChange={ () => this.setState({none: !this.state.none, all: !this.state.all }) }
          />
        </View>
        <ListView
          style={ styles.listView }
          dataSource={ this.state.friendList }
          renderRow={ this.renderRow.bind(this) } />
      </View>
    );
  }
}
