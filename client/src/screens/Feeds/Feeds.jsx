import React, { useContext, useEffect } from 'react'

import styles from './style';

import { View, FlatList } from 'react-native'

import FooterMenu from '../../components/Menus/FooterMenu';

import { AuthContext } from '../../context/aurhContext'
import { PostContext } from '../../context/postContext';
import PostCard from '../../components/PostCard/PostCard';
import globalStyles from '../../assets/styles/globalStyles';

const Home = () => {
  // global states
  const [allPosts, setAllPosts, fetchAllPosts] = useContext(PostContext);

  useEffect(() => {
    const fetchData = async () => {
      await fetchAllPosts('feed page');
    };

    fetchData();
  }, [setAllPosts]);

  return (
    <View style={[globalStyles.whiteBackground, globalStyles.flex, styles.container]}>
      <FlatList
        data={allPosts}
        showsVerticalScrollIndicator={false}
        renderItem={({item}) => <PostCard post={item}/>}
      />

      <View>
        <FooterMenu/>
      </View>
    </View>
  )
}

export default Home