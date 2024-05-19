import React, {useEffect, useState} from 'react';

// styles
import globalStyles from '../../assets/styles/globalStyles';

import {ActivityIndicator, Alert, FlatList, SafeAreaView} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

// APIs
import getAllPositionAPI from '../../api/position/getAllPositionAPI';

// components
import PositionDetailsCard from '../../components/PositionDetailsCard/PositionDetailsCard';

import {COLORS} from '../../constants/theme';

const AboutElection = () => {
  const [allPositions, setAllPositions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
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
  }, []);

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
        />
      )}
    </SafeAreaView>
  );
};

export default AboutElection;
