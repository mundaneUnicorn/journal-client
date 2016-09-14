import {
  StyleSheet,
  Dimensions
} from 'react-native';

const styles = StyleSheet.create({
  container: {
    width: Dimensions.get('window').width,
    flex: 1,
    justifyContent: 'flex-start',
    flexDirection: 'column',
    marginTop: 60,
    paddingTop: 20,
    backgroundColor: '#f5f6f6',
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: 'black',
    paddingLeft: 10,
    marginBottom: 8,
    marginTop: 15
  },
  textinput: {
    height: 36,
    borderColor: 'black',
    fontSize: 14,
    color: '#666666',
    backgroundColor: '#fafafa',
    paddingLeft: 10,
    marginLeft: 10,
    marginRight: 10,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: 'grey',
    borderBottomWidth: 1,
    borderRadius: 3
  },
  button: {
    height: 40,
    backgroundColor: '#27b029',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    marginLeft: 20,
    marginRight: 20,
    marginTop: 10,
    borderRadius: 3
  },
  submit: {
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: 20,
    color: 'white',
    fontWeight: '500'
  },
  message: {
    height: 22,
    color: 'black',
    fontWeight: '500',
    marginTop: 15,
    alignSelf: 'center'
  }
})

module.exports = styles;