import React, { Component } from 'react'
import { ActivityIndicator, View, TouchableOpacity, Text, Image, Dimensions, StatusBar, Alert } from 'react-native'
import { NavigationActions } from 'react-navigation'
import Config from 'react-native-config'
import Clarifai from 'clarifai'

import BackgroundImage from '../../components/BackgroundImage'
import AnswerNotification from '../../components/AnswerNotification'
import CaptureAndShare from '../../components/CaptureAndShare'
import XPButton from '../../components/XPBouton'

import styles from './styles'

class PredictScreen extends Component {
  static navigationOptions = {
    header: null,
  }

  constructor(props) {
    super(props)

    this.state = {
      loading: true,
      result: false,
      image: null,
    }

    this._cancel = this._cancel.bind(this)
  }

  componentWillMount() {
    const { params } = this.props.navigation.state
    this.setState({image: params.image})
  }

  componentDidMount() {
    const clarifai = new Clarifai.App({
      apiKey: Config.CLARIFAY_KEY
    })

    process.nextTick = setImmediate // RN polyfill

    const { data } = this.state.image
    const file = { base64: data }
    
    clarifai.models.predict(Clarifai.FOOD_MODEL, file)
      .then(response => {
        const { concepts } = response.outputs[0].data

        if (concepts && concepts.length > 0) {
          for (const prediction of concepts) {
            if (prediction.name === 'pizza' && prediction.value > 0.85) {
              this.setState({loading: false, result: 'Pizza'})
              return
            }
            this.setState({result: 'Not Pizza'})
          }
        }

        this.setState({loading: false})
      })
      .catch(e => {
        Alert.alert(
          'Une erreur est survenue',
          'Désolé, le quota est peut-être dépassé, réessaye plus tard !',
          [
            {text: 'OK', onPress: () => this._cancel()},
          ],
          { cancelable: false }
        )
      })
  }

  _cancel() {
    const backAction = NavigationActions.back()
    this.props.navigation.dispatch(backAction)
  }

  render() {
    const { width, height } = Dimensions.get('window')
    const { type, data } = this.state.image
    const sourceImage = `data:${type};base64,${data}`

    if (this.state.loading) {
      return (
        <View style={styles.container}>
          <StatusBar hidden />
          <TouchableOpacity onPress={this._cancel}>
            <Image
              style={{width: width, height: height}}
              source={{uri: sourceImage}}
              resizeMode='contain'
            />
            <View style={styles.loader}>
              <ActivityIndicator size={75} color='#95a5a6' />
              <Text style={{color: 'white', fontSize: 16}}>Analyse en cours...</Text>
            </View>
        </TouchableOpacity>
      </View>
      )
    } else {
      return (
        <BackgroundImage source={{uri: sourceImage}} resizeMode='contain'>
          <StatusBar hidden />
          <AnswerNotification answer={this.state.result} />
          <CaptureAndShare
            title='Partager'
            color='#3498db'
            image={sourceImage}
          />
          <XPButton
            title='Non merci'
            color='black'
            textOnly
            onPress={this._cancel}
          />
        </BackgroundImage>
      )
    }
  }
}

export default PredictScreen