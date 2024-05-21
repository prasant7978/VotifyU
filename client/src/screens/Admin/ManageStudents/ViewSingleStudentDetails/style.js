import { StyleSheet } from "react-native";
import { horizontalScale, scaleFontSize, verticalScale } from "../../../../assets/styles/scaling";
import { COLORS } from "../../../../constants/theme";
import { getFontFamily } from "../../../../assets/fonts/helper";

const styles = StyleSheet.create({
    container: {
        paddingTop: verticalScale(5),
    },
    imageContainerShadow: {
        shadowColor: COLORS.darkGray,
        shadowOffset: {
            width: horizontalScale(3),
            height: verticalScale(3),
        },
        shadowOpacity: 0.5,
        shadowRadius: horizontalScale(0.5),
        alignItems: 'center'
    },
    imageContainer: {
        backgroundColor: COLORS.antifleshWhite,
        alignItems: 'center',
        justifyContent: 'center',
        paddingBottom: verticalScale(10)
    },
    image: {
        height: verticalScale(130),
        width: horizontalScale(100)
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
    detailsContainer: {
        marginTop: verticalScale(16)
    },
    detailsSubContainer: {
        backgroundColor: COLORS.boneWhite,
        borderRadius: horizontalScale(10),
        padding: horizontalScale(10)
    },
    containerHeading: {
        fontFamily: getFontFamily('Inter', '600'),
        color: COLORS.slateShadow,
        fontSize: scaleFontSize(25),
        marginBottom: verticalScale(7)
    },
    labelText: {
        fontFamily: getFontFamily('Inter', '300'),
        color: COLORS.forestShadow,
        fontSize: scaleFontSize(16),
    },
    detailsText: {
        fontFamily: getFontFamily('Inter', '400'),
        color: COLORS.slateShadow,
        fontSize: scaleFontSize(20),
        paddingHorizontal: horizontalScale(0),
        paddingTop: verticalScale(0)
    },
    secondRowContainer: {
        flexDirection: 'row', 
        justifyContent: 'space-between',
        marginTop: verticalScale(8)
    },
    modalContainer: {
        width: horizontalScale(135),
        marginVertical: verticalScale(5)
    },
    modal: {
        height: verticalScale(42),
        borderColor: COLORS.darkGray,
        borderWidth: horizontalScale(0.8),
        borderRadius: horizontalScale(5),
        paddingHorizontal: horizontalScale(8),
    },
    modalText: {
        fontSize: scaleFontSize(16),
        color: COLORS.slateShadow
    },

    // dropdown style
    dropdownItemListContainer: {
        backgroundColor: COLORS.snowWhite, 
        borderRadius: horizontalScale(5)
    },

    // date picker styles
    dateContainer: {
        justifyContent: 'center'
    },
    dobContainerText: {
        fontFamily: getFontFamily('Inter', '500'),
        textAlign: 'justify'
    },

    dobContainer: {
        marginRight: horizontalScale(18)
    },
    singleDetailsContainer: {
        marginTop: verticalScale(8)
    },
    bottomConatiner: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: horizontalScale(7),
        marginTop: verticalScale(30)
    },
    singleBottomContainer: {
        backgroundColor: COLORS.red,
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
    },
    editableTextInput: {
        borderBottomWidth: horizontalScale(0.5),
        borderBottomColor: COLORS.darkGray,
        paddingTop: verticalScale(3),
    }
})

export default styles;