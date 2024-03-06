import { StyleSheet } from "react-native";
import { COLORS } from "../../constants/theme";
import { horizontalScale, scaleFontSize, verticalScale } from "../../assets/styles/scaling";
import { getFontFamily } from "../../assets/fonts/helper";

const styles = StyleSheet.create({
    topContainer: {
        padding: horizontalScale(20), 
        justifyContent: 'center', 
        alignItems: 'center'
    },
    profileImage: {
        height: horizontalScale(90), 
        width: horizontalScale(90),
        borderRadius: horizontalScale(50),
        borderWidth: horizontalScale(2),
        borderColor: COLORS.tertiary
    },
    userDetailsContainer: {
        marginTop: verticalScale(8), 
        alignItems: 'center'
    },
    userNameText: {
        color: '#000000', 
        fontSize: scaleFontSize(18), 
        fontWeight: '600'
    },
    userEmailText: {
        color: '#000000', 
        fontSize: scaleFontSize(14), 
    },
    bottomContainer: {
        borderTopWidth: 1, 
        borderTopColor: COLORS.gray2, 
        padding: horizontalScale(15), 
        justifyContent: 'center',
    },
    signOutContainer: {
        flexDirection: 'row'
    },
    signOutText: {
        color: '#000000', 
        marginLeft: horizontalScale(15), 
        fontSize: scaleFontSize(15), 
        fontFamily: getFontFamily('Inter', '500')
    }
});

export default styles;