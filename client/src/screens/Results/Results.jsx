import React, { useEffect, useState } from 'react'

// styles
import styles from './style'
import globalStyles from '../../assets/styles/globalStyles'

import { View, SafeAreaView, ActivityIndicator, FlatList } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'

import { COLORS } from '../../constants/theme'

// APIS
import getAllPositionAPI from '../../api/position/getAllPositionAPI'

// components
import FooterMenu from '../../components/Menus/FooterMenu'
import ResultCard from '../../components/ResultCard/ResultCard'

const Results = () => {
  const [allPositions, setAllPositions] = useState([]);
  const [loading, setLoading] = useState(false);
  // console.log('all positions: ', allPositions);

  useEffect(() => {
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
  }, []);

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
        />
      )}

      <View>
        <FooterMenu/>
      </View>
    </SafeAreaView>
  )
}

export default Results