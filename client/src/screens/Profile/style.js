import { StyleSheet } from "react-native";
import { horizontalScale, scaleFontSize, verticalScale } from "../../assets/styles/scaling";
import { getFontFamily } from "../../assets/fonts/helper";
import { COLORS } from "../../constants/theme";

const styles = StyleSheet.create({
    profileContainer: {
        paddingTop: verticalScale(7),
        paddingHorizontal: horizontalScale(10)
    },
    topContainer: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    profileImageContainer: {

    },
    profileImage: {
        height: horizontalScale(100),
        width: horizontalScale(100),
        borderRadius: horizontalScale(50),
        borderColor: COLORS.tertiary,
        borderWidth: 2
    },
    userPrimaryDetailsContainer: {
        height: horizontalScale(100),
        marginLeft: horizontalScale(5),
        justifyContent: 'space-evenly'
    },
    nameText: {
        fontFamily: getFontFamily('Inter', '700'),
        fontSize: scaleFontSize(22),
        color: '#000000',
    },
    emailText: {
        fontFamily: getFontFamily('Inter', '400'),
        fontSize: scaleFontSize(16),
        color: '#B79891',
    },
});

export default styles;