import { StyleSheet } from "react-native";
import { horizontalScale, scaleFontSize, verticalScale } from "../../assets/styles/scaling";
import { COLORS } from "../../constants/theme";
import { getFontFamily } from "../../assets/fonts/helper";

const styles = StyleSheet.create({
    campaignContainer: {
        marginBottom: horizontalScale(10),
        justifyContent: 'center',
        alignItems: 'center',
        elevation: horizontalScale(4),
        shadowColor: COLORS.slateShadow,
        shadowOffset: {
            width: horizontalScale(2),
            height: verticalScale(2)
        },
        shadowOpacity: 0.5,
        shadowRadius: horizontalScale(5),
    },
    campaignImage: {
        height: horizontalScale(70),
        width: horizontalScale(95),
        borderRadius: horizontalScale(5),
        resizeMode: 'stretch',
        justifyContent: 'center',
        alignItems: 'center'
    },
    titleContainer: {
        backgroundColor: COLORS.boneWhite,
        padding: horizontalScale(5),
    },
    titleText: {
        color: COLORS.midnightSapphire,
        fontFamily: getFontFamily('Poppins', '700'),
        fontSize: scaleFontSize(12),
        textAlign: 'center'
    }
})

export default styles;