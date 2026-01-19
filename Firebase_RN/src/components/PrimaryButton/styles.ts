import { StyleSheet } from 'react-native';
import { FontFamily, FontSize } from '../../constants/fonts';

const styles = StyleSheet.create({
  loginButton: {
    height: 54,
    borderRadius: 4,
    backgroundColor: '#F83758',
    alignItems: 'center',
    justifyContent: 'center',
  },
  loginButtonText: {
    color: '#FFFFFF',
    fontSize: FontSize.LG,
    fontFamily: FontFamily.SEMI_BOLD,
  },
});

export default styles;
