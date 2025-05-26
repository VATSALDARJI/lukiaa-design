import {Platform, TextStyle, ViewStyle} from 'react-native';
import {colors} from '../constants/colors';
import {Fonts} from '../assets/fonts/Customfont';

interface CommonStyles {
  disabledInputContentStyle: TextStyle;
  inputContent: TextStyle;
  title: TextStyle;
  subText: TextStyle;
  button: ViewStyle;
  buttonText: TextStyle;
  container: ViewStyle;
  card: ViewStyle;
  // Add more styles you use often here
}

export const useCommonStyles = (): CommonStyles => {
  return {
    disabledInputContentStyle: {
      fontSize: 16,
      lineHeight: 21.6,
      color: colors.textSecondary,
      backgroundColor: 'transparent',
      margin: Platform.select({ios: 3, android: 3}),
      marginVertical: Platform.select({ios: 3, android: 3}),
      paddingHorizontal: 16,
      fontFamily: Fonts.inter400,
    },
    inputContent: {
      fontSize: 16,
      lineHeight: 21.6,
      fontFamily: Fonts.inter500,
      color: colors.textSecondary,
      backgroundColor: 'transparent',
      margin: Platform.select({ios: 3, android: 3}),
      marginVertical: Platform.select({ios: 3, android: 3}),
      paddingHorizontal: 16,
    },
    title: {
      fontSize: 24,
      lineHeight: 29,
      fontFamily: Fonts.poppins600,
      marginBottom: 18,
      textAlign: 'center',
      color: colors.textPrimary,
    },
    subText: {
      fontSize: 14,
      lineHeight: 16,
      fontFamily: Fonts.inter400,
      color: colors.textSecondary,
    },
    button: {
      backgroundColor: colors.primaryBrand, // updated from 'primary' to 'primaryBrand'
      paddingVertical: 14,
      paddingHorizontal: 24,
      borderRadius: 8,
      alignItems: 'center',
      justifyContent: 'center',
      elevation: 3, // Android shadow
      shadowColor: '#000', // iOS shadow
      shadowOffset: {width: 0, height: 2},
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
    },
    buttonText: {
      fontSize: 16,
      fontFamily: Fonts.inter700,
      color: colors.white, // Use white color for button text on primaryBrand background
      textTransform: 'uppercase',
    },
    container: {
      flex: 1,
      backgroundColor: colors.background,
      paddingHorizontal: 16,
      paddingVertical: 24,
    },
    card: {
      backgroundColor: colors.white, // Use white from colors
      borderRadius: 8,
      padding: 16,
      shadowColor: '#000',
      shadowOffset: {width: 0, height: 2},
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 2,
    },
  };
};
