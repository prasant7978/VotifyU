import React from "react";
import styles from "./styles";
import { Image, Text, TouchableOpacity, View } from "react-native";
import DropShadow from "react-native-drop-shadow";
import { useNavigation } from "@react-navigation/native";
import { Routes } from "../../navigation/Routes";

const PositionDetailsCard = ({position}) => {
    const navigation = useNavigation();

    return (
        <View style={styles.container}>
            <Text style={styles.positionNameText}>{position.name}</Text>

            <Text style={styles.descriptionText}>{position.description}</Text>

            <View style={styles.responsibilitiesContainer}>
                <Text style={styles.containerHeading}>Roles & Responsibilities</Text>

                {position.responsibilities.map((item, index) => (
                    <View key={index} style={styles.singleResponsibilityContainer}>
                        <Text style={styles.resposibilityNumberText}>{index + 1}. </Text>

                        <Text style={styles.descriptionText}>{item}</Text>
                    </View>
                ))}
            </View>

            {position.candidate && (
                <View style={styles.bottomContainer}>
                    <Text style={styles.containerHeading}>Elected Candidate</Text>

                    <TouchableOpacity onPress={() => navigation.navigate(Routes.CandidateProfile, {candidateId: position.electedCandidate})} style={styles.candidateDetailsContainer}>
                        <DropShadow style={styles.candidateImageShadow}>
                            <Image
                                source={{uri: `http://192.168.93.221:3001/api/uploads/profile/${position.candidate?.profileImage}`}}
                                resizeMode={'cover'}
                                style={styles.candidateImage}
                            />
                        </DropShadow>

                        <View style={styles.candidatePrimaryDetailsContainer}>
                            <Text style={styles.candidateNameText}>{position.candidate?.name}</Text>
                            <Text style={styles.positionName}>{position.name}</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            )}
        </View>
    )
}

export default PositionDetailsCard;