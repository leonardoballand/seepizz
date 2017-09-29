import { StyleSheet, Dimensions } from 'react-native'

const styles = {
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 100,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  notifValid: {
    backgroundColor: 'green',
  },
  notifError: {
    backgroundColor: 'red',
  },
  text: {
    color: 'white',
    fontSize: 30,
    fontWeight: 'bold',
  },
  icon: {
    width: 30,
    height: 30,
    margin: 5,
  }
}

export default styles