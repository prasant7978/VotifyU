import {StyleSheet} from 'react-native';
import {
  horizontalScale,
  scaleFontSize,
  verticalScale,
} from '../../../assets/styles/scaling';
import {COLORS} from '../../../constants/theme';
import {getFontFamily} from '../../../assets/fonts/helper';

const styles = StyleSheet.create({
  imageContainer: {
    alignItems: 'center',
    marginTop: verticalScale(5),
  },
  image: {
    height: horizontalScale(100),
    width: horizontalScale(100),
  },
  container: {
    borderRadius: horizontalScale(10),
    marginTop: verticalScale(20),
    paddingTop: verticalScale(5),
    paddingBottom: verticalScale(15),
    paddingHorizontal: horizontalScale(10),
  },
  manageContainer: {},
  heading: {
    fontFamily: getFontFamily('Poppins', '600'),
    color: COLORS.slateShadow,
    fontSize: scaleFontSize(26),
  },
  manageContentContainer: {
    backgroundColor: COLORS.boneWhite,
    flexDirection: 'row',
    borderRadius: horizontalScale(10),
    paddingHorizontal: horizontalScale(14),
    paddingVertical: verticalScale(12),
  },
  containerShadow: {
    shadowColor: COLORS.darkGray,
    shadowOffset: {
      width: horizontalScale(3),
      height: verticalScale(3),
    },
    shadowOpacity: 0.2,
    shadowRadius: horizontalScale(0.5),
  },
  capsuleContainer: {
    backgroundColor: COLORS.antifleshWhite,
    height: horizontalScale(87),
    width: horizontalScale(82),
    alignItems: 'center',
    borderWidth: horizontalScale(1),
    borderRadius: horizontalScale(5),
    borderColor: COLORS.darkGray,
    padding: horizontalScale(5),
  },
  capsuleContainerText: {
    fontFamily: getFontFamily('Inter', '500'),
    color: COLORS.slateShadow,
    fontSize: scaleFontSize(14),
    marginTop: verticalScale(1.3),
  },
  capsuleImage: {
    height: horizontalScale(60),
    width: horizontalScale(60),
  },
  candidateApplicationContainer: {
    marginTop: verticalScale(24),
    backgroundColor: COLORS.boneWhite,
    paddingHorizontal: horizontalScale(12),
    paddingVertical: verticalScale(9),
    borderRadius: horizontalScale(7),
    flexDirection: 'row',
    alignItems: 'center',
  },
  applicationImage: {
    height: horizontalScale(28),
    width: horizontalScale(25),
  },
  candidateApplicationText: {
    fontFamily: getFontFamily('Inter', '500'),
    color: COLORS.forestShadow,
    fontSize: scaleFontSize(20),
    marginLeft: horizontalScale(8),
  },
});

export default styles;
