import React, {useEffect, useState} from 'react';

import styles from './style';

import {Alert, Image, Text, TouchableOpacity, View} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CheckBox from '@react-native-community/checkbox';

import {COLORS} from '../../constants/theme';

import getSingleCandidateApplicationAPI from '../../api/candidate/getSingleCandidateApplication';
import submitVote from '../../api/position/submitVoteAPI';

const ElectionCard = ({position, onVoteSubmit}) => {
  const [isChecked, setIsChecked] = useState(false);
  const [loading, setLoading] = useState(false);
  const [selectedId, setSelectedId] = useState('');
  // console.log('candidates applied: ', position.appliedCandidates);
  // console.log('selcted id: ', selectedId);

  const [candidateDetails, setCandidateDetails] = useState({});
  // console.log('candidate details: ', candidateDetails);

  useEffect(() => {
    setSelectedId('');
    setIsChecked(false);

    const fetchCandidates = async () => {
      setLoading(true);
      try {
        const token = JSON.parse(await AsyncStorage.getItem('@auth-token'));
        const details = await Promise.all(
          position.appliedCandidates.map(id =>
            getSingleCandidateApplicationAPI(token, id),
          ),
        );
        // console.log('details: ', details);

        setCandidateDetails(
          details.reduce(
            (acc, curr) => ({
              ...acc,
              [curr.data.candidate._id]: curr.data.candidate,
            }),
            {},
          ),
        );
      } catch (error) {
        console.error('Error fetching candidate details:', error);
        Alert.alert('Alert', 'Error in fetching candidate details');
      } finally {
        setLoading(false);
      }
    };

    fetchCandidates();
  }, [position.appliedCandidates]);

  const handleSubmitVote = async () => {
    try {
      const token = JSON.parse(await AsyncStorage.getItem('@auth-token'));
      const response = await submitVote(token, selectedId, position._id);

      if (!response.success) {
        Alert.alert(
          'Alert',
          response,
        );
        return;
      }

      Alert.alert('Alert', response.message);
    } catch (error) {
      console.error('Error in submitting the vote:', error);
      Alert.alert('Alert', error);
    }
  };

  const confirmDialog = () => {
    if (!selectedId) {
      Alert.alert(
        'Alert',
        'You must select a candidate or choose NOTA to submit your vote. Please make a selection before proceeding.',
      );
      return;
    }

    Alert.alert(
      'Submit Vote',
      "Your vote is important! Make sure you've reviewed all candidate information before submitting.",
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Submit',
          onPress: () => onVoteSubmit(selectedId, position._id),
        },
      ],
      {
        cancelable: false,
      },
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.topContainer}>
        <Text style={styles.positonNameText}>{position.name}</Text>

        <TouchableOpacity>
          <Image
            source={require('../../assets/images/information.png')}
            style={styles.infoImage}
          />
        </TouchableOpacity>
      </View>

      <View style={styles.middleContainer}>
        {position.appliedCandidates.map(id => (
          <View key={id}>
            {candidateDetails[id] && ( // Check if details exist for this ID
              <TouchableOpacity
                style={[
                  styles.candidateCardContainer,
                  {
                    backgroundColor:
                      selectedId === id
                        ? COLORS.lightMojito
                        : COLORS.antifleshWhite,
                  },
                ]}
                onPress={() => {
                  if (selectedId === id) setSelectedId('');
                  else setSelectedId(id);
                  setIsChecked(false);
                }}>
                <Image
                  source={{
                    uri: `http://192.168.93.221:3001/api/uploads/profile/${candidateDetails[id].student?.profileImage}`,
                  }}
                  resizeMode={'cover'}
                  style={styles.image}
                />

                <Text style={styles.candidateNameText}>
                  {candidateDetails[id].student?.name}
                </Text>
              </TouchableOpacity>
            )}
          </View>
        ))}
      </View>

      <View style={styles.bottomContainer}>
        <View style={styles.checkBoxContainer}>
          <CheckBox
            disabled={false}
            value={isChecked}
            onValueChange={val => setIsChecked(val)}
            tintColors={{
              true: COLORS.darkBeach,
              false: COLORS.darkBeach,
            }}
          />

          <TouchableOpacity
            onPress={() => {
              setIsChecked(!isChecked);

              if (!isChecked) setSelectedId('NOTA');
              else setSelectedId('');
            }}>
            <Text style={styles.notaText}>None of The Above (NOTA)</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.voteButton} onPress={confirmDialog}>
          <Text style={styles.buttonText}>Vote</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ElectionCard;
