import { StyleSheet } from "react-native";
import { horizontalScale, scaleFontSize, verticalScale } from "../../../assets/styles/scaling";
import { COLORS } from "../../../constants/theme";
import { getFontFamily } from "../../../assets/fonts/helper";

const styles = StyleSheet.create({
    topContainer: {
        marginHorizontal: horizontalScale(10),
    },
    profileImageContainer: {
        marginTop: verticalScale(10),
        borderRadius: horizontalScale(5),
        width: horizontalScale(120),
        elevation: 10,
        shadowColor: COLORS.slateShadow,
        shadowOffset: {
            width: 0,
            height: verticalScale(2)
        },
        shadowOpacity: 0.5,
        shadowRadius: horizontalScale(5),
    },
    profileImage: {
        width: horizontalScale(120),
        height: horizontalScale(160),
        borderRadius: horizontalScale(5),
    },
    imageContainer: {
        backgroundColor: COLORS.antifleshWhite,
        alignItems: 'center',
        justifyContent: 'center',
        paddingBottom: verticalScale(10)
    },
    noImage: {
        height: verticalScale(100),
        width: horizontalScale(70)
    },
    noImageText: {
        fontFamily: getFontFamily('Inter', '500'),
        color: COLORS.slateShadow,
        fontSize: scaleFontSize(14),
    },
    primaryDetailsContainer: {
        alignItems: 'center',
        marginTop: verticalScale(12)
    },
    candidateNameText: {
        fontFamily: getFontFamily('Inter', '700'),
        color: COLORS.slateShadow,
        fontSize: scaleFontSize(22)
    },
    sloganText: {
        fontFamily: getFontFamily('Poppins', '400'),
        color: COLORS.slateShadow,
        fontSize: scaleFontSize(15),
        textAlign: 'center',
        lineHeight: verticalScale(18),
        marginTop: verticalScale(5)
    },
    secondaryDetailsContainer: {
        // backgroundColor: COLORS.darkBeach
    },
    conatainerHeadingText: {
        fontFamily: getFontFamily('Poppins', '600'),
        color: COLORS.forestShadow,
        fontSize: scaleFontSize(17),
        marginTop: verticalScale(12),
        marginBottom: verticalScale(2)
    },
    singleDetailsContainer: {
        marginBottom: verticalScale(5)
    },
    detailsLabelText: {
        fontFamily: getFontFamily('Inter', '300'),
        color: COLORS.slateShadow,
        fontSize: scaleFontSize(16)
    },
    detailsText: {
        fontFamily: getFontFamily('Inter', '500'),
        color: COLORS.slateShadow,
        fontSize: scaleFontSize(18)
    },
    socialLinksContainer: {

    },
    logoContainer: {
        flexDirection: 'row', 
        justifyContent: 'space-between',
        width: horizontalScale(200)
    },
    socialLogo: {
        height: horizontalScale(30),
        width: horizontalScale(30)
    },
    labelText: {
        fontFamily: getFontFamily('Inter', '400'),
        color: COLORS.forestShadow,
        fontSize: scaleFontSize(16),
    },
    documentsContainer: {
        marginTop: verticalScale(10)
    },
    documentLabelText: {
        color: COLORS.slateShadow,
        fontSize: scaleFontSize(16),
        fontFamily: getFontFamily('Inter', '500')
    },
    pdfContainer: {
        marginBottom: verticalScale(18),
    },
    pdf: {
        width: horizontalScale(310), 
        height: verticalScale(380), 
        backgroundColor: COLORS.midnightSapphire,
        alignSelf: 'center',
        marginTop: verticalScale(5)
    },
    campaignListsContainer: {
        
    },
    campaignContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
    },
    bottomConatiner: {
        paddingHorizontal: horizontalScale(10),
        marginTop: verticalScale(10)
    },
    singleBottomContainer: {
        backgroundColor: COLORS.darkLove,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: horizontalScale(5),
        paddingVertical: verticalScale(10),
        paddingHorizontal: horizontalScale(32),
        marginBottom: verticalScale(18)
    },
    bottomText: {
        fontFamily: getFontFamily('Inter', '900'),
        color: COLORS.antifleshWhite,
        fontSize: scaleFontSize(20),
    }
});

export default styles;