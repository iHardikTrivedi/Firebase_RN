jest.mock('../../data/userRepository', () => ({
  fetchUsers: jest.fn(),
}));

import reducer, { fetchUsersThunk } from '../dashboardSlice';
import type { DashboardUser } from '@/types/user';

describe('dashboardSlice', () => {
  const initialState = {
    users: [],
    loading: false,
    error: null,
  };

  const mockUsers: DashboardUser[] = [
    {
      uid: '1',
      email: 'a@mail.com',
      name: 'A',
      phone: '111',
    },
  ];

  it('returns initial state', () => {
    expect(reducer(undefined, { type: 'unknown' })).toEqual(initialState);
  });

  it('handles fetchUsersThunk.pending', () => {
    const state = reducer(initialState, fetchUsersThunk.pending('', 'uid'));

    expect(state.loading).toBe(true);
    expect(state.error).toBeNull();
  });

  it('handles fetchUsersThunk.fulfilled', () => {
    const state = reducer(
      initialState,
      fetchUsersThunk.fulfilled(mockUsers, '', 'uid'),
    );

    expect(state.loading).toBe(false);
    expect(state.users).toEqual(mockUsers);
  });

  it('handles fetchUsersThunk.rejected', () => {
    const state = reducer(
      initialState,
      fetchUsersThunk.rejected(null, '', 'uid', 'Permission denied'),
    );

    expect(state.loading).toBe(false);
    expect(state.error).toBe('Permission denied');
  });
});
