import { StyleSheet } from 'react-native';
import { FontFamily, FontSize } from '../../constants/fonts';

const styles = StyleSheet.create({
  inputWrapper: {
    height: 54,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#A8A8A9',
    backgroundColor: '#F3F3F3',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    marginTop: 14,
  },
  input: {
    flex: 1,
    fontSize: FontSize.SM,
    fontFamily: FontFamily.MEDIUM,
    color: '#676767',
    paddingHorizontal: 8,
  },
});

export default styles;
