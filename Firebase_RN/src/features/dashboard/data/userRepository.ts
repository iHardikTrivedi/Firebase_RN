import { get, ref } from 'firebase/database';
import { db } from '@/services/firebase';
import type { DashboardUser } from '@/types/user';

export const fetchUsers = async (
  currentUid: string,
): Promise<DashboardUser[]> => {
  try {
    const snapshot = await get(ref(db, 'users'));

    if (!snapshot.exists()) {
      return [];
    }

    const data = snapshot.val();

    return Object.keys(data)
      .filter(uid => uid !== currentUid) // 🔥 exclude self
      .map(uid => ({
        uid,
        email: data[uid].email ?? '',
        name: data[uid].name ?? '',
        phone: data[uid].phone ?? '',
      }));
  } catch (error) {
    console.error('fetchUsers error:', error);
    throw error;
  }
};
