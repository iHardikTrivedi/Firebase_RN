import { configureStore } from '@reduxjs/toolkit';
import { loginThunk, signupThunk, logoutThunk } from '../authThunks';
import { firebaseAuthRepository } from '../../data/firebaseAuthRepository';
import { User } from '@/types/user';

/* -------------------------------------------------------------------------- */
/*                              MOCK REPOSITORY                                */
/* -------------------------------------------------------------------------- */

jest.mock('../../data/firebaseAuthRepository', () => ({
  firebaseAuthRepository: {
    login: jest.fn(),
    signup: jest.fn(),
    logout: jest.fn(),
  },
}));

/* -------------------------------------------------------------------------- */
/*                                  HELPERS                                    */
/* -------------------------------------------------------------------------- */

const createTestStore = () =>
  configureStore({
    reducer: () => ({}), // minimal reducer is enough
  });

const mockUser: User = {
  uid: 'uid123',
  email: 'test@mail.com',
  name: 'John',
  phone: '9999999999',
};

/* -------------------------------------------------------------------------- */
/*                                   TESTS                                     */
/* -------------------------------------------------------------------------- */

describe('authThunks', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  /* -------------------------------- LOGIN --------------------------------- */

  it('loginThunk → fulfilled on success', async () => {
    (firebaseAuthRepository.login as jest.Mock).mockResolvedValue(mockUser);

    const store = createTestStore();

    const result = await store.dispatch(
      loginThunk({
        email: 'test@mail.com',
        password: 'password',
      }) as any,
    );

    expect(result.type).toBe('auth/login/fulfilled');
    expect(result.payload).toEqual(mockUser);
  });

  it('loginThunk → rejected on error', async () => {
    (firebaseAuthRepository.login as jest.Mock).mockRejectedValue(
      new Error('Invalid credentials'),
    );

    const store = createTestStore();

    const result = await store.dispatch(
      loginThunk({
        email: 'x',
        password: 'y',
      }) as any,
    );

    expect(result.type).toBe('auth/login/rejected');
    expect(result.payload).toBe('Invalid credentials');
  });

  /* -------------------------------- SIGNUP -------------------------------- */

  it('signupThunk → fulfilled on success', async () => {
    (firebaseAuthRepository.signup as jest.Mock).mockResolvedValue(mockUser);

    const store = createTestStore();

    const result = await store.dispatch(
      signupThunk({
        email: 'test@mail.com',
        password: 'password',
      }) as any,
    );

    expect(result.type).toBe('auth/signup/fulfilled');
    expect(result.payload).toEqual(mockUser);
  });

  /* -------------------------------- LOGOUT -------------------------------- */

  it('logoutThunk → fulfilled on success', async () => {
    (firebaseAuthRepository.logout as jest.Mock).mockResolvedValue(undefined);

    const store = createTestStore();

    const result = await store.dispatch(logoutThunk() as any);

    expect(result.type).toBe('auth/logout/fulfilled');
  });

  it('logoutThunk → rejected on error', async () => {
    (firebaseAuthRepository.logout as jest.Mock).mockRejectedValue(
      new Error('Logout failed'),
    );

    const store = createTestStore();

    const result = await store.dispatch(logoutThunk() as any);

    expect(result.type).toBe('auth/logout/rejected');
    expect(result.payload).toBe('Logout failed');
  });
});
