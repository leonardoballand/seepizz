const HockeyApp = require('react-native-hockeyapp')
HockeyApp.configure('ef467e71c1f54d0ca1d5ee615a76fe90', true)
HockeyApp.start()
HockeyApp.checkForUpdate()

import { AppRegistry } from 'react-native'
import { StackNavigator } from 'react-navigation'

import HomeScreen from './screens/HomeScreen'
import PredictScreen from './screens/PredictScreen'

const App = StackNavigator({
  Home: { screen: HomeScreen },
  Prediction: { screen: PredictScreen }
})

AppRegistry.registerComponent('seepizz', () => App)
