import { StyleSheet } from "react-native";
import { horizontalScale, scaleFontSize, verticalScale } from "../../../../assets/styles/scaling";
import { getFontFamily } from "../../../../assets/fonts/helper";
import { COLORS } from "../../../../constants/theme";

const styles = StyleSheet.create({
    imageContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: verticalScale(20),
        marginBottom: verticalScale(5)
    },
    image: {
        height: horizontalScale(100),
        width: horizontalScale(100)
    },
    inputContainer: {
        marginTop: verticalScale(24)
    },
    labelText: {
        fontFamily: getFontFamily('Poppins', '300'),
        color: COLORS.chocolateNoir,
        fontSize: scaleFontSize(18),
    },
    inputText: {
        fontFamily: getFontFamily('Inter', '500'),
        color: COLORS.slateShadow,
        fontSize: scaleFontSize(20),
        paddingHorizontal: horizontalScale(0),
        paddingVertical: verticalScale(0),
        borderBottomWidth: horizontalScale(0.5),
        borderBottomColor: COLORS.darkGray,
    },
    statusContainer: {
        marginTop: verticalScale(20),
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    modalContainer: {
        width: horizontalScale(150),
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
    buttonContainer: {
        marginVertical: verticalScale(30)
    },
})

export default styles;