import { get, ref } from 'firebase/database';
import { db } from '@/services/firebase';
import type { DashboardUser } from '@/types/user';
import { mapFirebaseDbError } from '@/utils/firebaseError';

export const fetchUsers = async (
  currentUid: string,
): Promise<DashboardUser[]> => {
  try {
    const snapshot = await get(ref(db, 'users'));

    if (!snapshot.exists()) {
      return [];
    }
    const data = snapshot.val();

    return Object.entries(data)
      .filter(([uid]) => uid !== currentUid) // exclude self
      .map(([uid, user]: any) => ({
        uid,
        email: user?.email ?? '',
        name: user?.name ?? '',
        phone: user?.phone ?? '',
      }));
  } catch (error) {
    throw new Error(mapFirebaseDbError(error));
  }
};
