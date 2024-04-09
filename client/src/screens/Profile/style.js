import { StyleSheet } from "react-native";
import { horizontalScale, scaleFontSize, verticalScale } from "../../assets/styles/scaling";
import { getFontFamily } from "../../assets/fonts/helper";
import { COLORS } from "../../constants/theme";

const styles = StyleSheet.create({
    profileContainer: {
        paddingTop: verticalScale(5)
    },
    userPrimaryDetailsContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: COLORS.primary,
        borderTopLeftRadius: horizontalScale(50),
        borderBottomLeftRadius: horizontalScale(50),
        padding: horizontalScale(5),
        marginHorizontal: horizontalScale(10),
        shadowOffset: {
            width: 0,
            height: 0
        },
        shadowOpacity: 0.2,
        shadowRadius: horizontalScale(50),
        elevation: 10,
    },
    profileImageContainer: {
        shadowColor: COLORS.slateShadow,
        shadowOffset: {
            width: 0,
            height: verticalScale(2)
        },
        shadowOpacity: 0.5,
        shadowRadius: horizontalScale(50),
        elevation: 10,
        borderRadius: horizontalScale(50),
    },
    profileImage: {
        height: horizontalScale(90),
        width: horizontalScale(90),
        borderRadius: horizontalScale(50),
        borderWidth: 2,
    },
    userDetailsContainer: {
        height: horizontalScale(90),
        marginLeft: horizontalScale(5),
        justifyContent: 'space-evenly'
    },
    nameText: {
        fontFamily: getFontFamily('Inter', '700'),
        fontSize: scaleFontSize(22),
        color: COLORS.boneWhite,
    },
    emailText: {
        fontFamily: getFontFamily('Inter', '400'),
        fontSize: scaleFontSize(16),
        color: COLORS.snowWhite,
    },
    userSecondaryDetailsContainer: {
        borderRadius: horizontalScale(10),
        backgroundColor: COLORS.snowWhite,
        paddingHorizontal: horizontalScale(15),
        paddingVertical: verticalScale(5),
        marginTop: verticalScale(15),
        shadowColor: COLORS.chocolateNoir,
        shadowOffset: {
            width: 0,
            height: verticalScale(2)
        },
        shadowOpacity: 0.2,
        shadowRadius: horizontalScale(10),
        elevation: 5,
        marginHorizontal: horizontalScale(10),
    },
    inputContainer: { 
        marginVertical: verticalScale(7),
    },
    inputLabelText: { 
        fontFamily: getFontFamily('Inter', '400'),
        color: COLORS.slateShadow,
        fontSize: scaleFontSize(15)
    },
    inputBox: {
        fontFamily: getFontFamily('Inter', '500'),
        color: COLORS.slateShadow,
        fontSize: scaleFontSize(18),
        borderBottomWidth: 0.8,
        borderBottomColor: COLORS.darkGray,
        paddingVertical: verticalScale(0),
        paddingHorizontal: horizontalScale(0)
    },
    addressInputBox: {
        height: verticalScale(50),
        lineHeight: verticalScale(22)
    },
    modalContainer: {
        width: horizontalScale(130),
        marginVertical: verticalScale(5)
    },
    modal: {
        height: verticalScale(42),
        borderColor: COLORS.darkGray,
        borderWidth: horizontalScale(0.8),
        borderRadius: horizontalScale(5),
        paddingHorizontal: horizontalScale(8),
    },
    modalText: {
        fontSize: scaleFontSize(16),
        color: COLORS.slateShadow
    },

    // dropdown style
    dropdownItemListContainer: {
        backgroundColor: COLORS.snowWhite, 
        borderRadius: horizontalScale(5)
    },

    // date picker styles
    dateContainer: {
        justifyContent: 'center'
    },
    dobContainerText: {
        fontFamily: getFontFamily('Inter', '500'),
        textAlign: 'justify'
    },

    flexRow: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    
    changePasswordContainer: {

    },
    changePasswordTextContainer: {
        marginVertical: verticalScale(7)
    },
    changePasswordHeading: {
        fontFamily: getFontFamily('Inter', '700'),
        fontSize: scaleFontSize(20),
        color: COLORS.midnightSapphire
    },
    bottomContainer: {
        paddingHorizontal: horizontalScale(30),
        paddingVertical: verticalScale(15),
    },
    updatePasswordContainer: {
        paddingTop: verticalScale(25)
    },
    updatePasswordText: {
        color: COLORS.secondary,
        fontSize: scaleFontSize(16),
        fontFamily: getFontFamily('Inter', '500'),
        textAlign: 'center'
    }
});

export default styles;