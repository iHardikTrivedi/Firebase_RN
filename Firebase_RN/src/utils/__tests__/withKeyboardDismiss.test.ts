import { Keyboard } from 'react-native';
import { withKeyboardDismiss } from '../withKeyboardDismiss';

// Mock Keyboard.dismiss
jest.spyOn(Keyboard, 'dismiss').mockImplementation(jest.fn());

describe('withKeyboardDismiss', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('dismisses keyboard and calls wrapped function', () => {
    const fn = jest.fn();
    const wrappedFn = withKeyboardDismiss(fn);

    wrappedFn('arg1', 'arg2');

    expect(Keyboard.dismiss).toHaveBeenCalledTimes(1);
    expect(fn).toHaveBeenCalledWith('arg1', 'arg2');
  });

  it('dismisses keyboard even if function is undefined', () => {
    const wrappedFn = withKeyboardDismiss();

    wrappedFn();

    expect(Keyboard.dismiss).toHaveBeenCalledTimes(1);
  });

  it('does not throw if function is undefined', () => {
    const wrappedFn = withKeyboardDismiss();

    expect(() => wrappedFn()).not.toThrow();
  });
});
