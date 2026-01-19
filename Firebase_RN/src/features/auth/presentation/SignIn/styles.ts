import { StyleSheet } from 'react-native';
import { FontFamily, FontSize } from '@/constants/fonts';

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  container: {
    flex: 1,
    paddingHorizontal: 28,
    backgroundColor: '#FFFFFF',
  },

  title: {
    fontSize: FontSize.XL,
    fontFamily: FontFamily.SEMI_BOLD,
    color: '#000000',
    marginBottom: 24,
  },

  primaryButton: {
    marginTop: 42,
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
