import {
  StyleSheet,
  Dimensions
} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    paddingTop: 80
  },
  listView: {
    width: Dimensions.get('window').width * 0.96,
    marginLeft: Dimensions.get('window').width * .02,
    marginRight: Dimensions.get('window').width * .02,
    paddingLeft: 8,
    paddingRight: 8,
    paddingTop: 8,
    borderColor: 'red'
  },
  friend: {
    borderBottomWidth: 1
  }
})

module.exports = styles;