import React from "react";
import styles from "./style";
import { Image, Text, View } from "react-native";
import DropShadow from "react-native-drop-shadow";

// rank badges
import secondPlaceBadge from '../../assets/images/second-place.png';
import thirdPlaceBadge from '../../assets/images/third-place.png';
import { horizontalScale } from "../../assets/styles/scaling";

const CandidateContainer = ({item, status}) => {
    return (
        <View style={styles.candidateContainer}>
            <DropShadow style={styles.candidateImageShadow}>
                {item.name === 'NOTA' ? (
                    <View style={[styles.candidateImage, styles.notaContainer]}>
                        <Text style={styles.notaContainerText}>N</Text>
                    </View>
                ) : (
                    <Image
                        source={{uri: `http://192.168.93.221:3001/api/uploads/profile/${item.profileImage}`}}
                        resizeMode={'cover'}
                        style={styles.candidateImage}
                    />
                )}
            </DropShadow>

            <View style={status === 'tie' ? {marginLeft: horizontalScale(13)} : styles.candidateDetailsContainer}>
                <Text style={styles.candidateNameText}>{item.name === 'NOTA' ? 'None of The Above' : item.name}</Text>

                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <Text style={styles.candidateVoteCountLabel}>Vote Count:</Text>
                    <Text style={styles.voteCountText}>{item.voteCount}</Text>
                </View>
            </View>

            {status === 'majority' && (
                <Image
                    source={item.rank === 2 ? secondPlaceBadge : thirdPlaceBadge}
                    style={styles.badge}
                />
            )}
        </View>
    )
}

export default CandidateContainer;