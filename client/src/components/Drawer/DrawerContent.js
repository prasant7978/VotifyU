import React, { useContext } from 'react'

import styles from './style'

import { View, Text, Image, TouchableOpacity, Alert } from 'react-native'

import { DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer'

import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faRightFromBracket } from '@fortawesome/free-solid-svg-icons'

import { AuthContext } from '../../context/authContext'
import { PostContext } from '../../context/postContext'

import AsyncStorage from '@react-native-async-storage/async-storage'

import Snackbar from 'react-native-snackbar'

import { getFontFamily } from '../../assets/fonts/helper'

import InitialAvatar from '../InitialAvatar/InitialAvatar'

const DrawerContent = (props) => {
  // global state
  const [userState, setUserState] = useContext(AuthContext);
  const [resetAllPosts] = useContext(PostContext);
  
  const handleSignOut = async() => {
    // set the authContext to null
    setUserState({
      user: null,
      token: ''
    });

    // set allPosts to empty array
    resetAllPosts;

    // delete the token in storage
    await AsyncStorage.removeItem('@auth-token')
    await AsyncStorage.removeItem('@auth-data')

    // console.log("user state after logout: ", userState);
    // console.log("user token after logout: ",JSON.parse(await AsyncStorage.getItem('@auth-token')));
    // console.log("user data after logout: ",JSON.parse(await AsyncStorage.getItem('@auth-data')));

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
            userState.user.profileImage == undefined 
              ? 
                <InitialAvatar 
                  name={userState.user.name} 
                  avatarSize={90} 
                  textSize={33}
                  padding={15}
                /> 
              : 
                <Image 
                  source={{uri: `http://192.168.93.221:3001/api/uploads/profile/${userState.user.profileImage}`}}
                  style={styles.profileImage}
                  resizeMode={'cover'}
                />
          }
          <View style={styles.userDetailsContainer}>
            <Text style={styles.userNameText}>
              {userState.user.name}
            </Text>
            <Text style={styles.userEmailText}>
              {userState.user.email}
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