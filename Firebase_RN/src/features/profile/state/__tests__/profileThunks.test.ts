import { configureStore } from '@reduxjs/toolkit';
import { updateProfileThunk } from '../profileSlice';
import reducer from '../profileSlice';
import { updateProfile } from '../../data/profileRepository';

jest.mock('../../data/profileRepository', () => ({
  updateProfile: jest.fn(),
}));

const createTestStore = () =>
  configureStore({
    reducer: {
      profile: reducer,
    },
  });

describe('updateProfileThunk', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('dispatches fulfilled on success', async () => {
    (updateProfile as jest.Mock).mockResolvedValue(undefined);

    const store = createTestStore();

    const result = await store.dispatch(
      updateProfileThunk({
        uid: 'uid123',
        name: 'John',
        phone: '999',
      }),
    );

    expect(updateProfile).toHaveBeenCalledWith(
      'uid123',
      'John',
      '999',
      undefined,
    );

    expect(result.type).toBe('profile/updateProfile/fulfilled');
  });

  it('dispatches rejected on error', async () => {
    (updateProfile as jest.Mock).mockRejectedValue(new Error('Update failed'));

    const store = createTestStore();

    const result = await store.dispatch(
      updateProfileThunk({
        uid: 'uid123',
        name: 'John',
        phone: '999',
      }),
    );

    expect(result.type).toBe('profile/updateProfile/rejected');

    expect(result.payload).toBe('Update failed');
  });
});
