import { StyleSheet } from 'react-native';
import { FontFamily, FontSize } from '../../constants/fonts';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: 12,
    alignItems: 'center',
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#E0E0E0',
  },
  info: {
    marginLeft: 10,
  },
  name: {
    fontSize: FontSize.MD,
    fontFamily: FontFamily.SEMI_BOLD,
    color: '#222',
  },
  email: {
    fontSize: FontSize.SM,
    fontFamily: FontFamily.REGULAR,
    color: '#666',
  },
  phone: {
    fontSize: FontSize.SM,
    fontFamily: FontFamily.REGULAR,
    color: '#666',
  },
});

export default styles;
