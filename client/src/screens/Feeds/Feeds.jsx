import React, { useContext, useEffect, useState } from 'react'

// styles
import styles from './style';
import globalStyles from '../../assets/styles/globalStyles';

import { View, FlatList, RefreshControl } from 'react-native'
import { useFocusEffect } from '@react-navigation/native';

// components
import FooterMenu from '../../components/Menus/FooterMenu';
import PostCard from '../../components/PostCard/PostCard';

// post context api
import { PostContext } from '../../context/postContext';

const Home = () => {
  // global states
  const [allPosts, setAllPosts, fetchAllPosts] = useContext(PostContext);

  // local states
  const [refreshing, setRefreshing] = useState(false);

  const userPostPageSize = 5;
  const [userPostscurrentPage, setUserPostsCurrentPage] = useState(1);
  const [userPostsRenderData, setUserPostsRenderData] = useState([]);
  const [isLoadingUserPosts, setIsLoadingUserPosts] = useState(false);

  const pagination = (allPosts, currentPage, pageSize) => {
    console.log('current page: ', currentPage);
    let startIndex = (currentPage - 1) * pageSize;
    let endIndex = startIndex + pageSize;

    if(startIndex >= endIndex)
      return [];

    return allPosts.slice(startIndex, endIndex);
  }

  const onRefresh = async () => {
    setRefreshing(true);
    await fetchAllPosts('feed page');
    setRefreshing(false);
  }

  useFocusEffect(
    React.useCallback(() => {
      const fetchData = async () => {
        await fetchAllPosts('feed page');
      };
  
      fetchData();
    }, [])
  );

  // initial loading of posts
  useEffect(() => {
    setUserPostsCurrentPage(1);
    setUserPostsRenderData([]);
    setIsLoadingUserPosts(false);

    setIsLoadingUserPosts(true);
    const initialPosts = pagination(allPosts, 1, userPostPageSize);
    setUserPostsRenderData(initialPosts);
    setIsLoadingUserPosts(false);
  }, [allPosts]);

  return (
    <View style={[globalStyles.whiteBackground, globalStyles.flex, globalStyles.paddingHorizontal]}>
      <FlatList
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh}/>
      }
        data={userPostsRenderData}
        onEndReachedThreshold={0.5}
        onEndReached={() => {
          if(isLoadingUserPosts == true)
            return;

          setIsLoadingUserPosts(true);

          console.log('fetching posts for page: ', userPostscurrentPage + 1);
          const newPosts = pagination(allPosts, userPostscurrentPage + 1, userPostPageSize);
          if(newPosts.length > 0){
            setUserPostsCurrentPage(userPostscurrentPage + 1);
            setUserPostsRenderData(prev => [...prev, ...newPosts]);
          }

          setIsLoadingUserPosts(false);
        }}
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