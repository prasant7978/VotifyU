import { View, Text } from 'react-native'
import React, { useContext } from 'react'
import { AuthContext } from '../../context/aurhContext'

const Home = () => {
  const [userState] = useContext(AuthContext);

  return (
    <View>
      <Text style={{color: '#000000'}}>Home</Text>
      <Text style={{color: '#000000'}}>{JSON.stringify(userState, null, 4)}</Text>
    </View>
  )
}

export default Home