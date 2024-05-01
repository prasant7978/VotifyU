import { StyleSheet } from "react-native";
import { horizontalScale, scaleFontSize, verticalScale } from "../../../assets/styles/scaling";
import { COLORS } from "../../../constants/theme";
import { getFontFamily } from "../../../assets/fonts/helper";

const styles = StyleSheet.create({
    topContainer: {
        marginHorizontal: horizontalScale(10),
    },
    profileImageContainer: {
        marginTop: verticalScale(10),
        borderRadius: horizontalScale(5),
        width: horizontalScale(120),
        elevation: 10,
        shadowColor: COLORS.slateShadow,
        shadowOffset: {
            width: 0,
            height: verticalScale(2)
        },
        shadowOpacity: 0.5,
        shadowRadius: horizontalScale(5),
    },
    profileImage: {
        width: horizontalScale(120),
        height: horizontalScale(160),
        borderRadius: horizontalScale(5),
    },
    primaryDetailsContainer: {
        alignItems: 'center',
        marginTop: verticalScale(12)
    },
    candidateNameText: {
        fontFamily: getFontFamily('Inter', '700'),
        color: COLORS.slateShadow,
        fontSize: scaleFontSize(22)
    },
    sloganText: {
        fontFamily: getFontFamily('Poppins', '400'),
        color: COLORS.slateShadow,
        fontSize: scaleFontSize(15),
        textAlign: 'center',
        lineHeight: verticalScale(18),
        marginTop: verticalScale(5)
    },
    secondaryDetailsContainer: {
        // backgroundColor: COLORS.darkBeach
    },
    conatainerHeadingText: {
        fontFamily: getFontFamily('Poppins', '600'),
        color: COLORS.forestShadow,
        fontSize: scaleFontSize(17),
        marginTop: verticalScale(12),
        marginBottom: verticalScale(2)
    },
    singleDetailsContainer: {
        marginBottom: verticalScale(5)
    },
    detailsLabelText: {
        fontFamily: getFontFamily('Inter', '300'),
        color: COLORS.slateShadow,
        fontSize: scaleFontSize(16)
    },
    detailsText: {
        fontFamily: getFontFamily('Inter', '500'),
        color: COLORS.slateShadow,
        fontSize: scaleFontSize(18)
    },
    socialLinksContainer: {

    },
    logoContainer: {
        flexDirection: 'row', 
        justifyContent: 'space-between',
        width: horizontalScale(200)
    },
    socialLogo: {
        height: horizontalScale(30),
        width: horizontalScale(30)
    },
    campaignListsContainer: {
        
    },
    campaignContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
    },
});

export default styles;