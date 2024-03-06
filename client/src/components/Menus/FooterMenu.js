import React from 'react'

import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'

import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faCheckToSlot, faImages, faSquarePollVertical, faUser } from '@fortawesome/free-solid-svg-icons'
import { horizontalScale, verticalScale } from '../../assets/styles/scaling'
import { COLORS, SIZES } from '../../constants/theme'
import { useNavigation, useRoute } from '@react-navigation/native'
import { Routes } from '../../navigation/Routes'

const FooterMenu = () => {
    const navigation = useNavigation();
    const route = useRoute();

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.navigate(Routes.Feeds)}>
        <FontAwesomeIcon icon={faImages} size={24} style={styles.iconStyle} color={route.name === 'Feeds' ? COLORS.primary : "black"}/>
        <Text style={[styles.text, route.name === 'Feeds' ? {color: COLORS.primary} : {color: 'black'}]}>Feeds</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate(Routes.Elections)}>
        <FontAwesomeIcon icon={faCheckToSlot} size={24} style={styles.iconStyle} color={route.name === 'Elections' ? COLORS.primary : "black"}/>
        <Text style={[styles.text, route.name === 'Elections' ? {color: COLORS.primary} : {color: 'black'}]}>Elections</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate(Routes.Results)}>
        <FontAwesomeIcon icon={faSquarePollVertical} size={24} style={styles.iconStyle} color={route.name === 'Results' ? COLORS.primary : "black"}/>
        <Text style={[styles.text, route.name === 'Results' ? { color: COLORS.primary } : { color: 'black' }]}>Results</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate(Routes.Profile)}>
        <FontAwesomeIcon icon={faUser} size={24} style={styles.iconStyle} color={route.name === 'Profile' ? COLORS.primary : "black"}/>
        <Text style={[styles.text, route.name === 'Profile' ? {color: COLORS.primary} : {color: 'black'}]}>Profile</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: horizontalScale(SIZES.small),
        paddingVertical: verticalScale(5)
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