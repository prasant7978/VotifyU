import React, { useContext, useState } from "react";

import styles from "./styles";

import { Image, Text, TouchableOpacity, View } from "react-native";
import DropShadow from "react-native-drop-shadow";
import { useNavigation } from "@react-navigation/native";

import { Routes } from "../../navigation/Routes";

import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faAngleDown, faAngleUp } from "@fortawesome/free-solid-svg-icons";

import { COLORS } from "../../constants/theme";

import { AuthContext } from "../../context/authContext";

const PositionDetailsCard = ({position}) => {
    const [userState] = useContext(AuthContext);

    const navigation = useNavigation();
    const [isExpanded, setIsExpanded] = useState(false);

    const expandedContent = (
        <>
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
        </>
    )

    return (
        <TouchableOpacity onPress={() => setIsExpanded(!isExpanded)}>
            <View style={styles.container}>
                    <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
                        <Text style={styles.positionNameText}>{position.name}</Text>


                        <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
                            {userState.user.role === 'Admin' && (
                                <TouchableOpacity onPress={() => navigation.navigate(Routes.ViewSinglePositionDetails, {position: position})}>
                                    <Image
                                        source={require('../../assets/images/edit.png')}
                                        style={styles.editIcon}
                                    />
                                </TouchableOpacity>
                            )}
                            
                            {isExpanded ? (
                                <FontAwesomeIcon icon={faAngleUp} size={24} color={COLORS.slateShadow}/>
                            ) : (
                                <FontAwesomeIcon icon={faAngleDown} size={24} color={COLORS.slateShadow}/>
                            )}
                        </View>
                    </View>

                    <Text style={styles.descriptionText}>{position.description}</Text>

                {isExpanded && expandedContent}
            </View>
        </TouchableOpacity>
    )
}

export default PositionDetailsCard;