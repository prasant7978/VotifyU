import { StyleSheet } from "react-native";
import { horizontalScale, scaleFontSize, verticalScale } from "../../../assets/styles/scaling";
import { getFontFamily } from "../../../assets/fonts/helper";
import { COLORS } from "../../../constants/theme";

const styles = StyleSheet.create({
    profileContainer: {
        paddingTop: verticalScale(15)
    },
    userPrimaryDetailsContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: COLORS.primary,
        borderTopLeftRadius: horizontalScale(50),
        borderBottomLeftRadius: horizontalScale(50),
        borderTopRightRadius: horizontalScale(3),
        borderBottomRightRadius: horizontalScale(3),
        padding: horizontalScale(6),
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
        height: horizontalScale(90),
        width: horizontalScale(90),
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
    editImageIcon: {
        height: horizontalScale(23),
        width: horizontalScale(23),
        zIndex: 1,
        position: 'absolute',
        right: horizontalScale(3),
        bottom: verticalScale(2),
        opacity: 1
    },
    userDetailsContainer: {
        height: horizontalScale(90),
        marginLeft: horizontalScale(5),
        justifyContent: 'space-evenly'
    },
    nameText: {
        fontFamily: getFontFamily('Inter', '700'),
        fontSize: scaleFontSize(20),
        color: COLORS.boneWhite,
    },
    emailText: {
        fontFamily: getFontFamily('Inter', '400'),
        fontSize: scaleFontSize(16),
        color: COLORS.snowWhite,
    },
    uploadImageButton: {
        backgroundColor: COLORS.lightGray,
        borderRadius: horizontalScale(3),
        padding: horizontalScale(3),
        marginTop: verticalScale(10),
        marginHorizontal: horizontalScale(10),
        width: horizontalScale(100),
        position: 'absolute',
        right: horizontalScale(7),
        top: verticalScale(80)
    },
    uploadImageButtonText: {
        fontFamily: getFontFamily('Inter', '500'),
        fontSize: scaleFontSize(13),
        color: COLORS.slateShadow,
        textAlign: 'center'
    },
    userSecondaryDetailsContainer: {
        borderRadius: horizontalScale(10),
        backgroundColor: COLORS.snowWhite,
        paddingHorizontal: horizontalScale(15),
        paddingVertical: verticalScale(5),
        marginTop: verticalScale(30),
        shadowColor: COLORS.chocolateNoir,
        shadowOffset: {
            width: horizontalScale(3),
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
        paddingBottom: verticalScale(0),
        paddingTop: verticalScale(3),
        paddingHorizontal: horizontalScale(0)
    },
    modalContainer: {
        width: horizontalScale(135),
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
        paddingTop: verticalScale(45)
    },
    updatePasswordText: {
        color: COLORS.secondary,
        fontSize: scaleFontSize(16),
        fontFamily: getFontFamily('Inter', '500'),
        textAlign: 'center'
    }
});

export default styles;