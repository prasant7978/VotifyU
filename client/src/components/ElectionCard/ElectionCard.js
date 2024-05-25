import React, {useContext, useEffect, useState} from 'react';

import styles from './style';

import {Alert, Image, Text, TouchableOpacity, View} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CheckBox from '@react-native-community/checkbox';
import DropShadow from "react-native-drop-shadow";
import { useNavigation } from '@react-navigation/native';

import {COLORS} from '../../constants/theme';

import { Routes } from '../../navigation/Routes';

// APIs
import getSingleCandidateApplicationAPI from '../../api/candidate/getSingleCandidateApplication';

import { AuthContext } from '../../context/authContext';

const ElectionCard = ({position, onVoteSubmit, onPublishReult}) => {
  const navigation = useNavigation();

  // global state
  const [userState] = useContext(AuthContext);

  // local states
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

  const confirmDialog = (type) => {
    if(type === 'vote'){
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
    else{
      Alert.alert(
        'Publish Result',
        "Are you sure you want to publish the results? Publishing results will finalize the voting process",
        [
          {
            text: 'Cancel',
            style: 'cancel',
          },
          {
            text: 'Submit',
            onPress: () => onPublishReult(position._id),
          },
        ],
        {
          cancelable: false,
        },
      );
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.topContainer}>
        <Text style={styles.positonNameText}>{position.name}</Text>

        <TouchableOpacity onPress={() => navigation.navigate(Routes.AboutElection)}>
          <Image
            source={require('../../assets/images/information.png')}
            style={styles.infoImage}
          />
        </TouchableOpacity>
      </View>

      <View style={styles.middleContainer}>
        {position.appliedCandidates.length > 0 ? (
          <>
            {position.appliedCandidates.map(id => (
              <View key={id}>
                {candidateDetails[id] && ( // Check if details exist for this ID
                  <DropShadow style={styles.candidateCardshadow}>
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
                        if(userState.user.role !== 'Admin' && userState.loginType !== 'candidate'){
                          if (selectedId === id) setSelectedId('');
                          else setSelectedId(id);
                          setIsChecked(false);
                        }
                      }}>
                        <View style={{flexDirection: 'row', alignItems: 'center'}}>
                          <DropShadow style={styles.shadow}>
                            <Image
                              source={{
                                uri: `http://192.168.93.221:3001/api/uploads/profile/${candidateDetails[id].student?.profileImage}`,
                              }}
                              resizeMode={'cover'}
                              style={styles.image}
                            />
                          </DropShadow>
    
                          <Text style={styles.candidateNameText}>
                            {candidateDetails[id].student?.name}
                          </Text>
                        </View>
                        
                        <TouchableOpacity onPress={() => navigation.navigate(Routes.CandidateProfile, {candidateId: id})}>
                          <Image
                            source={require('../../assets/images/info.png')}
                            style={styles.profileInfoImage}
                          />
                        </TouchableOpacity>
                    </TouchableOpacity>
                  </DropShadow>
                )}
              </View>
            ))}
          </>
        ) : (
          <Text style={styles.notRegisteredText}>No candidates have registered for this position yet.</Text>
        )}
        
      </View>

      <View style={styles.bottomContainer}>
        {userState.user.role !== 'Admin' && userState.loginType !== 'candidate' ? (
          <>
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

            <TouchableOpacity style={styles.voteButton} onPress={() => confirmDialog('vote')}>
              <Text style={styles.buttonText}>Vote</Text>
            </TouchableOpacity>
          </>
        ) : (
          <View style={{flex: 1, alignItems: 'flex-end'}}>
            <TouchableOpacity style={styles.publishResultButton} onPress={() => confirmDialog('publish')}>
              <Text style={styles.buttonText}>Publish Result</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </View>
  );
};

export default ElectionCard;
