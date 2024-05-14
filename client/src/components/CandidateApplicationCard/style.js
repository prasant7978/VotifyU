import { StyleSheet } from "react-native";
import { COLORS } from "../../constants/theme";
import { horizontalScale, scaleFontSize, verticalScale } from "../../assets/styles/scaling";
import { getFontFamily } from "../../assets/fonts/helper";

const styles = StyleSheet.create({
    container: {
        backgroundColor: COLORS.coffeeWhite,
        padding: horizontalScale(7), 
        borderRadius: horizontalScale(10),
        shadowColor: '#000000',
        shadowOffset: { 
            width: 0, 
            height: 3
        },
        shadowOpacity: 0.5,
        shadowRadius: horizontalScale(10),
        elevation: horizontalScale(5),
        flexDirection: 'row',
        alignItems: 'center',
        marginHorizontal: horizontalScale(5),
        marginVertical: verticalScale(3)
    },
    textContainer: {
        marginLeft: horizontalScale(12)
    },
    imageContainer: {

    },
    image: {
        height: horizontalScale(60),
        width: horizontalScale(60),
        borderRadius: horizontalScale(50),
        // backgroundColor: '#fff'
    },
    avatarContainer: {
        borderRadius: horizontalScale(50),
        borderWidth: horizontalScale(1),
        borderColor: COLORS.tertiary
    },
    candidateNameContainer: {
        marginBottom: verticalScale(3)
    },
    candidateNameText: {
        color: COLORS.midnightSapphire,
        fontFamily: getFontFamily('Inter', '700'),
        fontSize: scaleFontSize(20)
    },
    positionNameContainer: {
        marginTop: verticalScale(3)
    },
    labelText: {
        color: COLORS.velvetAubergine,
        fontFamily: getFontFamily('Inter', '300'),
        fontSize: scaleFontSize(14)
    },
    positionNameText: {
        color: COLORS.velvetAubergine,
        fontFamily: getFontFamily('Poppins', '500'),
        fontSize: scaleFontSize(16)
    },
});

export default styles;