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
      public: null,
      private: null,
      privacies: [],
      friendList: ds.cloneWithRows([]),
      checks: {},
      currentUserId: null
    }
  }

  getInitialPrivacies(entryId) {
    AsyncStorage.getItem('@MySuperStore:token', (err, token) => {
      fetch(`http://localhost:3000/api/privacy?entryId=${entryId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'x-access-token': token
        }
      })
      .then(res => {
        res.json().then(results => {
          /*
          results is an object looking like:
          {
            privacies: [array of privacy objects],
            currentuserid: NUMBER
          }
          */
          console.log('PRIVACIES RETURNED FROM SERVER: ', results)

          this.setState({ privacies: results.privacies, currentUserId: results.currentUserId });
          this.props.updatePrivacies(results.privacies);

          var checkmarks = {};
          results.privacies.forEach(obj => {
            checkmarks[obj.userId] = true;
          })
          this.setState({ checks: checkmarks });
          this.check();
        })
      })
    });
  }

  componentWillMount() {
    this.getInitialPrivacies(this.props.clickedEntry);
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
      .then( resp => { 
        resp.json().then( json => {
          if (json.name !== 'SequelizeDatabaseError') {
            const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
            this.setState({
              friendList: ds.cloneWithRows(json)
            });
          };
        }).catch((error) => {
          console.log("error on json():", error)
        })
      }).catch( error => {
        console.log("error on fetch()", error)
      });
    });
  }

  check() {
    if (!this.state.privacies.length) {
      this.setState({ public: true, private: false });
      return true;
    } else if (this.state.privacies.length === 1) {
      this.setState({ public: false, private: true });
      return false;
    } else {
      this.setState({
        public: false,
        private: false
      })
    }
  }

  renderRow(rowData) {
    return (
      <View style={ styles.friend }>
        <CheckBox 
          checkboxStyle={ styles.checkbox }
          label={ rowData.fullname }
          checked={ this.state.public ? true : (this.state.private ? false : (this.state.checks[rowData.id] || false)) }
          onChange={ () => {
            var entry = this.props.clickedEntry;
            var obj = JSON.parse(JSON.stringify(this.state.checks));
            obj[rowData.id] = !obj[rowData.id];
            this.setState({
              checks: obj
            })
            console.log('checks: ', obj);
            var privacyArr = this.state.privacies.length ? this.state.privacies : [{ userId: this.state.currentUserId, entryId: entry }];

            ids = this.state.privacies.map(item => {
              return item.userId;
            })
            var i = ids.indexOf(rowData.id);
            if (i < 0) {
              privacyArr.push({ userId: rowData.id, entryId: entry });
            } else {
              privacyArr.splice(i, 1);
            }

            if (privacyArr.length === 1) {
              this.setState({
                public: false,
                private: true,
                checks: {}
              })
              this.props.updatePrivacies([-10]);
            } else if (privacyArr.length === this.state.friendList.rowIdentities[0].length + 1) {
              this.setState({
                privacies: [],
                public: true,
                private: false
              });
              this.props.updatePrivacies([]);
            } else {
              this.setState({
                privacies: privacyArr,
                public: false,
                private: false
              })
              this.props.updatePrivacies(privacyArr);
            }
            console.log('privacy arr: ', privacyArr);
          } } />
      </View>
    )
  }

  render() {
    return (
      <View style={ styles.container }>
        <View style={{ paddingLeft: 6 }}>
          <CheckBox
            checkboxStyle={ styles.checkbox }
            label='Public'
            checked={this.state.public}
            onChange={ () => {
              var pub = this.state.public;
              this.setState({
                public: !pub, 
                private: pub, 
                privacies: pub ? [] : [{ userId: this.state.currentUserId, entryId: this.props.clickedEntry }],
                checks: {}
              });
              this.props.updatePrivacies(pub ? [] : [-10]);
            }}
          />
        </View>
        <View style={{ paddingLeft: 6 }}>
          <CheckBox
            checkboxStyle={ styles.checkbox }
            label='Private'
            checked={this.state.private}
            onChange={ () => {
              var priv = this.state.priv;
              this.setState({
                private: !priv, 
                public: priv, 
                privacies: priv ? [{userId: this.state.currentUserId, entryId: this.props.clickedEntry}] : [],
                checks: {}
              });
              this.props.updatePrivacies(priv ? [-10] : []);
            }}
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


// initial get request will give me an object containing: 
// (1) your own userId
// (2) and an array of privacy objects

// {
//   privacies: [PRIVACY OBJECTS],
//   currentUserId: INTEGER
// }

// the privacy objects will have the userId (of the whitelisted friend) and entryId:

// {
//   userId: INTEGER,
//   entryId: INTEGER
// }

// IF IT'S PUBLIC THEN THE PRIVACIES ARRAY IS EMPTY
// IF IT'S PRIVATE THEN THE PRIVACIES ARRAY WILL HAVE ONLY THE CURRENT USER ID
// OTHERWISE THE PRIVACIES ARRAY WILL HAVE THE USER IDS OF THE WHITELISTED FRIENDS PLUS CURRENT USER