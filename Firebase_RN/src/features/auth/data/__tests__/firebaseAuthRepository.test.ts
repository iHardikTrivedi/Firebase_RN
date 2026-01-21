import { firebaseAuthRepository } from '../firebaseAuthRepository';

/* -------------------------------------------------------------------------- */
/*                               MOCK FIREBASE                                 */
/* -------------------------------------------------------------------------- */

jest.mock('@/services/firebase', () => ({
  auth: {},
  db: {},
}));

// ---- firebase/auth ----
const mockCreateUser = jest.fn();
const mockSignIn = jest.fn();
const mockSignOut = jest.fn();

jest.mock('firebase/auth', () => ({
  createUserWithEmailAndPassword: (...args: any[]) => mockCreateUser(...args),
  signInWithEmailAndPassword: (...args: any[]) => mockSignIn(...args),
  signOut: (...args: any[]) => mockSignOut(...args),
}));

// ---- firebase/database ----
const mockSet = jest.fn();
const mockGet = jest.fn();
const mockRef = jest.fn((_, path) => path);

jest.mock('firebase/database', () => ({
  ref: (...args: any[]) => mockRef(...args),
  set: (...args: any[]) => mockSet(...args),
  get: (...args: any[]) => mockGet(...args),
}));

// ---- error mapper ----
jest.mock('@/utils/firebaseAuthError', () => ({
  mapFirebaseAuthError: jest.fn(() => 'Mapped error'),
}));

import { mapFirebaseAuthError } from '@/utils/firebaseAuthError';

/* -------------------------------------------------------------------------- */
/*                                   TESTS                                     */
/* -------------------------------------------------------------------------- */

describe('firebaseAuthRepository', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('signup', () => {
    it('creates user and saves profile', async () => {
      mockCreateUser.mockResolvedValue({
        user: {
          uid: 'uid123',
          email: 'test@mail.com',
        },
      });

      await firebaseAuthRepository.signup('test@mail.com', 'password123');

      expect(mockCreateUser).toHaveBeenCalled();
      expect(mockSet).toHaveBeenCalledWith('users/uid123', {
        email: 'test@mail.com',
        name: '',
        phone: '',
      });
    });

    it('returns uid and email', async () => {
      mockCreateUser.mockResolvedValue({
        user: {
          uid: 'uid123',
          email: 'test@mail.com',
        },
      });

      const result = await firebaseAuthRepository.signup(
        'test@mail.com',
        'password123',
      );

      expect(result).toEqual({
        uid: 'uid123',
        email: 'test@mail.com',
      });
    });

    it('throws mapped error on failure', async () => {
      mockCreateUser.mockRejectedValue(new Error('firebase error'));

      await expect(firebaseAuthRepository.signup('a', 'b')).rejects.toThrow(
        'Mapped error',
      );

      expect(mapFirebaseAuthError).toHaveBeenCalled();
    });
  });

  describe('login', () => {
    it('logs in and fetches profile', async () => {
      mockSignIn.mockResolvedValue({
        user: {
          uid: 'uid123',
          email: 'test@mail.com',
        },
      });

      mockGet.mockResolvedValue({
        val: () => ({
          name: 'John',
          phone: '9999999999',
        }),
      });

      const result = await firebaseAuthRepository.login(
        'test@mail.com',
        'password123',
      );

      expect(result).toEqual({
        uid: 'uid123',
        email: 'test@mail.com',
        name: 'John',
        phone: '9999999999',
      });
    });

    it('returns empty profile if DB has no data', async () => {
      mockSignIn.mockResolvedValue({
        user: {
          uid: 'uid123',
          email: 'test@mail.com',
        },
      });

      mockGet.mockResolvedValue({
        val: () => null,
      });

      const result = await firebaseAuthRepository.login(
        'test@mail.com',
        'password123',
      );

      expect(result).toEqual({
        uid: 'uid123',
        email: 'test@mail.com',
        name: '',
        phone: '',
      });
    });

    it('throws mapped error on failure', async () => {
      mockSignIn.mockRejectedValue(new Error('firebase error'));

      await expect(firebaseAuthRepository.login('a', 'b')).rejects.toThrow(
        'Mapped error',
      );

      expect(mapFirebaseAuthError).toHaveBeenCalled();
    });
  });

  describe('logout', () => {
    it('signs out user', async () => {
      await firebaseAuthRepository.logout();

      expect(mockSignOut).toHaveBeenCalledTimes(1);
    });
  });
});
