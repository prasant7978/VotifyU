import React, {useState} from 'react';

// styles
import styles from './style';
import globalStyles from '../../../../assets/styles/globalStyles';

import {Alert, FlatList, View} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { RefreshControl } from 'react-native-gesture-handler';
import { useFocusEffect } from '@react-navigation/native';

// APIs
import viewAllStudentsAPI from '../../../../api/student/viewAllStudentsAPI';

// components
import StudentCard from '../../../../components/StudentCard/StudentCard';

const ViewAllStudents = () => {
  const [allStudents, setAllStudents] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  useFocusEffect(
    React.useCallback(() => {
      const fetchAllStudentsDetails = async () => {
        const token = JSON.parse(await AsyncStorage.getItem('@auth-token'));
        const response = await viewAllStudentsAPI(token);
  
        if (!response.success) {
          console.log('Error in getting all students: ', response.message);
          Alert.alert('Alert', response.message);
        }
  
        setAllStudents(response.students);
      };
  
      fetchAllStudentsDetails();
    }, []),
  );

  const onRefresh = async () => {
    setRefreshing(true); // Start refreshing indicator
    try {
      const token = JSON.parse(await AsyncStorage.getItem('@auth-token'));
      const response = await viewAllStudentsAPI(token);

      if (!response.success) {
        console.log('Error in getting all students: ', response.message);
        Alert.alert('Alert', response.message);
      }

      setAllStudents(response.students);
    } catch (error) {
      console.error('Error fetching all students on refresh:', error);
    } finally {
      setRefreshing(false); // Stop refreshing indicator
    }
  };

  return (
    <View
      style={[
        globalStyles.flex,
        globalStyles.whiteBackground,
        styles.container
      ]}>
        <FlatList
          data={allStudents}
          renderItem={({item}) => <StudentCard student={item}/>}
          keyExtractor={(item) => item._id}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        />
      </View>
  );
};

export default ViewAllStudents;
