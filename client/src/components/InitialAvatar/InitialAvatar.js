import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { getFontFamily } from '../../assets/fonts/helper';
import { horizontalScale, scaleFontSize } from '../../assets/styles/scaling';
import { COLORS } from '../../constants/theme';

const InitialAvatar = ({name}) => {
    // functions to extract initial name
    const getInitials = (name) => {
        const nameArray = name.split(' ');
        const initials = nameArray.map((word) => word.charAt(0).toUpperCase()).join('');
        return initials;
    }

  return (
    <View style={styles.container}>
      <Text style={styles.text}>{getInitials(name)}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        width: horizontalScale(90),
        height: horizontalScale(90),
        padding: horizontalScale(15),
        borderRadius: horizontalScale(50),
        borderWidth: horizontalScale(2),
        borderColor: COLORS.tertiary,
        backgroundColor: COLORS.gray2,
        justifyContent: 'center',
        alignItems: 'center'
    },
    text: {
        color: '#000000',
        fontFamily: getFontFamily('Inter', '900'),
        fontSize: scaleFontSize(40)
    }
})

export default InitialAvatar