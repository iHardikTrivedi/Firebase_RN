/* -------------------------------------------------------------------------- */
/*                                  MOCKS                                     */
/* -------------------------------------------------------------------------- */

jest.mock('@/services/firebase', () => ({
  db: {},
  storage: {},
}));

jest.mock('firebase/database', () => ({
  update: jest.fn(),
  ref: jest.fn((_db, path) => path),
}));

jest.mock('firebase/storage', () => ({
  ref: jest.fn((_storage, path) => path),
  uploadBytes: jest.fn(),
  getDownloadURL: jest.fn(() => Promise.resolve('https://photo.url')),
}));

global.fetch = jest.fn(() =>
  Promise.resolve({
    blob: () => Promise.resolve('blob'),
  } as any),
) as jest.Mock;

/* -------------------------------------------------------------------------- */
/*                                   IMPORTS                                  */
/* -------------------------------------------------------------------------- */

import { update } from 'firebase/database';
import { uploadBytes, getDownloadURL } from 'firebase/storage';
import { updateProfile } from '../profileRepository';

/* -------------------------------------------------------------------------- */
/*                                   TESTS                                    */
/* -------------------------------------------------------------------------- */

describe('updateProfile', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('updates name and phone without image', async () => {
    await updateProfile('uid123', 'John', '9999999999');

    expect(update).toHaveBeenCalledWith('users/uid123', {
      name: 'John',
      phone: '9999999999',
    });

    expect(uploadBytes).not.toHaveBeenCalled();
  });

  it('uploads image and updates photoURL', async () => {
    await updateProfile('uid123', 'John', '9999999999', 'file://image.jpg');

    expect(uploadBytes).toHaveBeenCalled();
    expect(getDownloadURL).toHaveBeenCalled();

    expect(update).toHaveBeenCalledWith('users/uid123', {
      name: 'John',
      phone: '9999999999',
      photoURL: 'https://photo.url',
    });
  });
});
