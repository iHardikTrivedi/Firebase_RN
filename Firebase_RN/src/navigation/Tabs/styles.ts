import { StyleSheet, Platform } from 'react-native';

const styles = StyleSheet.create({
  tabBar: {
    height: Platform.OS === 'ios' ? 86 : 70,
    paddingBottom: Platform.OS === 'ios' ? 20 : 10,
    paddingTop: 10,
    borderTopWidth: 0,
    elevation: 0,
    backgroundColor: '#FFFFFF',
  },

  label: {
    fontSize: 12,
    marginTop: 4,
  },
});

export default styles;
