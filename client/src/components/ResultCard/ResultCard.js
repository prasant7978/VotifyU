import React, { useEffect, useState } from "react";

// styles
import styles from "./style";

import { Alert, View, ActivityIndicator, Text, Image } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import DropShadow from "react-native-drop-shadow";

// APIs
import viewElectionResultAPI from "../../api/position/viewElectionResultAPI";

// rank badges
import secondPlaceBadge from '../../assets/images/second-place.png';
import thirdPlaceBadge from '../../assets/images/third-place.png';

import { COLORS } from "../../constants/theme";
import CandidateContainer from "./CandidateContainer";

const ResultCard = ({positionId}) => {
    const [result, setResult] = useState({});
    const [loading, setLoading] = useState(false);
    // console.log('result: ', result);

    useEffect(() =>{
        const fetchElectionResult = async() => {
            setLoading(true);

            try {
                const token = JSON.parse(await AsyncStorage.getItem('@auth-token'));
                const response = await viewElectionResultAPI(token, positionId);
    
                if(!response.success){
                    console.log('Error in getting election result: ', response.message);
                    Alert.alert('Alert', response.message);
                    return;
                }
    
                setResult(response);
            } catch (error) {
                console.log('Error in useEffect getting election result: ', error);
                Alert.alert('Alert', error)
            } finally {
                setLoading(false);
            }
        }

        fetchElectionResult();
    }, []);

    return (
        <View style={styles.container}>
            {loading ? (
                <ActivityIndicator size={'large'} color={COLORS.primary}/>
            ) : (
                <View>
                    <Text style={styles.positionNameText}>{result.position}</Text>

                    {(result.results?.length > 0 && result.status === 'majority') ? (
                        <DropShadow style={styles.winnerContainerShadow}>
                            <View style={styles.winnerContainer}>
                                <Image
                                    source={require('../../assets/images/rank.png')}
                                    style={styles.firstPlaceBadge}
                                />

                                <DropShadow style={styles.winnerContainerShadow}>
                                    {result.results[0]?.name === 'NOTA' ? (
                                        <View style={[styles.winnerImage, styles.notaContainer]}>
                                            <Text style={styles.notaContainerText}>NOTA</Text>
                                        </View>
                                    ) : (
                                        <Image
                                            source={{uri: `http://192.168.93.221:3001/api/uploads/profile/${result.results[0]?.profileImage}`}}
                                            resizeMode={'cover'}
                                            style={styles.winnerImage}
                                        />
                                    )}
                                </DropShadow>

                                <Text style={styles.winnerNameText}>{result.results[0]?.name === 'NOTA' ? 'None of The Above' : result.results[0]?.name}</Text>

                                <View style={{flexDirection: 'row'}}>
                                    <Text style={styles.winnerVoteCountLabel}>Vote Count:</Text>
                                    <Text style={styles.winnerVoteCountText}>{result.results[0]?.voteCount}</Text>
                                </View>
                            </View>
                        </DropShadow>
                    ) : (
                        <Text style={styles.tieMessage}>The results for the {result.position} position have ended in a tie. Further steps will be announced soon.</Text>
                    )}

                    <View style={styles.bottomContainer}>
                        {result.results?.length > 0 && (
                            <>
                                {result.status === 'tie' ? (
                                    result.results.map((item, index) => (
                                        <DropShadow key={index} style={styles.candidateContainerShadow}>
                                            <CandidateContainer item={item} status={result.status}/>
                                        </DropShadow>
                                    ))
                                ) : (
                                    result.results.slice(1).map((item, index) => (
                                        <DropShadow key={index} style={styles.candidateContainerShadow}>
                                            <CandidateContainer item={item} status={result.status}/>
                                        </DropShadow>
                                    ))
                                )}
                            </>
                        )}
                    </View>
                </View>
            )}
        </View>
    )
}

export default ResultCard;