import React from 'react'
import styles from './style'
import PropTypes from 'prop-types';
import { View, Text, TouchableOpacity } from 'react-native'

const Button = (props) => {
  return (
    <View>
        <TouchableOpacity 
            style={[props.isDisabled && styles.buttonDisable, styles.button]}
            isDisabled={props.isDisabled}
            onPress={() => props.onPress()}
        >
            <Text style={styles.btnText}>
                {props.title}
            </Text>
        </TouchableOpacity>
    </View>
  )
}

Button.default = {
    isDisabled: false,
    onPress: () => {}
}

Button.propTypes = {
    title: PropTypes.string.isRequired,
    isDisabled: PropTypes.bool,
    onPress: PropTypes.func
}

export default Button