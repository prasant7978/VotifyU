import { StyleSheet } from "react-native";
import { horizontalScale, scaleFontSize, verticalScale } from "../../assets/styles/scaling";
import { COLORS } from "../../constants/theme";
import { getFontFamily } from "../../assets/fonts/helper";

const styles = StyleSheet.create({
    postContainer: {
        marginBottom: verticalScale(15),
        marginHorizontal: horizontalScale(10),
        padding: horizontalScale(5),
        borderRadius: horizontalScale(10)
    },
    topContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    avatarImageContainer: {
        borderWidth: 2,
        borderRadius: horizontalScale(50),
        padding: horizontalScale(2),
        borderColor: COLORS.tertiary
    },
    avatarImage: {
        height: horizontalScale(40),
        width: horizontalScale(40),
        borderRadius: horizontalScale(50),
    },
    userDetailsContainer: {
        marginLeft: horizontalScale(10),
        alignItems: 'flex-start',
        justifyContent: 'space-between',
    },
    nameText: {
        fontFamily: getFontFamily('Inter', '500'),
        fontSize: scaleFontSize(16),
        color: '#000000',
        marginBottom: 3
    },
    roleText: {
        fontFamily: getFontFamily('Inter', '400'),
        fontSize: scaleFontSize(13),
        color: '#79869F'    
    },
    middleContainer: {
        marginTop: verticalScale(10),
        marginBottom: verticalScale(7)
    },
    campaignImage: {
        height: horizontalScale(200),
        width: horizontalScale(300),
        borderRadius: horizontalScale(5),
    },
    titleText: { 
        color: '#000000',
        fontFamily: getFontFamily('Inter', '600'),
        fontSize: scaleFontSize(16),
        paddingHorizontal: horizontalScale(5)
    },
    descriptionTextContainer: {
        paddingHorizontal: horizontalScale(5)
    },
    descriptionText: {
        color: '#000000',
        fontFamily: getFontFamily('Inter', '400'),
        fontSize: scaleFontSize(13),
        textAlign: 'justify'
    }
});

export default styles;