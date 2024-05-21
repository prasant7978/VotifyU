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
    buttonContainer: {
        marginTop: verticalScale(50)
    }
})

export default styles;