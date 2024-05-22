import { StyleSheet } from "react-native";
import { getFontFamily } from "../../../../assets/fonts/helper";
import { COLORS, SIZES } from "../../../../constants/theme";
import { horizontalScale, scaleFontSize, verticalScale } from "../../../../assets/styles/scaling";

const styles = StyleSheet.create({
    conatiner: {
        marginTop: verticalScale(7),
        paddingHorizontal: horizontalScale(5)
    },
    detailsContainer: {
        marginBottom: verticalScale(16)
    },
    labelText: {
        fontFamily: getFontFamily('Inter', '600'),
        color: COLORS.chocolateNoir,
        fontSize: scaleFontSize(17)
    },
    inputDetails: {
        fontFamily: getFontFamily('Inter', '300'),
        color: COLORS.chocolateNoir,
        fontSize: scaleFontSize(18),
        paddingHorizontal: horizontalScale(0),
        paddingBottom: verticalScale(0),
        paddingTop: verticalScale(3),
        borderBottomWidth: horizontalScale(0.5)
    },
    descriptionText: {
        fontFamily: getFontFamily('Inter', '300'),
        color: COLORS.chocolateNoir,
        fontSize: scaleFontSize(17),
        textAlign: 'justify',
        paddingHorizontal: horizontalScale(0),
        paddingBottom: verticalScale(0),
        paddingTop: verticalScale(3),
        borderBottomWidth: horizontalScale(0.5),
    },
    singleResponsibilityContainer: {
        marginBottom: verticalScale(20)
    },
    responsibilityInput: {
        fontFamily: getFontFamily('Inter', '300'),
        color: COLORS.chocolateNoir,
        fontSize: scaleFontSize(17),
        backgroundColor: COLORS.coolWhite,
        paddingHorizontal: horizontalScale(8),
        paddingVertical: verticalScale(5),
        borderRadius: horizontalScale(7),
    },
    responsibilityActions: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: verticalScale(5),
        marginHorizontal: horizontalScale(3)
    },
    actionButton: {
        paddingHorizontal: horizontalScale(10),
        paddingVertical: verticalScale(3),
        borderRadius: horizontalScale(3),
        width: horizontalScale(80),
        marginLeft: horizontalScale(7)
    },
    buttonText: {
        fontFamily: getFontFamily('Inter', '600'),
        color: COLORS.antifleshWhite,
        fontSize: scaleFontSize(18),
        textAlign: 'center'
    },
    addResponsibilityContainer: {
        marginTop: verticalScale(20)
    },
    addButtonText: {
        fontFamily: getFontFamily('Inter', '600'),
        color: COLORS.chocolateNoir,
        fontSize: scaleFontSize(20),
    },
    statusContainer: {
        marginTop: verticalScale(10)
    },
    modalContainer: {
        width: horizontalScale(135),
        marginVertical: verticalScale(5),
        marginLeft: horizontalScale(5)
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
    dropdownItemListContainer: {
        backgroundColor: COLORS.snowWhite, 
        borderRadius: horizontalScale(5)
    },

    bottomContainer: {
        marginVertical: verticalScale(10)
    },
    candidateDetailsContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: verticalScale(5),
        backgroundColor: COLORS.coffeeWhite,
        borderRadius: horizontalScale(10),
        padding: horizontalScale(7)
    },
    candidateImageShadow: {
        shadowColor: COLORS.darkGray,
        shadowOffset: {
            width: horizontalScale(1),
            height: verticalScale(3)
        },
        shadowOpacity: 0.5,
        shadowRadius: horizontalScale(0.5),
    },
    candidateImage: {
        height: horizontalScale(50),
        width: horizontalScale(50),
        borderRadius: horizontalScale(50),
        borderWidth: horizontalScale(1),
        borderColor: COLORS.lightGray,
    },
    candidatePrimaryDetailsContainer: {
        marginLeft: horizontalScale(12),
    },
    candidateNameText: {
        fontFamily: getFontFamily('Inter', '600'),
        color: COLORS.midnightSapphire,
        fontSize: scaleFontSize(18),
        marginBottom: verticalScale(3)
    },
    updateButtonContainer: {
        marginVertical: verticalScale(20)
    },
    deleteBottomContainer: {
        backgroundColor: COLORS.darkLove,
        paddingVertical: verticalScale(SIZES.small),
        borderRadius: horizontalScale(SIZES.xSmall),
        marginTop: verticalScale(8)
    },
    bottomText: {
        textAlign: 'center',
        color: '#FFFFFF',
        fontSize: scaleFontSize(SIZES.large),
        fontFamily: getFontFamily('Inter', '600')
    }
})

export default styles;