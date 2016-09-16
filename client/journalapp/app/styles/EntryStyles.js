import {
  StyleSheet,
  Dimensions,
} from 'react-native';

const styles = StyleSheet.create({
  container: {
    borderBottomWidth: 0.5,
    borderColor: '#cccccc',
    paddingTop: 12,
    paddingBottom:28
  },
  row: {
    flex: 1,
    flexDirection: 'column',
    paddingBottom: 2,
  },
  rowHeader: {
    justifyContent: 'space-between',
    flex: 1,
    flexDirection: 'row',
    marginLeft: 0,
  },
  date: {
    justifyContent: 'flex-start',
    fontSize: 12,
    color: '#999999',
    fontWeight: '500'
  },
  location: {
    justifyContent: 'flex-end',
    fontSize: 11,
    color: '#999999',
    fontWeight: '500'
  },
  rowBody: {
    marginLeft: 0,
    marginTop: 12,
    flexDirection: 'column',
  },
  entryText: {
    justifyContent: 'flex-start',
    fontSize: 15,
    fontWeight: '500',
    color:"#424242",
    paddingRight: 30,
    paddingBottom: 5,
  },
  commentratingContainer: {
    alignSelf: 'flex-end',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center'
  },
  ratingContainer: {
    backgroundColor: '#fafafa',
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignSelf: 'flex-end',
    alignItems: 'center',
    justifyContent: 'center',
  },
  rating: {
    justifyContent: 'center',
    alignSelf: 'center',
    fontSize: 12,
    fontWeight: '500',
    color:"#404040",
  },
  showImage: {
    justifyContent: 'center',
    height: 20,
    width: 21.5,
    alignSelf: 'center',
    marginLeft: 2,
  },
  hideImage: {
    justifyContent: 'center',
    height: 0,
    width: 0,
    alignSelf: 'center',
    marginLeft: 2,
  },
  commentContainer: {
    marginRight: 10
  },
  authorName: {
    justifyContent: 'flex-start',
    fontSize: 14,
    fontWeight: '500',
    color:"#424242",
    paddingRight: 0,
  }
});

module.exports = styles;