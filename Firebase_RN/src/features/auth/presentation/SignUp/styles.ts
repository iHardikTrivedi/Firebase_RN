import { StyleSheet } from 'react-native';
import { FontFamily, FontSize } from '@/constants/fonts';

const styles = StyleSheet.create({
  title: {
    fontSize: FontSize.XL,
    fontFamily: FontFamily.SEMI_BOLD,
    color: '#000000',
    marginBottom: 24,
  },

  primaryButton: {
    marginTop: 32,
  },

  text: {
    fontSize: FontSize.XS,
    fontFamily: FontFamily.REGULAR,
    color: '#676767',
    marginTop: 16,
    textAlign: 'center',
  },
  highlight: {
    fontSize: FontSize.XS,
    fontFamily: FontFamily.SEMI_BOLD,
    color: '#FF4B26',
  },

  footerRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 22,
  },
  footerText: {
    fontSize: FontSize.SM,
    color: '#575757',
    fontFamily: FontFamily.REGULAR,
  },
  signUpText: {
    fontSize: FontSize.SM,
    color: '#F83758',
    fontFamily: FontFamily.SEMI_BOLD,
    textDecorationLine: 'underline',
  },
});

export default styles;
