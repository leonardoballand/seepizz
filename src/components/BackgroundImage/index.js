import React from 'react'
import { View, Image } from 'react-native'

import styles from './styles'

const BackgroundImage = (props) => {

  const {
    resizeMode,
  } = props

  const containerStyles = [styles.bkg]

  if (resizeMode) {
    containerStyles.push({resizeMode: resizeMode})
  }

  return (
    <View renderToHardwareTextureAndroid style={{flex: 1, alignSelf: 'stretch'}}>
      <Image source={props.source} style={containerStyles}>
        {props.children}
      </Image>
    </View>
  )
}

export default BackgroundImage