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
    height: 25,
    fontWeight: '700',
    fontSize: 20
  },
  listView: {
    width: Dimensions.get('window').width * 0.96,
    marginLeft: Dimensions.get('window').width * .02,
    marginRight: Dimensions.get('window').width * .02,
    paddingLeft: 8,
    paddingRight: 8,
    paddingTop: 8,
  },
  comment: {
    borderBottomWidth: 1,
    borderColor: '#dcdcdc',
    paddingLeft: 5,
    paddingRight: 5,
    paddingBottom: 5,
    marginBottom: 10
  },
  namedate: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: 20
  },
  name: {
    color: '#1e90ff',
    fontWeight: '600',
    paddingRight: 10,
    alignSelf: 'flex-start'
  },
  date: {
    color: '#d3d3d3',
    alignSelf: 'flex-end'
  },
  message: {
    paddingLeft: 15,
    paddingRight: 15
  }
})

module.exports = styles;