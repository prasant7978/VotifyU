import { StyleSheet } from "react-native";
import { getFontFamily } from "../../assets/fonts/helper";
import { COLORS } from "../../constants/theme";
import { horizontalScale, scaleFontSize, verticalScale } from "../../assets/styles/scaling";

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: horizontalScale(15)
    }, 
    imageContainer: {
        justifyContent: 'center',
        marginTop: verticalScale(5),
        flexDirection: 'row'
    },
    availabilityImage: {
        height: horizontalScale(55),
        width: horizontalScale(55),
        position: 'absolute',
        left: horizontalScale(30),
        bottom: verticalScale(-8)
    },
    helpImage: {
        height: horizontalScale(55),
        width: horizontalScale(55),
        position: 'absolute',
        right: horizontalScale(30),
        bottom: verticalScale(-8)
    },
    containerHeading: {
        fontFamily: getFontFamily('Poppins', '500'),
        color: COLORS.forestShadow,
        fontSize: scaleFontSize(25),
    },
    aboutUsText: {
        fontFamily: getFontFamily('Inter', '300'),
        color: COLORS.forestShadow,
        fontSize: scaleFontSize(14),
        textAlign: 'justify',
    },
    studentSupportContainer: {
        marginTop: verticalScale(14)
    },
    supportText: {
        fontFamily: getFontFamily('Inter', '500'),
        color: COLORS.forestShadow,
        fontSize: scaleFontSize(15),
        textAlign: 'justify',
    },
    contactsContainer: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    contactLabelText: {
        fontFamily: getFontFamily('Inter', '500'),
        color: COLORS.slateShadow,
        fontSize: scaleFontSize(18),
    },
    contactDetailsText: {
        fontFamily: getFontFamily('Inter', '400'),
        color: COLORS.slateShadow,
        fontSize: scaleFontSize(17),
        marginLeft: horizontalScale(5),
    },
    link: {
        paddingTop: verticalScale(5),
        paddingBottom: verticalScale(7),
        paddingHorizontal: horizontalScale(10),
        borderRadius: horizontalScale(5),
        backgroundColor: '#f0f0f0',
    },
    linkText: {
        color: '#0000EE',
        textDecorationLine: 'underline',
        textAlign: 'center'
    },
    image: {
        height: horizontalScale(100),
        width: horizontalScale(100)
    },
});

export default styles;