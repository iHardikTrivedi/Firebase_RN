import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  title: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 20,
    color: '#000',
  },

  label: {
    fontSize: 14,
    color: '#444',
    marginBottom: 6,
  },

  input: {
    borderWidth: 1,
    borderColor: '#CCC',
    borderRadius: 8,
    padding: 10,
    marginBottom: 16,
    fontSize: 14,
    color: '#000',
  },

  disabledInput: {
    backgroundColor: '#F2F2F2',
    color: '#888',
  },

  button: {
    height: 48,
    borderRadius: 8,
    backgroundColor: '#F83758',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },

  disabledButton: {
    opacity: 0.6,
  },

  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },

  logoutButton: {
    marginTop: 20,
    alignItems: 'center',
  },

  logoutText: {
    color: 'red',
    fontSize: 16,
    fontWeight: '500',
  },
});

export default styles;
