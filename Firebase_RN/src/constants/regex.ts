/**
 * Email format validation
 * Example: test@example.com
 */
export const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * Password rules:
 * - Minimum 6 characters
 * (Firebase default requirement)
 */
export const PASSWORD_REGEX = /^.{6,}$/;

/**
 * Phone number:
 * - Digits only
 * - 7 to 15 digits (international friendly)
 */
export const PHONE_REGEX = /^[0-9]{7,15}$/;
