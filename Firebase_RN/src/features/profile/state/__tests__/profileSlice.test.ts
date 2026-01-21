/* -------------------------------------------------------------------------- */
/*                                  MOCKS                                     */
/* -------------------------------------------------------------------------- */

jest.mock('../../data/profileRepository', () => ({
  updateProfile: jest.fn(),
}));

/* -------------------------------------------------------------------------- */
/*                                   IMPORTS                                  */
/* -------------------------------------------------------------------------- */

import reducer, {
  clearProfileError,
  updateProfileThunk,
} from '../profileSlice';

/* -------------------------------------------------------------------------- */
/*                                   TESTS                                    */
/* -------------------------------------------------------------------------- */

describe('profileSlice', () => {
  const initialState = {
    loading: false,
    error: null,
  };

  it('returns initial state', () => {
    expect(reducer(undefined, { type: 'unknown' })).toEqual(initialState);
  });

  it('clears profile error', () => {
    const state = reducer(
      { loading: false, error: 'Some error' },
      clearProfileError(),
    );

    expect(state.error).toBeNull();
  });

  it('handles updateProfileThunk.pending', () => {
    const state = reducer(
      initialState,
      updateProfileThunk.pending('', {
        uid: 'uid1',
        name: 'John',
        phone: '123',
      }),
    );

    expect(state.loading).toBe(true);
    expect(state.error).toBeNull();
  });

  it('handles updateProfileThunk.fulfilled', () => {
    const state = reducer(
      { loading: true, error: null },
      updateProfileThunk.fulfilled({ name: 'John', phone: '123' }, '', {
        uid: 'uid1',
        name: 'John',
        phone: '123',
      }),
    );

    expect(state.loading).toBe(false);
  });

  it('handles updateProfileThunk.rejected', () => {
    const state = reducer(
      { loading: true, error: null },
      updateProfileThunk.rejected(
        null,
        '',
        { uid: 'uid1', name: 'John', phone: '123' },
        'Profile update failed',
      ),
    );

    expect(state.loading).toBe(false);
    expect(state.error).toBe('Profile update failed');
  });
});
