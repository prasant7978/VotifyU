import { StyleSheet } from "react-native";
import { horizontalScale, scaleFontSize, verticalScale } from "../../../assets/styles/scaling";
import { COLORS } from "../../../constants/theme";
import { getFontFamily } from "../../../assets/fonts/helper";

const styles = StyleSheet.create({
    imageContainer: {
        height: verticalScale(150),
        width: horizontalScale(100),
        alignSelf: 'center',
        marginTop: verticalScale(5),
        borderRadius: horizontalScale(5),
        backgroundColor: COLORS.antifleshWhite,
        justifyContent: 'center'
    },
    image: {
        height: verticalScale(150),
        width: horizontalScale(100),
        borderRadius: horizontalScale(5),
    },
    imageAltText: {
        fontFamily: getFontFamily('Poppins', '500'),
        color: COLORS.slateShadow,
        fontSize: scaleFontSize(14),
        textAlign: 'center',
        alignSelf: 'center'
    },
    candidateNameContainer: {
        marginTop: verticalScale(7)
    },
    candidateNameText: {
        color: COLORS.slateShadow,
        fontFamily: getFontFamily('Inter', '700'),
        fontSize: scaleFontSize(24),
        textAlign: 'center'
    },
    sloganContainer: {

    },
    sloganText: {
        color: COLORS.slateShadow,
        fontFamily: getFontFamily('Inter', '400'),
        fontSize: scaleFontSize(15),
        textAlign: 'center'
    },
    personalDetailsContainer: {
        borderRadius: horizontalScale(5),
        backgroundColor: COLORS.coffeeWhite,
        padding: horizontalScale(10),
        marginTop: verticalScale(10)
    },
    containerHeading: {
        color: COLORS.slateShadow,
        fontFamily: getFontFamily('Inter', '600'),
        fontSize: scaleFontSize(22),
    },
    singleDetailContainer: {
        marginBottom: verticalScale(10)
    },
    labelText: {
        fontFamily: getFontFamily('Inter', '300'),
        color: COLORS.forestShadow,
        fontSize: scaleFontSize(16),
    },
    personalDetailsText: {
        fontFamily: getFontFamily('Inter', '500'),
        color: COLORS.chocolateNoir,
        fontSize: scaleFontSize(18),
    },
    positionContainer: {
        marginTop: verticalScale(12),
    },
    positionText: {
        color: COLORS.slateShadow,
        fontFamily: getFontFamily('Inter', '400'),
        fontSize: scaleFontSize(18),
    },
    documentsContainer: {
        marginTop: verticalScale(8)
    },
    documentLabelText: {
        color: COLORS.slateShadow,
        fontSize: scaleFontSize(16),
        fontFamily: getFontFamily('Inter', '500')
    },
    pdfContainer: {
        marginBottom: verticalScale(18)
    },
    pdf: {
        width: horizontalScale(330), 
        height: verticalScale(380), 
        backgroundColor: COLORS.midnightSapphire,
        alignSelf: 'center',
        marginTop: verticalScale(5)
    },
    bottomConatiner: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: horizontalScale(7)
    },
    singleBottomContainer: {
        backgroundColor: COLORS.red,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: horizontalScale(5),
        paddingVertical: verticalScale(10),
        paddingHorizontal: horizontalScale(32),
        marginBottom: verticalScale(18)
    },
    bottomText: {
        fontFamily: getFontFamily('Inter', '900'),
        color: COLORS.antifleshWhite,
        fontSize: scaleFontSize(20),
    }
})

export default styles;