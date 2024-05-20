import React, {useEffect, useState} from 'react';

// styles
import styles from './style';
import globalStyles from '../../../assets/styles/globalStyles';

import {FlatList, RefreshControl, View} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

// APIs
import getAllCandidateApplicationsAPI from '../../../api/candidate/getAllCandidateApplicationsAPI';

// components
import CandidateApplicationCard from '../../../components/CandidateApplicationCard/CandidateApplicationCard';
import {useFocusEffect} from '@react-navigation/native';

const AllPendingCandidateApplications = () => {
  // local states
  const [applications, setApplications] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  useFocusEffect(
    React.useCallback(() => {
      const fetchAllApplications = async () => {
        const token = JSON.parse(await AsyncStorage.getItem('@auth-token'));
        const allApplications = await getAllCandidateApplicationsAPI(token);

        setApplications(allApplications.data.applications);
      };

      fetchAllApplications();
    }, []),
  );

  const onRefresh = async () => {
    setRefreshing(true); // Start refreshing indicator
    try {
      const token = JSON.parse(await AsyncStorage.getItem('@auth-token'));
      const allApplications = await getAllCandidateApplicationsAPI(token);

      setApplications(allApplications.data.applications);
    } catch (error) {
      console.error('Error fetching applications on refresh:', error);
    } finally {
      setRefreshing(false); // Stop refreshing indicator
    }
  };

  return (
    <View
      style={[
        globalStyles.flex,
        globalStyles.paddingHorizontal,
        globalStyles.whiteBackground,
      ]}>
      <FlatList
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        data={applications}
        showsVerticalScrollIndicator={false}
        // keyExtractor={item => item.id}
        renderItem={({item}) => <CandidateApplicationCard item={item} />}
      />
    </View>
  );
};

export default AllPendingCandidateApplications;
