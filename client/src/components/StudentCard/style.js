import { StyleSheet } from "react-native";
import { COLORS } from "../../constants/theme";
import { horizontalScale, scaleFontSize, verticalScale } from "../../assets/styles/scaling";
import { getFontFamily } from "../../assets/fonts/helper";

const styles = StyleSheet.create({
    container: {
        backgroundColor: COLORS.antifleshWhite,
        marginTop: verticalScale(10),
        borderRadius: horizontalScale(10),
        padding: horizontalScale(10),
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: horizontalScale(1),
        borderColor: COLORS.lightGray
    },
    imageContainerShadow: {
        shadowColor: COLORS.darkGray,
        shadowOffset: {
        width: horizontalScale(2),
        height: verticalScale(3),
        },
        shadowOpacity: 0.5,
        shadowRadius: horizontalScale(0.5),
    },
    image: {
        height: horizontalScale(50),
        width: horizontalScale(50),
        resizeMode: 'cover',
        borderRadius: horizontalScale(50)
    },
    detailsContainer: {
        marginLeft: horizontalScale(14)
    },
    nameText: {
        fontFamily: getFontFamily('Inter', '600'),
        color: COLORS.forestShadow,
        fontSize: scaleFontSize(20)
    },
    secondaryText: {
        fontFamily: getFontFamily('Inter', '400'),
        color: COLORS.forestShadow,
        fontSize: scaleFontSize(16)
    }
})

export default styles;