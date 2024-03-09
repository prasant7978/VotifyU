import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { getFontFamily } from '../../assets/fonts/helper';
import { horizontalScale, scaleFontSize } from '../../assets/styles/scaling';
import { COLORS } from '../../constants/theme';

const InitialAvatar = ({name, avatarSize, textSize, padding}) => {
    // functions to extract initial name
    const getInitials = (name) => {
        const nameArray = name.split(' ');
        const initials = nameArray.map((word) => word.charAt(0).toUpperCase()).join('');
        return initials;
    }

  return (
    <View 
      style={[
        styles.container, 
        {
          width: horizontalScale(avatarSize), 
          height: horizontalScale(avatarSize),
          padding: horizontalScale(padding)
        }
      ]}
    >
      <Text style={[styles.text, {fontSize: scaleFontSize(textSize)}]}>{getInitials(name)}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        borderRadius: horizontalScale(50),
        borderColor: COLORS.tertiary,
        backgroundColor: COLORS.gray2,
        justifyContent: 'center',
        alignItems: 'center'
    },
    text: {
        color: '#000000',
        fontFamily: getFontFamily('Inter', '900'),
    }
})

export default InitialAvatar