import { AuthRepository } from '../domain/authRepository';
import { auth, db } from '../../../services/firebase';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from 'firebase/auth';
import { ref, set, get } from 'firebase/database';

export const firebaseAuthRepository: AuthRepository = {
  async signup(email, password) {
    const res = await createUserWithEmailAndPassword(auth, email, password);

    await set(ref(db, `users/${res.user.uid}`), {
      email,
      name: '',
      phone: '',
    });

    return { uid: res.user.uid, email };
  },

  async login(email, password) {
    const res = await signInWithEmailAndPassword(auth, email, password);

    // fetch profile data
    const snap = await get(ref(db, `users/${res.user.uid}`));
    const profile = snap.val();

    return {
      uid: res.user.uid,
      email: res.user.email!,
      name: profile?.name ?? '',
      phone: profile?.phone ?? '',
    };
  },

  async logout() {
    await signOut(auth);
  },
};
