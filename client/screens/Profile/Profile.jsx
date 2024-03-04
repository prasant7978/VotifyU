import React from 'react'
import styles from './style'
import { View, Text } from 'react-native'
import FooterMenu from '../../components/Menus/FooterMenu'

const Profile = () => {
  return (
    <View>
      <Text style={{color: '#000000'}}>Profile</Text>

      <FooterMenu/>
    </View>
  )
}

export default Profile