import React, { useContext } from 'react'

import styles from './style'

import { View, Text, Image, TouchableOpacity, Alert } from 'react-native'

import { DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer'

import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faRightFromBracket } from '@fortawesome/free-solid-svg-icons'

import { AuthContext } from '../../context/aurhContext'

import AsyncStorage from '@react-native-async-storage/async-storage'

import Snackbar from 'react-native-snackbar'

import { getFontFamily } from '../../assets/fonts/helper'

import InitialAvatar from '../InitialAvatar/InitialAvatar'

const DrawerContent = (props) => {
  // global state
  const [userState, setUserState] = useContext(AuthContext);

  const profileImage = userState.user.userType === 'student' ? userState.user.studentProfileImage : userState.user.adminProfileImage;
  const userName = userState.user.userType === 'student' ? userState.user.studentName : userState.user.adminName;
  
  const handleSignOut = async() => {
    // set the authContext to null
    setUserState({
      user: null,
      token: ''
    });

    // delete the token in storage
    AsyncStorage.removeItem('@auth-token')

    Snackbar.show({
      text: 'Sign Out Successfull',
      duration: Snackbar.LENGTH_SHORT,
      fontFamily: getFontFamily('Inter', '400')
    })
  }

  return (
    <View style={{flex: 1}}>
      <DrawerContentScrollView {...props}>
        <View style={styles.topContainer}>
          {
            profileImage == undefined 
              ? 
                <InitialAvatar name={userName}/> 
              : 
                <Image 
                  source={{uri: `http://192.168.158.6:3001/api/uploads/profile/${profileImage}`}}
                  style={styles.profileImage}
                  resizeMode={'cover'}
                />
          }
          <View style={styles.userDetailsContainer}>
            <Text style={styles.userNameText}>
              {userState.user.userType === 'student' ? userState.user.studentName : userState.user.adminName}
            </Text>
            <Text style={styles.userEmailText}>
              {userState.user.userType === 'student' ? userState.user.studentEmail : userState.user.adminEmail}
            </Text>
          </View>
        </View>

        <View>
          <DrawerItemList {...props}/>
        </View>
      </DrawerContentScrollView>

      <View style={styles.bottomContainer}>
          <TouchableOpacity onPress={() => {
            Alert.alert(
              'Sign Out', 
              'Are you sure you want to sign out?',
              [
                {
                  text: 'Cancel',
                  style: 'cancel'
                },
                {
                  text: 'OK',
                  onPress: () => handleSignOut()
                }
              ],
              {
                cancelable: true
              }
            );
          }}>
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