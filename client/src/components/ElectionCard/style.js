import { StyleSheet } from "react-native";
import { getFontFamily } from "../../assets/fonts/helper";
import { COLORS } from "../../constants/theme";
import { horizontalScale, scaleFontSize, verticalScale } from "../../assets/styles/scaling";

const styles = StyleSheet.create({
    container: {
        backgroundColor: COLORS.coolWhite,
        borderRadius: horizontalScale(10),
        paddingTop: verticalScale(7),
        paddingBottom: verticalScale(10),
        paddingHorizontal: horizontalScale(8),
        marginBottom: verticalScale(20)
    },
    topContainer: {
        flexDirection: 'row',
        // alignItems: 'center',
        // justifyContent: 'space-between'
    },
    positonNameText: {
        fontFamily: getFontFamily('Poppins', '800'),
        color: COLORS.midnightSapphire,
        fontSize: scaleFontSize(28),
        marginLeft: horizontalScale(5)
    },
    infoImage: {
        height: horizontalScale(23),
        width: horizontalScale(23),
        // marginRight: horizontalScale(5),
        marginLeft: horizontalScale(7)
    },
    middleContainer: {
        marginVertical: verticalScale(7)
    },
    candidateCardshadow: {
        shadowColor: COLORS.slateShadow,
        shadowOffset: {
            width: horizontalScale(0),
            height: verticalScale(0)
        },
        shadowOpacity: 0.5,
        shadowRadius: horizontalScale(0.5),
    },
    candidateCardContainer: {
        flexDirection: 'row', 
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: verticalScale(7),
        padding: horizontalScale(7),
        borderRadius: horizontalScale(10),
    },
    shadow: {
        shadowColor: COLORS.slateShadow,
        shadowOffset: {
            width: horizontalScale(0),
            height: verticalScale(2)
        },
        shadowOpacity: 0.5,
        shadowRadius: horizontalScale(2),
    },
    image: {
        height: horizontalScale(40),
        width: horizontalScale(40),
        borderRadius: horizontalScale(50),
        marginLeft: horizontalScale(7),
    },
    candidateNameText: {
        fontFamily: getFontFamily('Inter', '600'),
        color: COLORS.slateShadow,
        fontSize: scaleFontSize(20),
        marginLeft: horizontalScale(10)
    },
    profileInfoImage: {
        height: horizontalScale(18),
        width: horizontalScale(18),
        marginRight: horizontalScale(7)
    },
    bottomContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        // alignItems: 'center',
        // backgroundColor: COLORS.darkMango
    },
    checkBoxContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        // backgroundColor: COLORS.darkMojito,
    },
    notaText: {
        fontFamily: getFontFamily('Inter', '500'),
        color: COLORS.midnightSapphire,
        fontSize: scaleFontSize(16),
        marginLeft: horizontalScale(0)
    },
    voteButton: {
        backgroundColor: COLORS.darkBeach,
        borderRadius: horizontalScale(5),
        paddingTop: verticalScale(3),
        paddingHorizontal: horizontalScale(22)
    },
    buttonText: {
        fontFamily: getFontFamily('Inter', '700'),
        color: COLORS.antifleshWhite,
        fontSize: scaleFontSize(16),
        textAlign: 'center'
    }
});

export default styles;