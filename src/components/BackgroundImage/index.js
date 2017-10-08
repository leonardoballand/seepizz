import React from 'react'
import { View, Image, Platform } from 'react-native'
import PropTypes from 'prop-types'

import styles from './styles'

const BackgroundImage = (props) => {

  const {
    resizeMode,
  } = props

  const containerStyles = [styles.bkg]

  if (resizeMode) {
    containerStyles.push({resizeMode: resizeMode})
  }

  const optimizer = Platform.OS === 'android' ? 'renderToHardwareTextureAndroid' : null

  return (
    <View optimizer style={{flex: 1, alignSelf: 'stretch'}}>
      <Image source={props.source} style={containerStyles}>
        {props.children}
      </Image>
    </View>
  )
}

BackgroundImage.propTypes = {
  resizeMode: PropTypes.string,
  source: PropTypes.string,
  children: PropTypes.children
}

export default BackgroundImage