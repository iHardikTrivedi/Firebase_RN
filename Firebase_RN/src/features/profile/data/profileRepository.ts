import { update, ref as dbRef } from 'firebase/database';
import {
  ref as storageRef,
  uploadBytes,
  getDownloadURL,
} from 'firebase/storage';

import { db, storage } from '@/services/firebase';

/**
 * Update user profile (name, phone, optional profile image)
 */
export const updateProfile = async (
  uid: string,
  name: string,
  phone: string,
  imageUri?: string,
): Promise<void> => {
  let photoURL: string | undefined;

  // Upload profile image if provided
  if (imageUri) {
    const response = await fetch(imageUri);
    const blob = await response.blob();

    const imgRef = storageRef(storage, `profiles/${uid}.jpg`);
    await uploadBytes(imgRef, blob);
    photoURL = await getDownloadURL(imgRef);
  }

  // Update user profile in database
  await update(dbRef(db, `users/${uid}`), {
    name,
    phone,
    ...(photoURL ? { photoURL } : {}),
  });
};
