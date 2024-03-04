import React from 'react'
import { View, Text, Image, TouchableOpacity } from 'react-native'
import { DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer'
import { COLORS } from '../../constants/theme'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faRightFromBracket } from '@fortawesome/free-solid-svg-icons'
import { scaleFontSize } from '../../assets/styles/scaling'
import { getFontFamily } from '../../assets/fonts/helper'
import styles from './style'

const DrawerContent = (props) => {
  return (
    <View style={{flex: 1}}>
      <DrawerContentScrollView {...props}>
        <View style={styles.topContainer}>
          <Image 
            source={require('../../assets/images/nitc_logo.png')}
            style={styles.profileImage}
            resizeMode={'contain'}
          />
          <View style={styles.userDetailsContainer}>
            <Text style={styles.userNameText}>
              Prasanta Kumar Sethi
            </Text>
            <Text style={styles.userEmailText}>
              prasanta_m210674ca@nitc.ac.in
            </Text>
          </View>
        </View>

        <View>
          <DrawerItemList {...props}/>
        </View>
      </DrawerContentScrollView>

      <View style={styles.bottomContainer}>
        <TouchableOpacity onPress={() => {}}>
          <View style={styles.signOutContainer}>
            <FontAwesomeIcon icon={faRightFromBracket} size={22}/>
            <Text style={styles.signOutText}>Sign Out</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default DrawerContent