import { StyleSheet } from "react-native";
import { horizontalScale, verticalScale } from "../../../assets/styles/scaling";
import { COLORS, SIZES } from "../../../constants/theme";

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
        marginVertical: verticalScale(35)
    },
    errorText: {
        color: 'red'
    }
});

export default styles;