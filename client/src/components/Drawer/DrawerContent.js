import React, { useContext } from 'react'

import styles from './style'

import { View, Text, Image, TouchableOpacity, Alert } from 'react-native'
import { useNavigation } from '@react-navigation/native'

import { DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer'

import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faRightFromBracket } from '@fortawesome/free-solid-svg-icons'

import { AuthContext } from '../../context/authContext'
import { PostContext } from '../../context/postContext'

import AsyncStorage from '@react-native-async-storage/async-storage'

import Snackbar from 'react-native-snackbar'

import { getFontFamily } from '../../assets/fonts/helper'

import InitialAvatar from '../InitialAvatar/InitialAvatar'
import { Routes } from '../../navigation/Routes'
import { imageUri } from '../../constants/theme'

const DrawerContent = (props) => {
  // global state
  const [userState, setUserState] = useContext(AuthContext);
  const [resetAllPosts] = useContext(PostContext);

  const navigation = useNavigation();
  
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

    Snackbar.show({
      text: 'Sign Out Successfull',
      duration: Snackbar.LENGTH_SHORT,
      fontFamily: getFontFamily('Inter', '400')
    })
  }

  return (
    <View style={{flex: 1}}>
      <DrawerContentScrollView {...props}>
        <TouchableOpacity 
          style={styles.topContainer} 
          onPress={() => {
            if(userState.loginType === 'admin')
              navigation.navigate(Routes.AdminProfile)
            else if(userState.loginType === 'student')
              navigation.navigate(Routes.StudentProfile)
            else
              navigation.navigate(Routes.CandidateProfile, {candidateId: userState.user.candidateId})
          }}
        >
          {userState.user.profileImage ? (
              <Image 
                source={{uri: `${userState.user.imageUrl}`}}
                style={styles.profileImage}
                resizeMode={'cover'}
              />
            ) : ( 
              <InitialAvatar 
                name={userState.user.name} 
                avatarSize={90} 
                textSize={32}
                padding={15}
              /> 
            )
          }
          <View style={styles.userDetailsContainer}>
            <Text style={styles.userNameText}>
              {userState.user.name}
            </Text>
            <Text style={styles.userEmailText}>
              {userState.user.email}
            </Text>
          </View>
        </TouchableOpacity>

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