/* -------------------------------------------------------------------------- */
/*                                   MOCKS                                    */
/* -------------------------------------------------------------------------- */

jest.mock('firebase/database', () => ({
  get: jest.fn(),
  ref: jest.fn(),
}));

jest.mock('@/services/firebase', () => ({
  db: {},
}));

jest.mock('@/utils/firebaseError', () => ({
  mapFirebaseDbError: jest.fn(),
}));

/* -------------------------------------------------------------------------- */
/*                                   IMPORTS                                  */
/* -------------------------------------------------------------------------- */

import { fetchUsers } from '../userRepository';
import { get } from 'firebase/database';
import { mapFirebaseDbError } from '@/utils/firebaseError';

/* -------------------------------------------------------------------------- */
/*                                   HELPERS                                  */
/* -------------------------------------------------------------------------- */

const mockSnapshot = (data: any) => ({
  exists: () => Boolean(data),
  val: () => data,
});

/* -------------------------------------------------------------------------- */
/*                                   TESTS                                    */
/* -------------------------------------------------------------------------- */

describe('fetchUsers', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('returns users excluding current user', async () => {
    (get as jest.Mock).mockResolvedValue(
      mockSnapshot({
        uid1: {
          email: 'a@mail.com',
          name: 'A',
          phone: '111',
        },
        uid2: {
          email: 'b@mail.com',
          name: 'B',
          phone: '222',
        },
      }),
    );

    const result = await fetchUsers('uid1');

    expect(result).toEqual([
      {
        uid: 'uid2',
        email: 'b@mail.com',
        name: 'B',
        phone: '222',
      },
    ]);
  });

  it('returns empty array when snapshot does not exist', async () => {
    (get as jest.Mock).mockResolvedValue(mockSnapshot(null));

    const result = await fetchUsers('uid1');

    expect(result).toEqual([]);
  });

  it('handles missing user fields safely', async () => {
    (get as jest.Mock).mockResolvedValue(
      mockSnapshot({
        uid2: {},
      }),
    );

    const result = await fetchUsers('uid1');

    expect(result).toEqual([
      {
        uid: 'uid2',
        email: '',
        name: '',
        phone: '',
      },
    ]);
  });

  it('throws mapped error on Firebase failure', async () => {
    (get as jest.Mock).mockRejectedValue(new Error('firebase-error'));

    (mapFirebaseDbError as jest.Mock).mockReturnValue('Readable DB error');

    await expect(fetchUsers('uid1')).rejects.toThrow('Readable DB error');
  });
});
