import {
  StyleSheet,
  Dimensions
} from 'react-native';

const styles = StyleSheet.create({
  container: {
    borderColor: 'gray',
    width: Dimensions.get('window').width * 1,
    paddingTop: 70, 
    marginLeft: 0,
    backgroundColor: '#f5f6f6', 
  },
  bodyWidth: {
    marginLeft: Dimensions.get('window').width * .05,
    marginRight: Dimensions.get('window').width * .05,
  },
  fadedText: {
    fontSize: 16,
    color: 'gray',
    fontWeight: 'bold',
  }, 
})

module.exports = styles;