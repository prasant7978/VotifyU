import { StyleSheet } from "react-native";
import { COLORS, SIZES } from "../../constants/theme";
import { horizontalScale, scaleFontSize, verticalScale } from "../../assets/styles/scaling";
import { getFontFamily } from "../../assets/fonts/helper";

const styles = StyleSheet.create({
    button: {
        backgroundColor: COLORS.primary,
        paddingVertical: verticalScale(SIZES.small),
        borderRadius: horizontalScale(SIZES.xSmall)
    },
    buttonDisable: {
        opacity: 0.5
    },
    btnText: {
        textAlign: 'center',
        color: '#FFFFFF',
        fontSize: scaleFontSize(SIZES.large),
        fontFamily: getFontFamily('Inter', '600')
    }
});

export default styles;