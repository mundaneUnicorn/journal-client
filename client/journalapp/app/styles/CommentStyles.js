import {
  StyleSheet,
  Dimensions
} from 'react-native';

var styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center'
  },
  header: {
    height: 30,
    marginBottom: 5,
    fontWeight: '600'
  },
  listView: {
    width: Dimensions.get('window').width * 0.96,
    marginLeft: Dimensions.get('window').width * .02,
    marginRight: Dimensions.get('window').width * .02,
    paddingLeft: 8,
    paddingRight: 8,
    paddingTop: 8,
    backgroundColor: 'red',
  }
})

module.exports = styles;