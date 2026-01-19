import { EMAIL_REGEX } from '../constants/regex';

export const validateEmail = (email: string): boolean =>
  EMAIL_REGEX.test(email.trim());

export const validatePassword = (password: string): boolean =>
  password.length >= 6;
