import { get, ref } from 'firebase/database';
import { db } from '../../../services/firebase';

export const fetchUsers = async (currentUid: string) => {
  const snapshot = await get(ref(db, 'users'));
  if (!snapshot.exists()) return [];

  return Object.entries(snapshot.val())
    .filter(([uid]) => uid !== currentUid)
    .map(([uid, user]: any) => ({
      uid,
      email: user.email,
      name: user.name ?? '',
      phone: user.phone ?? '',
    }));
};
