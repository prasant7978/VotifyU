import { StyleSheet } from "react-native";
import { horizontalScale, scaleFontSize, verticalScale } from "../../../assets/styles/scaling";
import { COLORS, SIZES } from "../../../constants/theme";
import { getFontFamily } from "../../../assets/fonts/helper";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        marginHorizontal: horizontalScale(SIZES.xLarge)
    },
    logoContainer: {
        alignItems: 'center',
        marginBottom: verticalScale(10)
    },
    logo: {
        height: verticalScale(90),
        width: horizontalScale(90),
        justifyContent: 'center'
    },
    headingContainer: {
        marginTop: verticalScale(SIZES.medium),
        alignItems: 'flex-start',
    },
    inputContainer: {
        marginBottom: verticalScale(SIZES.xLarge),
    },
    forgotPasswordText: {
        color: COLORS.tertiary,
        textAlign: 'right'
    },
    buttonContainer: {
        marginTop: verticalScale(35),
        marginBottom: verticalScale(SIZES.xSmall)
    },
    errorText: {
        fontFamily: getFontFamily('Inter', '400'),
        fontSize: scaleFontSize(SIZES.medium),
        color: COLORS.red,
        textAlign: 'center',
        marginBottom: verticalScale(SIZES.xSmall)
    }
});

export default styles;