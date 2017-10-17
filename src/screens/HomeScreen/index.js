import React, { Component } from 'react'
import { Alert, View, StatusBar, ActivityIndicator } from 'react-native'
import PropTypes from 'prop-types'

import ImagePicker from 'react-native-image-picker'

import Header from '../../components/Header'
import BackgroundImage from '../../components/BackgroundImage'
import XPButton from '../../components/XPBouton'

import styles from './styles'

class HomeScreen extends Component {
  static navigationOptions = {
    header: <Header title='seepizz' subtitle='"The Shazam for Pizza"' />,
  }
  
  constructor() {
    super()

    this.state = {
      loading: false,
    }
    
    this._onClick = this._onClick.bind(this)
    
    this.options = {
      title: 'Sélectionner une image',
      takePhotoButtonTitle: 'Prendre une photo',
      chooseFromLibraryButtonTitle: 'Choisir depuis la galerie',
      cancelButtonTitle: 'Annuler',
      cameraType: 'back',
      mediaType: 'photo',
      storageOptions: {
        skipBackup: true,
        path: 'Seepizz'
      }
    }    
  }

  _onClick() {
    this.setState({ loading: true })
    ImagePicker.showImagePicker(this.options, response => {
      if (response.didCancel) {
        this.setState({ loading: false })
      } else if (response.error) {
        Alert.alert('Erreur', 'Vérifiez vos permissions aux albums photos et à la caméra.', { cancelable: false })
        this.setState({ loading: false })
      } else {
        const { navigate } = this.props.navigation
        navigate('Prediction', { image: response })
        this.setState({ loading: false })
      }
    })
  }

  render() {
    return (
      <View style={styles.container}>
          <StatusBar hidden />
          <BackgroundImage source={require('../../assets/bkg.jpg')}>
            {
              !this.state.loading ?
                  <XPButton
                    title='Analyser une image'
                    onPress={this._onClick}
                  />
              : <ActivityIndicator size="large" color="#e74c3c" />
            }
          </BackgroundImage>
      </View>
    )
  }
}

HomeScreen.propTypes = {
  navigation: PropTypes.object,
}

export default HomeScreen
