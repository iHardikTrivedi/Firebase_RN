import reducer, { setUser, clearUser, clearAuthError } from '../authSlice';
import { User } from '@/types/user';

/* -------------------------------------------------------------------------- */
/*                             MOCK AUTH THUNKS                                */
/* -------------------------------------------------------------------------- */

jest.mock('../authThunks', () => ({
  loginThunk: {
    pending: { type: 'auth/login/pending' },
    fulfilled: { type: 'auth/login/fulfilled' },
    rejected: { type: 'auth/login/rejected' },
  },
  signupThunk: {
    pending: { type: 'auth/signup/pending' },
    fulfilled: { type: 'auth/signup/fulfilled' },
    rejected: { type: 'auth/signup/rejected' },
  },
  logoutThunk: {
    pending: { type: 'auth/logout/pending' },
    fulfilled: { type: 'auth/logout/fulfilled' },
    rejected: { type: 'auth/logout/rejected' },
  },
}));

/* -------------------------------------------------------------------------- */
/*                                TEST DATA                                   */
/* -------------------------------------------------------------------------- */

const mockUser: User = {
  uid: 'uid123',
  email: 'test@mail.com',
  name: 'John',
  phone: '9999999999',
};

const initialState = {
  user: null,
  loading: false,
  error: null,
};

/* -------------------------------------------------------------------------- */
/*                                   TESTS                                     */
/* -------------------------------------------------------------------------- */

describe('authSlice', () => {
  it('should return initial state', () => {
    expect(reducer(undefined, { type: 'unknown' })).toEqual(initialState);
  });

  /* ------------------------------- reducers -------------------------------- */

  it('setUser should set user', () => {
    const state = reducer(initialState, setUser(mockUser));

    expect(state.user).toEqual(mockUser);
  });

  it('clearUser should clear user', () => {
    const state = reducer({ ...initialState, user: mockUser }, clearUser());

    expect(state.user).toBeNull();
  });

  it('clearAuthError should clear error', () => {
    const state = reducer(
      { ...initialState, error: 'Some error' },
      clearAuthError(),
    );

    expect(state.error).toBeNull();
  });

  /* ----------------------------- LOGIN THUNK ------------------------------- */

  it('login.pending sets loading true', () => {
    const state = reducer(initialState, {
      type: 'auth/login/pending',
    });

    expect(state.loading).toBe(true);
    expect(state.error).toBeNull();
  });

  it('login.fulfilled sets user and loading false', () => {
    const state = reducer(initialState, {
      type: 'auth/login/fulfilled',
      payload: mockUser,
    });

    expect(state.user).toEqual(mockUser);
    expect(state.loading).toBe(false);
  });

  it('login.rejected sets error', () => {
    const state = reducer(initialState, {
      type: 'auth/login/rejected',
      payload: 'Login failed',
    });

    expect(state.loading).toBe(false);
    expect(state.error).toBe('Login failed');
  });

  /* ----------------------------- SIGNUP THUNK ------------------------------ */

  it('signup.pending sets loading true', () => {
    const state = reducer(initialState, {
      type: 'auth/signup/pending',
    });

    expect(state.loading).toBe(true);
    expect(state.error).toBeNull();
  });

  it('signup.fulfilled sets user', () => {
    const state = reducer(initialState, {
      type: 'auth/signup/fulfilled',
      payload: mockUser,
    });

    expect(state.user).toEqual(mockUser);
    expect(state.loading).toBe(false);
  });

  it('signup.rejected sets error', () => {
    const state = reducer(initialState, {
      type: 'auth/signup/rejected',
      payload: 'Signup failed',
    });

    expect(state.loading).toBe(false);
    expect(state.error).toBe('Signup failed');
  });

  /* ----------------------------- LOGOUT THUNK ------------------------------ */

  it('logout.pending sets loading true', () => {
    const state = reducer(initialState, {
      type: 'auth/logout/pending',
    });

    expect(state.loading).toBe(true);
  });

  it('logout.fulfilled clears user', () => {
    const state = reducer(
      { ...initialState, user: mockUser },
      { type: 'auth/logout/fulfilled' },
    );

    expect(state.user).toBeNull();
    expect(state.loading).toBe(false);
  });

  it('logout.rejected sets error', () => {
    const state = reducer(initialState, {
      type: 'auth/logout/rejected',
      payload: 'Logout failed',
    });

    expect(state.loading).toBe(false);
    expect(state.error).toBe('Logout failed');
  });
});
