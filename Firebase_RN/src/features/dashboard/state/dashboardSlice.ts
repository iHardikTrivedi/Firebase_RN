import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import { fetchUsers } from '../data/userRepository';
import type { DashboardUser } from '@/types/user';

/**
 * Fetch users except the currently logged-in user
 */
export const fetchUsersThunk = createAsyncThunk<
  DashboardUser[], // return type
  string, // payload (current user uid)
  { rejectValue: string }
>('dashboard/fetchUsers', async (uid, { rejectWithValue }) => {
  try {
    return await fetchUsers(uid);
  } catch (error: any) {
    return rejectWithValue(error?.message ?? 'Failed to fetch users');
  }
});

interface DashboardState {
  users: DashboardUser[];
  loading: boolean;
  error: string | null;
}

const initialState: DashboardState = {
  users: [],
  loading: false,
  error: null,
};

const dashboardSlice = createSlice({
  name: 'dashboard',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchUsersThunk.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUsersThunk.fulfilled, (state, action) => {
        state.users = action.payload;
        state.loading = false;
      })
      .addCase(fetchUsersThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? 'Unable to load users';
      });
  },
});

export default dashboardSlice.reducer;
