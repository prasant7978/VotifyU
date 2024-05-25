import React, { useContext, useEffect, useState } from 'react'

// styles
import styles from './style'
import globalStyles from '../../assets/styles/globalStyles'

import { View, SafeAreaView, ActivityIndicator, FlatList, RefreshControl } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'

import { COLORS } from '../../constants/theme'

// APIS
import getAllPositionAPI from '../../api/position/getAllPositionAPI'

// components
import FooterMenu from '../../components/Menus/FooterMenu'
import ResultCard from '../../components/ResultCard/ResultCard'

import { AuthContext } from '../../context/authContext'
import { useFocusEffect } from '@react-navigation/native'
import { horizontalScale } from '../../assets/styles/scaling'

const Results = () => {
  // global states
  const [userState] = useContext(AuthContext);

  // local states
  const [allPositions, setAllPositions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  // console.log('all positions: ', allPositions);

  useFocusEffect(
    React.useCallback(() => {
      const fetchAllPositionResults = async() => {
        setLoading(true);
  
        try {
          const token = JSON.parse(await AsyncStorage.getItem('@auth-token'));
          const response = await getAllPositionAPI(token);
    
          setAllPositions(response.positions);
        } catch (error) {
          console.log('Error in fetching all positions: ', error);
        } finally {
          setLoading(false);
        }
      }
  
      fetchAllPositionResults();
    }, [])
  )

  const onRefresh = async() => {
    setRefreshing(true);

    try {
      const token = JSON.parse(await AsyncStorage.getItem('@auth-token'));
        const response = await getAllPositionAPI(token);
  
        setAllPositions(response.positions);
    } catch (error) {
      console.log('Error fetching positions on refresh: ', error);
    } finally {
      setRefreshing(false);
    }
  }

  return (
    <SafeAreaView style={[globalStyles.flex, globalStyles.whiteBackground]}>
      {loading ? (
        <ActivityIndicator size={'large'} color={COLORS.tertiary}/>
      ) : (
        <FlatList
          data={allPositions}
          showsVerticalScrollIndicator={false}
          renderItem={({item}) => <ResultCard positionId={item._id}/>}
          keyExtractor={(item) => item._id}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh}/>
          }
        />
      )}

      {userState.user.role !== 'Admin' && (
        <View style={globalStyles.paddingHorizontal}>
          <FooterMenu/>
        </View>
      )}
    </SafeAreaView>
  )
}

export default Results