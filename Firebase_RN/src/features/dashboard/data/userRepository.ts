import { get, ref } from 'firebase/database';
import { db } from '@/services/firebase';
import type { DashboardUser } from '@/types/user';

/**
 * Fetch all users except the currently logged-in user
 */
export const fetchUsers = async (
  currentUid: string,
): Promise<DashboardUser[]> => {
  const snapshot = await get(ref(db, 'users'));

  if (!snapshot.exists()) {
    return [];
  }

  const users = snapshot.val() as Record<string, Omit<DashboardUser, 'uid'>>;

  return Object.keys(users)
    .filter(uid => uid !== currentUid)
    .map(uid => ({
      uid,
      ...users[uid],
    }));
};
