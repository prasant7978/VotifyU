import React, { useEffect, useState } from 'react'

// styles
import styles from './style'
import globalStyles from '../../assets/styles/globalStyles'

// react native components
import { View, SafeAreaView, RefreshControl, FlatList, ActivityIndicator, Alert } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'

// components
import FooterMenu from '../../components/Menus/FooterMenu'
import ElectionCard from '../../components/ElectionCard/ElectionCard'

// APIs
import getAllPositionAPI from '../../api/position/getAllPositionAPI'
import { COLORS } from '../../constants/theme'
import submitVote from '../../api/position/submitVoteAPI'

const Elections = () => {
  const [positions, setPositions] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchAllPositions = async() => {
      setIsLoading(true);

      try {
        const token = JSON.parse(await AsyncStorage.getItem('@auth-token'));
        const response = await getAllPositionAPI(token, 'unvotedPositions');
  
        setPositions(response.positions);
      } catch (error) {
        console.log('Error in fetching all positions: ', error);
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
      const response = await getAllPositionAPI(token, 'unvotedPositions');
      // console.log('all positions: ', response);
  
      setPositions(response.positions);
    } catch (error) {
      console.log('Error fetching positions on refresh: ', error);
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

  return (
    <SafeAreaView style={[globalStyles.flex, globalStyles.whiteBackground, globalStyles.paddingHorizontal]}>
      {isLoading ? (
        <ActivityIndicator size={'large'} color={COLORS.primary}/>
      ) : (
        <FlatList
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh}/>
          }
          data={positions}
          showsVerticalScrollIndicator={false}
          renderItem={({item}) => <ElectionCard position={item} onVoteSubmit={handleVoteSubmit}/>}
        />
      )}

      <View>
        <FooterMenu/>
      </View>
    </SafeAreaView>
  )
}

export default Elections;