import { StyleSheet } from "react-native";
import { COLORS } from "../../constants/theme";
import { getFontFamily } from "../../assets/fonts/helper";
import { horizontalScale, scaleFontSize, verticalScale } from "../../assets/styles/scaling";

const styles = StyleSheet.create({
    container: {
        marginHorizontal: horizontalScale(10)
    },
    imageContainer: {
        // backgroundColor: COLORS.darkMojito,
        justifyContent: 'center',
        alignItems: 'center',
    },
    image: {
        height: verticalScale(150),
        width: horizontalScale(400),
        // backgroundColor: COLORS.lightMojito,
    },
    labelText: {
        color: COLORS.slateShadow,
        fontFamily: getFontFamily('Poppins', '600'),
        fontSize: scaleFontSize(16)
    },
    sloganContainer: {
        marginBottom: verticalScale(15)
    },
    inputBox: {
        fontFamily: getFontFamily('Inter', '400'),
        color: COLORS.slateShadow,
        fontSize: scaleFontSize(16),
        borderWidth: 0.5,
        borderColor: COLORS.darkGray,
        lineHeight: verticalScale(18),
        padding: verticalScale(5),
        borderRadius: horizontalScale(5),
        textAlign: 'justify'
    },
    modalContainer: {
        width: horizontalScale(310),
        marginVertical: verticalScale(5),
        alignSelf: 'center'
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
    documentSelectContainer: {
        flexDirection: 'row', 
        justifyContent: 'center', 
        alignItems: 'center',
        backgroundColor: COLORS.darkSkyLine,
        padding: horizontalScale(5),
        borderRadius: horizontalScale(5),
        width: horizontalScale(300),
        height: verticalScale(35),
        alignSelf: 'center',
        marginBottom: horizontalScale(14)
    },
    documentSelectText: {
        fontFamily: getFontFamily('Inter', '300'),
        color: COLORS.snowWhite,
        textAlign: 'center',
        marginLeft: horizontalScale(7)
    },
    buttonContainer: {
        marginTop: verticalScale(15),
        marginBottom: verticalScale(10)
    },
});

export default styles;