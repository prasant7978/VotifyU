import { StyleSheet } from "react-native";
import { getFontFamily } from "../../assets/fonts/helper";
import { scaleFontSize } from "../../assets/styles/scaling";
import { COLORS, SIZES } from "../../constants/theme";

const styles = StyleSheet.create({
    title1: {
        fontFamily: getFontFamily('Inter', '600'),
        fontSize: scaleFontSize(35),
        color: COLORS.primary
    },
    title2: {
        fontFamily: getFontFamily('Inter', '500'),
        fontSize: scaleFontSize(SIZES.large),
    },
    title3: {
        fontFamily: getFontFamily('Inter', '600'),
        fontSize: scaleFontSize(14),
    },
})

export default styles;