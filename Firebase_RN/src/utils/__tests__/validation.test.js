import { validateEmail, validatePassword } from '../validators';

describe('Email validation', () => {
  test('valid email', () => {
    expect(validateEmail('test@mail.com')).toBe(true);
  });

  test('invalid email', () => {
    expect(validateEmail('testmail.com')).toBe(false);
  });
});

describe('Password validation', () => {
  test('valid password', () => {
    expect(validatePassword('123456')).toBe(true);
  });

  test('invalid password', () => {
    expect(validatePassword('123')).toBe(false);
  });
});
