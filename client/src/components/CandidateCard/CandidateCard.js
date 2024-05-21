import React from "react";

import styles from "./style";

import { Image, Text, TouchableOpacity, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import DropShadow from "react-native-drop-shadow";

import InitialAvatar from "../InitialAvatar/InitialAvatar";
import { Routes } from "../../navigation/Routes";

const CandidateCard = ({candidate}) => {
    const navigation = useNavigation()

    return (
        <TouchableOpacity style={styles.container} onPress={() => navigation.navigate(Routes.CandidateProfile, {candidateId: candidate._id})}>
            <DropShadow style={styles.imageContainerShadow}>
                {candidate.student.profileImage ? (
                    <Image
                        source={{uri: `http://192.168.93.221:3001/api/uploads/profile/${candidate.student.profileImage}`}}
                        style={styles.image}
                    />
                ) : (
                    <InitialAvatar
                        name={candidate.student.name}
                        avatarSize={50}
                        textSize={15}
                        padding={5}
                    />
                )}
            </DropShadow>

            <View style={styles.detailsContainer}>
                <Text style={styles.nameText}>{candidate.student.name}</Text>

                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <Text style={styles.positonNameLabel}>Runnig for </Text>
                    <Text style={styles.positionNameText}>{candidate.position.name}</Text>
                </View>
            </View>
        </TouchableOpacity>
    )
}

export default CandidateCard;