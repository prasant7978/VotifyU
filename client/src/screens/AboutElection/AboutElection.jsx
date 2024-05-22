import React, {useEffect, useState} from 'react';

// styles
import globalStyles from '../../assets/styles/globalStyles';

import {ActivityIndicator, Alert, FlatList, RefreshControl, SafeAreaView} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';

// APIs
import getAllPositionAPI from '../../api/position/getAllPositionAPI';

// components
import PositionDetailsCard from '../../components/PositionDetailsCard/PositionDetailsCard';

import {COLORS} from '../../constants/theme';

const AboutElection = () => {
  const [allPositions, setAllPositions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  useFocusEffect(
    React.useCallback(() => {
      const fetchAllPositionDetails = async () => {
        setIsLoading(true);
  
        try {
          const token = JSON.parse(await AsyncStorage.getItem('@auth-token'));
          const response = await getAllPositionAPI(token);
  
          if (!response.success) {
            console.log(
              'Error in getting all positions in About Election: ',
              response.message,
            );
            Alert.alert('Alert', response.message);
            return;
          }
  
          setAllPositions(response.positions);
        } catch (error) {
          console.log(
            'Error in fetching all positions details in About Election: ',
            error,
          );
          Alert.alert('Alert', error);
        } finally {
          setIsLoading(false);
        }
      };
  
      fetchAllPositionDetails();
    }, [])
  )

  const onRefresh = async () => {
    setRefreshing(true); // Start refreshing indicator

    try {
      const token = JSON.parse(await AsyncStorage.getItem('@auth-token'));
      const response = await getAllPositionAPI(token);

      if (!response.success) {
        console.log(
          'Error in getting all positions in About Election: ',
          response.message,
        );
        Alert.alert('Alert', response.message);
        return;
      }

      setAllPositions(response.positions);
    } catch (error) {
      console.log(
        'Error in fetching all positions details in About Election: ',
        error,
      );
      Alert.alert('Alert', error);
    } finally {
      setRefreshing(false);
    }
  };

  return (
    <SafeAreaView
      style={[
        globalStyles.flex,
        globalStyles.paddingHorizontal,
        globalStyles.whiteBackground,
        {justifyContent: 'center'},
      ]}
    >
      {isLoading ? (
        <ActivityIndicator size={'large'} color={COLORS.tertiary} />
      ) : (
        <FlatList
          data={allPositions}
          keyExtractor={item => item._id}
          renderItem={({item}) => <PositionDetailsCard position={item} />}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        />
      )}
    </SafeAreaView>
  );
};

export default AboutElection;
