import { StyleSheet, Platform } from 'react-native';

const globalStyles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  screen: {
    flex: 1,
    paddingHorizontal: 28,
    paddingTop: Platform.OS === 'ios' ? 8 : 16,
  },
});

export default globalStyles;
