import React, { useState } from 'react'
import styles from './style';
import PropTypes from 'prop-types'
import { View, TextInput } from 'react-native'
import { COLORS } from '../../constants/theme';

const Input = (props) => {
    const [value, setValue] = useState('');

    return (
        <View>
            <TextInput
                style={styles.input}
                placeholder={props.placeholder ? props.placeholder : null}
                placeholderTextColor={COLORS.darkGray}
                value={value}
                onChangeText={(val) => {
                    setValue(val);
                    props.onTextChange(val)
                }}
                keyboardType={props.keyboardType}
                secureTextEntry={props.secureTextEntry}
            />
        </View>
    )
}

Input.default = {
    onTextChange: () => {},
    keyboardType: 'default',
    secureTextEntry: false
}

Input.propTypes = {
    placeholder: PropTypes.string,
    onTextChange: PropTypes.func,
    keyboardType: PropTypes.string,
    secureTextEntry: PropTypes.bool
}

export default Input