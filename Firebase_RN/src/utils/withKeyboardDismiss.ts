import { Keyboard } from 'react-native';

export function withKeyboardDismiss<T extends unknown[]>(
  fn?: (...args: T) => void,
) {
  return (...args: T) => {
    Keyboard.dismiss();
    fn?.(...args);
  };
}
