import { StyleSheet } from "react-native";
import { horizontalScale, scaleFontSize, verticalScale } from "../../assets/styles/scaling";
import { COLORS, SIZES } from "../../constants/theme";

const styles = StyleSheet.create({
    input: {
        backgroundColor: COLORS.boneWhite,
        paddingVertical: verticalScale(SIZES.small),
        paddingHorizontal: horizontalScale(SIZES.xSmall), 
        fontSize: scaleFontSize(SIZES.large),
        color: COLORS.earthlyMocha,
        borderRadius: SIZES.xSmall,
    }
});

export default styles;