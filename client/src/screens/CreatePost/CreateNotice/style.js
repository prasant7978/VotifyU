import {StyleSheet} from 'react-native';
import {getFontFamily} from '../../../assets/fonts/helper';
import {COLORS} from '../../../constants/theme';
import {
  horizontalScale,
  scaleFontSize,
  verticalScale,
  height,
} from '../../../assets/styles/scaling';

const styles = StyleSheet.create({
  titleInputBoxContainer: {
    marginTop: verticalScale(20),
  },
  inputBox: {
    backgroundColor: COLORS.coffeeWhite,
    borderRadius: horizontalScale(8),
    paddingHorizontal: horizontalScale(10),
    fontSize: scaleFontSize(18),
    color: COLORS.chocolateNoir,
    fontFamily: getFontFamily('Inter', '500'),
    paddingTop: verticalScale(5),
    marginTop: verticalScale(3),
  },
  descriptionInputBoxContainer: {
    marginTop: verticalScale(30),
  },
  descriptionInputBox: {
    height: verticalScale(height / 2 - 150),
  },
  lableText: {
    fontFamily: getFontFamily('Poppins', '400'),
    color: COLORS.forestShadow,
    fontSize: scaleFontSize(16),
  },
  buttonContainer: {
    marginTop: verticalScale(70),
    marginBottom: verticalScale(20),
  },
});

export default styles;
