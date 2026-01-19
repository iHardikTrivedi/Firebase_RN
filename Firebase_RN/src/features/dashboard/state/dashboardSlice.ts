import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchUsers } from '../data/userRepository';
import type { DashboardUser } from '@/types/user';

export const fetchUsersThunk = createAsyncThunk<
  DashboardUser[],
  string,
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
      })
      .addCase(fetchUsersThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload;
      })
      .addCase(fetchUsersThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? 'Permission denied';
      });
  },
});

export default dashboardSlice.reducer;
