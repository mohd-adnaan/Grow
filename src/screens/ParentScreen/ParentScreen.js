import { View, Text } from 'react-native'
import React from 'react'
import DrawerScreen from '../DrawerScreen';

const ParentScreen = (navigation) => {
  return (
    <View style={{flex:1}}>
    <DrawerScreen/>
    </View>
  )
}

export default ParentScreen;