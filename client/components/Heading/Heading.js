import React from 'react'
import styles from './style'
import PropTypes from 'prop-types';
import { View, Text } from 'react-native'

const Heading = (props) => {
  const styleToApply = () => {
    switch(props.type){
      case 1:
        return styles.title1
      case 2:
        return styles.title2
      case 3:
        return styles.title3
      default:
        return styles.title1
    }
  }

  return (
    <View>
      <Text style={[styleToApply(), props.color && {color: props.color}]}>
        {props.title}
      </Text>
    </View>
  )
}

Heading.default = {
  color: '#000000'
}

Heading.propTypes={
  title: PropTypes.string.isRequired,
  type: PropTypes.number.isRequired,
  color: PropTypes.string,
}

export default Heading