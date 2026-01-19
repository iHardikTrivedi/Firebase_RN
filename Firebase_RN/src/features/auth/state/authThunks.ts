import { createAsyncThunk } from '@reduxjs/toolkit';

import { firebaseAuthRepository } from '../data/firebaseAuthRepository';
import type { LoginRequest, SignupRequest } from '@/types/auth';
import type { User } from '@/types/user';

/**
 * Login with email & password
 */
export const loginThunk = createAsyncThunk<
  User, // return type
  LoginRequest, // payload type
  { rejectValue: string }
>('auth/login', async ({ email, password }, { rejectWithValue }) => {
  try {
    return await firebaseAuthRepository.login(email, password);
  } catch (error: any) {
    return rejectWithValue(error?.message ?? 'Login failed');
  }
});

/**
 * Register new user
 */
export const signupThunk = createAsyncThunk<
  User,
  SignupRequest,
  { rejectValue: string }
>('auth/signup', async ({ email, password }, { rejectWithValue }) => {
  try {
    return await firebaseAuthRepository.signup(email, password);
  } catch (error: any) {
    return rejectWithValue(error?.message ?? 'Signup failed');
  }
});

/**
 * Logout user
 */
export const logoutThunk = createAsyncThunk<
  void,
  void,
  { rejectValue: string }
>('auth/logout', async (_, { rejectWithValue }) => {
  try {
    await firebaseAuthRepository.logout();
  } catch (error: any) {
    return rejectWithValue(error?.message ?? 'Logout failed');
  }
});
