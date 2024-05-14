import React from "react";
import styles from "./style";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Routes } from "../../navigation/Routes";
import InitialAvatar from "../InitialAvatar/InitialAvatar";

const CandidateApplicationCard = ({item}) => {
    const navigation = useNavigation();

    return (
        <TouchableOpacity onPress={() => navigation.navigate(Routes.SingleCandidateApplication, {candidateId: item._id})}>
            <View style={styles.container}>
                <View style={styles.imageContainer}>
                    {item.student?.profileImage ? (
                        <Image
                            source={{uri: `http://192.168.93.221:3001/api/uploads/profile/${item.student.profileImage}`}}
                            resizeMode="cover"
                            style={styles.image}
                        />
                    ) : (
                        <View style={styles.avatarContainer}>
                            <InitialAvatar
                                name={item.student?.name} 
                                avatarSize={60} 
                                textSize={24}
                                padding={0}
                            />
                        </View>
                    )}
                </View>

                <View style={styles.textContainer}>
                    <View style={styles.candidateNameContainer}>
                        <Text style={styles.candidateNameText}>{item.student.name}</Text>
                    </View>

                    <View style={styles.positionNameContainer}>
                        <Text style={styles.labelText}>Position Applied:</Text>
                        <Text style={styles.positionNameText}>{item.position.name}</Text>
                    </View>
                </View>
            </View>
        </TouchableOpacity>
    )
}

export default CandidateApplicationCard;