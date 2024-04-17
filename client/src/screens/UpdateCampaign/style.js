import { StyleSheet } from "react-native";
import { horizontalScale, scaleFontSize, verticalScale } from "../../assets/styles/scaling";
import { getFontFamily } from "../../assets/fonts/helper";
import { COLORS } from "../../constants/theme";

const styles = StyleSheet.create({
    campaignImage: {
        height: verticalScale(200),
        width: horizontalScale(330),
        resizeMode: 'cover',
        borderRadius: horizontalScale(5),
        marginTop: verticalScale(10),
        marginBottom: verticalScale(5)
    },
    inputContainer: {
        // backgroundColor: COLORS.darkLove,
        marginBottom: verticalScale(10)
    },
    inputLabelText: {
        fontFamily: getFontFamily('Poppins', '200'),
        color: COLORS.slateShadow,
        fontSize: scaleFontSize(18),
        paddingBottom: verticalScale(0),
        // backgroundColor: COLORS.lightSkyLine,
    },
    titleInputBox: {
        fontFamily: getFontFamily('Inter', '500'),
        color: COLORS.slateShadow,
        fontSize: scaleFontSize(24),
        // backgroundColor: COLORS.darkMojito,
        borderBottomWidth: 0.5,
        borderBottomColor: COLORS.darkGray,
        paddingVertical: verticalScale(0),
        paddingHorizontal: horizontalScale(0),
    },
    descriptionInputBox: {
        fontFamily: getFontFamily('Inter', '500'),
        color: COLORS.slateShadow,
        fontSize: scaleFontSize(16),
        // textAlign: 'justify',
        // backgroundColor: COLORS.darkMojito,
        borderBottomWidth: 0.5,
        borderBottomColor: COLORS.darkGray,
        paddingTop: verticalScale(0),
        paddingBottom: verticalScale(10),
        paddingHorizontal: horizontalScale(0),
    },
    multiLineInputBox: {
        lineHeight: verticalScale(16)
    },
    buttonContainer: {
        marginTop: verticalScale(20),
        marginBottom: verticalScale(10)
    }
});

export default styles;