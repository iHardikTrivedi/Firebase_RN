import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import { updateProfile } from '../data/profileRepository';
import type { UpdateProfileRequest } from '@/types/user';

/**
 * Update user profile (name, phone, profile image)
 */
export const updateProfileThunk = createAsyncThunk<
  { name: string; phone: string }, // return type
  UpdateProfileRequest, // payload type
  { rejectValue: string }
>(
  'profile/updateProfile',
  async ({ uid, name, phone, imageUri }, { rejectWithValue }) => {
    try {
      await updateProfile(uid, name, phone, imageUri);
      return { name, phone };
    } catch (error: any) {
      return rejectWithValue(error?.message ?? 'Profile update failed');
    }
  },
);

interface ProfileState {
  loading: boolean;
  error: string | null;
}

const initialState: ProfileState = {
  loading: false,
  error: null,
};

const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    clearProfileError(state) {
      state.error = null;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(updateProfileThunk.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateProfileThunk.fulfilled, state => {
        state.loading = false;
      })
      .addCase(updateProfileThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? 'Profile update failed';
      });
  },
});

export const { clearProfileError } = profileSlice.actions;
export default profileSlice.reducer;
