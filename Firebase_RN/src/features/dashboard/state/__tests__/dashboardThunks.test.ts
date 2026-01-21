import { configureStore } from '@reduxjs/toolkit';
import { fetchUsersThunk } from '../dashboardSlice';
import { fetchUsers } from '../../data/userRepository';
import type { DashboardUser } from '@/types/user';

jest.mock('../../data/userRepository', () => ({
  fetchUsers: jest.fn(),
}));

const createTestStore = () =>
  configureStore({
    reducer: () => ({}),
  });

const mockUsers: DashboardUser[] = [
  {
    uid: '1',
    email: 'a@mail.com',
    name: 'A',
    phone: '111',
  },
];

describe('fetchUsersThunk', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('fulfilled → returns users', async () => {
    (fetchUsers as jest.Mock).mockResolvedValue(mockUsers);

    const store = createTestStore();

    const result = await store.dispatch(fetchUsersThunk('uid') as any);

    expect(result.type).toBe('dashboard/fetchUsers/fulfilled');
    expect(result.payload).toEqual(mockUsers);
  });

  it('rejected → returns error', async () => {
    (fetchUsers as jest.Mock).mockRejectedValue(new Error('Permission denied'));

    const store = createTestStore();

    const result = await store.dispatch(fetchUsersThunk('uid') as any);

    expect(result.type).toBe('dashboard/fetchUsers/rejected');
    expect(result.payload).toBe('Permission denied');
  });
});
