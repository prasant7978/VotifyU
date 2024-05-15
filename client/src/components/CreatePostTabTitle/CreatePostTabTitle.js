import React from "react";

import { StyleSheet, Text } from "react-native";

import { COLORS } from "../../constants/theme";

// font and scaling
import { getFontFamily } from "../../assets/fonts/helper";
import { horizontalScale, scaleFontSize, verticalScale } from "../../assets/styles/scaling";

const CreatePostTabTitle = ({title, isFocused}) => {
    return (
        <Text style={[styles.titleText, !isFocused && styles.titleNotFocused]}>
            {title}
        </Text>
    )
}

const styles = StyleSheet.create({
    titleText: {
        fontFamily: getFontFamily('Inter', '500'),
        fontSize: scaleFontSize(18),
        color: COLORS.tertiary,
        paddingBottom: verticalScale(5),
        paddingHorizontal: horizontalScale(5)
    },
    titleNotFocused: {
        color: COLORS.lightGray
    }
});

export default CreatePostTabTitle;