import { StyleSheet } from "react-native";
import { horizontalScale, scaleFontSize, verticalScale } from "../../../assets/styles/scaling";
import { COLORS } from "../../../constants/theme";
import { getFontFamily } from "../../../assets/fonts/helper";

const styles = StyleSheet.create({
    topContainer: {
        paddingHorizontal: horizontalScale(10),
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: verticalScale(15)
    },
    imageShadow: {
        shadowColor: COLORS.darkGray,
        shadowOffset: {
            width: horizontalScale(3),
            height: verticalScale(3),
        },
        shadowOpacity: 0.5,
        shadowRadius: horizontalScale(0.5),
    },
    profileImage: {
        width: horizontalScale(100),
        height: horizontalScale(100),
        borderRadius: horizontalScale(50),
    },
    imageContainer: {
        backgroundColor: COLORS.antifleshWhite,
        alignItems: 'center',
        justifyContent: 'center',
    },
    noImage: {
        height: verticalScale(100),
        width: horizontalScale(100)
    },
    editImageIcon: {
        height: horizontalScale(23),
        width: horizontalScale(23),
        zIndex: 1,
        position: 'absolute',
        right: horizontalScale(3),
        bottom: verticalScale(2),
        opacity: 1
    },
    uploadImageButton: {
        backgroundColor: COLORS.lightGray,
        borderRadius: horizontalScale(3),
        padding: horizontalScale(3),
        marginTop: verticalScale(15),
        marginHorizontal: horizontalScale(10),
        width: horizontalScale(100),
    },
    uploadImageButtonText: {
        fontFamily: getFontFamily('Inter', '500'),
        fontSize: scaleFontSize(13),
        color: COLORS.slateShadow,
        textAlign: 'center'
    },
    primaryDetailsContainer: {
        marginTop: verticalScale(15)
    },
    candidateEmailText: {
        fontFamily: getFontFamily('Inter', '700'),
        color: COLORS.slateShadow,
        fontSize: scaleFontSize(22)
    },
    labelText: {
        fontFamily: getFontFamily('Inter', '400'),
        color: COLORS.slateShadow,
        fontSize: scaleFontSize(16),
    },
    detailsText: {
        fontFamily: getFontFamily('Inter', '500'),
        color: COLORS.slateShadow,
        fontSize: scaleFontSize(16),
    },
    userSecondaryDetailsContainer: {
        borderRadius: horizontalScale(10),
        backgroundColor: COLORS.antifleshWhite,
        paddingHorizontal: horizontalScale(15),
        paddingBottom: verticalScale(20),
        marginTop: verticalScale(30),
        shadowColor: COLORS.chocolateNoir,
        shadowOffset: {
            width: verticalScale(3),
            height: verticalScale(3)
        },
        shadowOpacity: 0.5,
        shadowRadius: horizontalScale(10),
        elevation: 5,
        marginHorizontal: horizontalScale(10),
    },
    inputContainer: { 
        marginTop: verticalScale(20),
    },
    inputBox: {
        fontFamily: getFontFamily('Inter', '500'),
        color: COLORS.slateShadow,
        fontSize: scaleFontSize(20),
        borderBottomWidth: 0.8,
        borderBottomColor: COLORS.darkGray,
        paddingVertical: verticalScale(0),
        paddingHorizontal: horizontalScale(0)
    },
    conatainerHeadingText: {
        fontFamily: getFontFamily('Poppins', '600'),
        color: COLORS.forestShadow,
        fontSize: scaleFontSize(17),
        marginTop: verticalScale(12),
        marginBottom: verticalScale(2)
    },
    updatePasswordContainer: {
        paddingTop: verticalScale(20)
    },
    updatePasswordText: {
        color: COLORS.secondary,
        fontSize: scaleFontSize(16),
        fontFamily: getFontFamily('Inter', '500'),
        textAlign: 'center'
    },
    bottomContainer: {
        paddingHorizontal: horizontalScale(30),
        paddingTop: verticalScale(15),
    },
    campaignListsContainer: {
        paddingHorizontal: horizontalScale(10),
        marginTop: verticalScale(7)
    },
    campaignContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
    },
});

export default styles;