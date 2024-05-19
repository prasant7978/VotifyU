import { StyleSheet } from "react-native";
import { COLORS } from "../../constants/theme";
import { horizontalScale, scaleFontSize, verticalScale } from "../../assets/styles/scaling";
import { getFontFamily } from "../../assets/fonts/helper";

const styles = StyleSheet.create({
    container: {
        backgroundColor: COLORS.antifleshWhite,
        borderRadius: horizontalScale(10),
        marginBottom: verticalScale(20),
        paddingVertical: verticalScale(5),
        marginHorizontal: horizontalScale(10),
        borderWidth: horizontalScale(1),
        borderColor: COLORS.lightGray
    },
    positionNameText: {
        fontFamily: getFontFamily('Poppins', '800'),
        color: COLORS.midnightSapphire,
        fontSize: scaleFontSize(28),
        marginLeft: horizontalScale(10)
    },
    winnerContainerShadow: {
        shadowColor: COLORS.darkGray,
        shadowOffset: {
            width: horizontalScale(3),
            height: verticalScale(3)
        },
        shadowOpacity: 0.2,
        shadowRadius: horizontalScale(0.5),
    },
    winnerContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: COLORS.coolWhite,
        paddingVertical: verticalScale(10),
        borderRadius: horizontalScale(7),
        marginHorizontal: horizontalScale(10),
    },
    firstPlaceBadge: {
        height: horizontalScale(50),
        width: horizontalScale(50),
        position: 'absolute',
        top: verticalScale(-7),
        left: horizontalScale(85),
        zIndex: 1,
        transform: [{ 
            rotate: '-40deg' 
        }]
    },
    winnerImage: {
        height: horizontalScale(130),
        width: horizontalScale(100),
        borderRadius: horizontalScale(5)
    },
    winnerNameText: {
        fontFamily: getFontFamily('Inter', '600'),
        color: COLORS.midnightSapphire,
        fontSize: scaleFontSize(24),
        marginTop: verticalScale(5)
    },
    winnerVoteCountLabel: {
        fontFamily: getFontFamily('Inter', '300'),
        color: COLORS.midnightSapphire,
        fontSize: scaleFontSize(18),
    },
    winnerVoteCountText: {
        fontFamily: getFontFamily('Inter', '400'),
        color: COLORS.midnightSapphire,
        fontSize: scaleFontSize(18),
        marginLeft: horizontalScale(3)
    },
    tieMessage: {
        color: COLORS.tertiary,
        marginHorizontal: horizontalScale(10),
        fontFamily: getFontFamily('Inter', '500'),
        textAlign: 'justify'
    },
    bottomContainer: {
        marginTop: verticalScale(14),
    },
    candidateContainerShadow: {
        shadowColor: COLORS.slateShadow,
        shadowOffset: {
            width: horizontalScale(0),
            height: verticalScale(0)
        },
        shadowOpacity: 0.5,
        shadowRadius: horizontalScale(0.5),
    },
    candidateContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: horizontalScale(5),
        backgroundColor: COLORS.boneWhite,
        marginBottom: verticalScale(7),
        marginHorizontal: horizontalScale(10),
        paddingHorizontal: horizontalScale(10),
        paddingVertical: verticalScale(7),
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
    notaContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: horizontalScale(1),
        borderColor: COLORS.lightGray,
        backgroundColor: COLORS.antifleshWhite
    },
    notaContainerText: {
        fontFamily: getFontFamily('Inter', '900'),
        color: COLORS.midnightSapphire,
        fontSize: scaleFontSize(28),
    },
    candidateImage: {
        height: horizontalScale(50),
        width: horizontalScale(50),
        borderRadius: horizontalScale(50),
        borderWidth: horizontalScale(1),
        borderColor: COLORS.lightGray,
    },
    candidateDetailsContainer: {
        marginLeft: horizontalScale(28),
    },
    candidateNameText: {
        fontFamily: getFontFamily('Inter', '500'),
        color: COLORS.midnightSapphire,
        fontSize: scaleFontSize(18),
        marginBottom: verticalScale(3)
    },
    candidateVoteCountLabel: {
        fontFamily: getFontFamily('Inter', '300'),
        color: COLORS.midnightSapphire,
        fontSize: scaleFontSize(15),
    },
    voteCountText: {
        fontFamily: getFontFamily('Inter', '400'),
        color: COLORS.midnightSapphire,
        fontSize: scaleFontSize(15),
        marginLeft: horizontalScale(3)
    },
    badge: {
        height: horizontalScale(30),
        width: horizontalScale(30),
        position: 'absolute',
        left: horizontalScale(46),
        bottom: verticalScale(1)
    }
});

export default styles;