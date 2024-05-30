import React from "react";

import styles from "./style";

import { Image, Text, TouchableOpacity, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import DropShadow from "react-native-drop-shadow";

import InitialAvatar from "../InitialAvatar/InitialAvatar";
import { Routes } from "../../navigation/Routes";
import { imageUri } from "../../constants/theme";

const StudentCard = ({student}) => {
    const navigation = useNavigation()

    return (
        <TouchableOpacity style={styles.container} onPress={() => navigation.navigate(Routes.ViewSingleStudentDetails, {student: student})}>
            <DropShadow style={styles.imageContainerShadow}>
                {student.profileImage ? (
                    <Image
                        source={{uri: `${imageUri}/profile/${student.profileImage}`}}
                        style={styles.image}
                    />
                ) : (
                    <InitialAvatar
                        name={student.name}
                        avatarSize={50}
                        textSize={15}
                        padding={5}
                    />
                )}
            </DropShadow>

            <View style={styles.detailsContainer}>
                <Text style={styles.nameText}>{student.name}</Text>
                <Text style={styles.secondaryText}>{student.email}</Text>
                <Text style={styles.secondaryText}>{student.roll}</Text>
            </View>
        </TouchableOpacity>
    )
}

export default StudentCard;