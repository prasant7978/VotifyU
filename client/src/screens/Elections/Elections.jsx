import React, { useContext, useEffect, useState } from 'react'

// styles
import styles from './style'
import globalStyles from '../../assets/styles/globalStyles'

// react native components
import { View, SafeAreaView, RefreshControl, FlatList, ActivityIndicator, Alert } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'

// components
import FooterMenu from '../../components/Menus/FooterMenu'
import ElectionCard from '../../components/ElectionCard/ElectionCard'

import { COLORS } from '../../constants/theme'

// APIs
import submitVote from '../../api/position/submitVoteAPI'
import publishResultAPI from '../../api/position/publishResultAPI'
import getAllOpenPositionAPI from '../../api/position/getAllOpenPositionAPI'

import { AuthContext } from '../../context/authContext'

const Elections = () => {
  // global states
  const [userState] = useContext(AuthContext);

  // local states
  const [positions, setPositions] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchAllPositions = async() => {
      setIsLoading(true);

      try {
        const token = JSON.parse(await AsyncStorage.getItem('@auth-token'));
        const response = await getAllOpenPositionAPI(token, 'unvotedPositions');
  
        setPositions(response.positions);
      } catch (error) {
        console.log('Error in fetching all open positions: ', error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchAllPositions();
  }, []);

  const onRefresh = async() => {
    setRefreshing(true);

    try {
      const token = JSON.parse(await AsyncStorage.getItem('@auth-token'));
      const response = await getAllOpenPositionAPI(token, 'unvotedPositions');
      // console.log('all positions: ', response);
  
      setPositions(response.positions);
    } catch (error) {
      console.log('Error fetching open positions on refresh: ', error);
    } finally {
      setRefreshing(false);
    }
  }

  const handleVoteSubmit = async (selectedId, positionId) => {
    try {
      const token = JSON.parse(await AsyncStorage.getItem('@auth-token'));
      const response = await submitVote(token, selectedId, positionId);

      if (!response.success) {
        Alert.alert(
          'Alert',
          response,
        );
        return;
      }

      Alert.alert('Alert', response.message);
      onRefresh();
    } catch (error) {
      console.error('Error in submitting the vote:', error);
      Alert.alert('Alert', error);
    }
  };

  const handlePublishResult = async(positionId) => {
    try {
      const token = JSON.parse(await AsyncStorage.getItem('@auth-token'));
      const response = await publishResultAPI(token, positionId);

      if (!response.success) {
        console.log('Error in publishing the result: ', response.error || response.message);
        Alert.alert('Error',response.error || response.message);
        return;
      }

      Alert.alert('Alert', response.message);
      onRefresh();
    } catch (error) {
      console.error('Error in publishing result:', error);
      Alert.alert('Error', error);
    }
  }

  return (
    <SafeAreaView style={[globalStyles.flex, globalStyles.whiteBackground, globalStyles.paddingHorizontal, styles.container]}>
      {isLoading ? (
        <ActivityIndicator size={'large'} color={COLORS.primary}/>
      ) : (
        <FlatList
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh}/>
          }
          data={positions}
          showsVerticalScrollIndicator={false}
          renderItem={({item}) => <ElectionCard position={item} onVoteSubmit={handleVoteSubmit} onPublishReult={handlePublishResult}/>}
        />
      )}

      {userState.user.role !== 'Admin' && (
        <View>
          <FooterMenu/>
        </View>
      )}
    </SafeAreaView>
  )
}

export default Elections;