import {StyleSheet} from 'react-native';
import {getFontFamily} from '../../../assets/fonts/helper';
import {COLORS} from '../../../constants/theme';
import {
  horizontalScale,
  scaleFontSize,
  width,
  height,
  verticalScale,
} from '../../../assets/styles/scaling';

const styles = StyleSheet.create({
  chooseFileContainer: {
    marginTop: verticalScale(10),
  },
  labelText: {
    fontFamily: getFontFamily('Inter', '300'),
    color: COLORS.forestShadow,
    fontSize: scaleFontSize(16),
  },
  fileNameText: {
    fontFamily: getFontFamily('Inter', '600'),
    color: COLORS.darkYellow,
    fontSize: scaleFontSize(16),
    marginLeft: horizontalScale(8),
  },
  componenetStyle: {
    width: horizontalScale(width - 83),
    height: verticalScale(height / 2 - 200),
    borderRadius: horizontalScale(8),
  },
  imageContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: horizontalScale(1),
    borderColor: COLORS.slateShadow,
    borderStyle: 'dashed',
    marginTop: verticalScale(5),
  },
  inputBoxContainer: {
    marginTop: verticalScale(25),
  },
  inputBox: {
    marginTop: verticalScale(5),
    backgroundColor: COLORS.boneWhite,
    fontFamily: getFontFamily('Inter', '400'),
    fontSize: scaleFontSize(18),
    color: COLORS.slateShadow,
    paddingHorizontal: horizontalScale(10),
    paddingVertical: verticalScale(7),
    textAlign: 'justify',
    borderBottomWidth: horizontalScale(0.8),
    borderBottomColor: COLORS.darkGray,
    borderRadius: horizontalScale(8),
  },
  buttonContainer: {
    marginTop: verticalScale(30),
    marginBottom: verticalScale(20),
  },
});

export default styles;
