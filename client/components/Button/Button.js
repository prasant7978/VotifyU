import React from 'react'
import styles from './style'
import PropTypes from 'prop-types';
import { View, Text, TouchableOpacity } from 'react-native'

const Button = ({title, isDisabled, loading, handleSubmit}) => {
  return (
    <View>
        <TouchableOpacity 
            style={[isDisabled && styles.buttonDisable, styles.button]}
            // isDisabled={isDisabled}
            onPress={handleSubmit}
        >
            <Text style={styles.btnText}>
                {loading ? "Please Wait..." : title}
            </Text>
        </TouchableOpacity>
    </View>
  )
}



export default Button