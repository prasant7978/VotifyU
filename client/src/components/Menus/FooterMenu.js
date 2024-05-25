import React, { useContext, useState } from 'react'

import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import { useNavigation, useRoute } from '@react-navigation/native'

import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faCheckToSlot, faImages, faSquarePollVertical, faUser, faUserGear } from '@fortawesome/free-solid-svg-icons'

import { AuthContext } from '../../context/authContext'

import { horizontalScale, verticalScale } from '../../assets/styles/scaling'
import { COLORS, SIZES } from '../../constants/theme'
import { Routes } from '../../navigation/Routes'

const FooterMenu = () => {
  // global states
  const [userState] = useContext(AuthContext);

  const navigation = useNavigation();
  const route = useRoute();

  return (
    <View style={userState.loginType === 'admin' ? styles.adminContainer : styles.container}>
      <TouchableOpacity onPress={() => navigation.navigate(Routes.Feeds)}>
        <FontAwesomeIcon icon={faImages} size={24} style={styles.iconStyle} color={route.name === 'Feeds' ? COLORS.primary : "black"}/>
        <Text style={[styles.text, route.name === 'Feeds' ? {color: COLORS.primary} : {color: 'black'}]}>Feeds</Text>
      </TouchableOpacity>

      {userState.loginType !== 'admin' && (
        <>
          <TouchableOpacity onPress={() => navigation.navigate(Routes.Elections)}>
            <FontAwesomeIcon icon={faCheckToSlot} size={24} style={styles.iconStyle} color={route.name === 'Elections' ? COLORS.primary : "black"}/>
            <Text style={[styles.text, route.name === 'Elections' ? {color: COLORS.primary} : {color: 'black'}]}>Elections</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => navigation.navigate(Routes.Results)}>
            <FontAwesomeIcon icon={faSquarePollVertical} size={24} style={styles.iconStyle} color={route.name === 'Results' ? COLORS.primary : "black"}/>
            <Text style={[styles.text, route.name === 'Results' ? { color: COLORS.primary } : { color: 'black' }]}>Results</Text>
          </TouchableOpacity>
        </>
      )}

      <TouchableOpacity onPress={() => {
        // console.log('loginType: ', userState.loginType)
        if(userState.loginType === 'student')
          navigation.navigate(Routes.StudentProfile)
        else if(userState.loginType === 'candidate')
          navigation.navigate(Routes.CandidateProfile, {candidateId: userState.user.candidateId})
        else if(userState.loginType === 'admin')
          navigation.navigate(Routes.AdminDashboard)
      }}>
        <FontAwesomeIcon icon={faUser} size={24} style={styles.iconStyle} color={route.name === 'StudentProfile' || route.name === 'CandidateProfile' || route.name === 'AdminDashboard' ? COLORS.primary : "black"}/>
        <Text style={[styles.text, route.name === 'StudentProfile' || route.name === 'CandidateProfile' ? {color: COLORS.primary} : {color: 'black'}]}>{userState.user.role === 'Admin' ? 'Dashboard' : 'Profile'}</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingHorizontal: horizontalScale(SIZES.small),
      paddingVertical: verticalScale(5),
      backgroundColor: '#00000000',
    },
    adminContainer: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      paddingHorizontal: horizontalScale(SIZES.small),
      paddingVertical: verticalScale(5),
      backgroundColor: '#00000000',
    },
    iconStyle: {
      marginBottom: verticalScale(3),
      alignSelf: 'center',
    },
    text: {
      color: '#000000',
      textAlign: 'center'
    }
});

export default FooterMenu