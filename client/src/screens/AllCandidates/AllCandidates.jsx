import React, {useState} from 'react';

// styles
import globalStyles from '../../assets/styles/globalStyles';

import {Alert, FlatList, View} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { RefreshControl } from 'react-native-gesture-handler';
import { useFocusEffect } from '@react-navigation/native';

// APIs
import getAllAcceptedCandidatesAPI from '../../api/candidate/getAllAcceptedCandidates';

// components
import CandidateCard from '../../components/CandidateCard/CandidateCard';

const AllCandidates = () => {
  const [allCandidates, setAllCandidates] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  useFocusEffect(
    React.useCallback(() => {
      const fetchAllCandidateDetails = async () => {
        const token = JSON.parse(await AsyncStorage.getItem('@auth-token'));
        const response = await getAllAcceptedCandidatesAPI(token);
  
        if (!response.success) {
          console.log('Error in getting all candidates: ', response.message);
          Alert.alert('Alert', response.message);
        }
  
        setAllCandidates(response.candidates);
      };
  
      fetchAllCandidateDetails();
    }, []),
  );

  const onRefresh = async () => {
    setRefreshing(true);
    try {
      const token = JSON.parse(await AsyncStorage.getItem('@auth-token'));
      const response = await getAllAcceptedCandidatesAPI(token);

      if (!response.success) {
        console.log('Error in getting all candidates: ', response.message);
        Alert.alert('Alert', response.message);
      }

      setAllCandidates(response.candidates);
    } catch (error) {
      console.error('Error fetching all candidates on refresh:', error);
    } finally {
      setRefreshing(false);
    }
  };

  return (
    <View
      style={[
        globalStyles.flex,
        globalStyles.whiteBackground,
        globalStyles.paddingHorizontal
      ]}>
        <FlatList
          data={allCandidates}
          renderItem={({item}) => <CandidateCard candidate={item}/>}
          keyExtractor={(item) => item._id}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        />
      </View>
  );
};

export default AllCandidates;
