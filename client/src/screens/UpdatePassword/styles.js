import { StyleSheet } from "react-native";
import { COLORS } from "../../constants/theme";
import { getFontFamily } from "../../assets/fonts/helper";
import { horizontalScale, scaleFontSize, verticalScale } from "../../assets/styles/scaling";

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: horizontalScale(30),
        marginTop: verticalScale(10),
    },
    imageContainer: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    image: {
        height: horizontalScale(90),
        width: horizontalScale(90)
    },
    descriptionContainer: {
        marginVertical: verticalScale(20)
    },
    updatePasswordDescriptionText: {
        color: COLORS.tertiary,
        fontFamily: getFontFamily('Inter', '600'),
        fontSize: scaleFontSize(15)
    },
    newPasswordContainer: {
        marginTop: verticalScale(10),
        marginBottom: verticalScale(18)
    },
    lableText: {
        color: COLORS.chocolateNoir,
        fontFamily: getFontFamily('Inter', '500'),
        fontSize: scaleFontSize(18)
    },
    inputContainer: {
        marginTop: verticalScale(7)
    },
    bottonContainer: {
        marginTop: verticalScale(60),
        marginBottom: verticalScale(20)
    },
    errorText: {
        color: COLORS.red,
        textAlign: 'center'
    }
});

export default styles;