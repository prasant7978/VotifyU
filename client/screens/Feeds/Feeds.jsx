import React, { useContext, useEffect } from 'react'

import styles from './style';

import { View, Text, ScrollView } from 'react-native'

import FooterMenu from '../../components/Menus/FooterMenu';

import { AuthContext } from '../../context/aurhContext'
import { PostContext } from '../../context/postContext';

const Home = () => {
  // global states
  const [userState] = useContext(AuthContext);
  const [allPosts] = useContext(PostContext);

  return (
    <View style={styles.container}>
      <ScrollView>
        <Text style={{color: '#000000'}}>Home</Text>
        <Text style={{color: '#000000'}}>{JSON.stringify(userState, null, 4)}</Text>
        <Text style={{color: '#000000'}}>{JSON.stringify(allPosts, null, 4)}</Text>
      </ScrollView>

      <View>
        <FooterMenu/>
      </View>
    </View>
  )
}

export default Home