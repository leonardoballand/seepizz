import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'stretch',
    alignContent: 'center',
  },
  titleWrapper: {
    height: 80,
    backgroundColor: '#e74c3c',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderColor: 'black',
  },
  title: {
    color: 'white',
    fontSize: 50,
    fontWeight: 'bold'
  },
  subtitleWrapper: {
    height: 40,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderColor: 'black',
  },
  subtitle: {
    color: '#e74c3c',
    fontSize: 25,
    fontWeight: 'bold'
  },
})

export default styles