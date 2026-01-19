import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from 'firebase/auth';
import { ref, set } from 'firebase/database';

import { AuthRepository } from '../domain/authRepository';
import { auth, db } from '@/services/firebase';

export const firebaseAuthRepository: AuthRepository = {
  async signup(email, password) {
    const res = await createUserWithEmailAndPassword(auth, email, password);

    await set(ref(db, `users/${res.user.uid}`), {
      email,
      phone: '',
      photoURL: '',
    });

    return {
      uid: res.user.uid,
      email: res.user.email ?? email,
    };
  },

  async login(email, password) {
    const res = await signInWithEmailAndPassword(auth, email, password);

    return {
      uid: res.user.uid,
      email: res.user.email ?? email,
    };
  },

  async logout() {
    await signOut(auth);
  },
};
