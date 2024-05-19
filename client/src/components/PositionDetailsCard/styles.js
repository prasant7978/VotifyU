import { StyleSheet } from "react-native";
import { COLORS } from "../../constants/theme";
import { horizontalScale, scaleFontSize, verticalScale } from "../../assets/styles/scaling";
import { getFontFamily } from "../../assets/fonts/helper";

const styles = StyleSheet.create({
    container: {
        backgroundColor: COLORS.antifleshWhite,
        borderRadius: horizontalScale(10),
        marginVertical: verticalScale(7),
        paddingHorizontal: horizontalScale(10),
        paddingVertical: verticalScale(5),
        borderWidth: horizontalScale(0.5),
        borderColor: COLORS.lightGray
    },
    positionNameText: {
        fontFamily: getFontFamily('Poppins', '700'),
        color: COLORS.midnightSapphire,
        fontSize: scaleFontSize(28)
    },
    descriptionText: {
        fontFamily: getFontFamily('Inter', '300'),
        color: COLORS.midnightSapphire,
        fontSize: scaleFontSize(15),
        textAlign: 'justify'
    },
    responsibilitiesContainer: {
        marginTop: verticalScale(10)
    },
    containerHeading: {
        fontFamily: getFontFamily('Inter', '500'),
        color: COLORS.midnightSapphire,
        fontSize: scaleFontSize(20)
    },
    singleResponsibilityContainer: {
        flexDirection: 'row', 
        alignItems: 'flex-start',
        paddingLeft: horizontalScale(3),
        paddingRight: horizontalScale(12),
        marginVertical: verticalScale(3),
    },
    resposibilityNumberText: {
        fontFamily: getFontFamily('Inter', '600'),
        color: COLORS.midnightSapphire,
        fontSize: scaleFontSize(14),
    },
    bottomContainer: {
        marginTop: verticalScale(10)
    },
    candidateDetailsContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: verticalScale(5),
        backgroundColor: COLORS.coffeeWhite,
        borderRadius: horizontalScale(10),
        padding: horizontalScale(7)
    },
    candidateImageShadow: {
        shadowColor: COLORS.darkGray,
        shadowOffset: {
            width: horizontalScale(1),
            height: verticalScale(3)
        },
        shadowOpacity: 0.5,
        shadowRadius: horizontalScale(0.5),
    },
    candidateImage: {
        height: horizontalScale(50),
        width: horizontalScale(50),
        borderRadius: horizontalScale(50),
        borderWidth: horizontalScale(1),
        borderColor: COLORS.lightGray,
    },
    candidatePrimaryDetailsContainer: {
        marginLeft: horizontalScale(12),
    },
    candidateNameText: {
        fontFamily: getFontFamily('Inter', '600'),
        color: COLORS.midnightSapphire,
        fontSize: scaleFontSize(18),
        marginBottom: verticalScale(3)
    },
    positionName: {
        fontFamily: getFontFamily('Inter', '300'),
        color: COLORS.midnightSapphire,
        fontSize: scaleFontSize(14),
    }
});

export default styles;