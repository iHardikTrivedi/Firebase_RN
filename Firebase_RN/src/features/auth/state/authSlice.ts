import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { loginThunk, signupThunk, logoutThunk } from './authThunks';
import { User } from '@/types/user';

interface AuthState {
  user: User | null;
  loading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  user: null,
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    /** Used by Firebase onAuthStateChanged */
    setUser(state, action: PayloadAction<User>) {
      state.user = action.payload;
    },

    /** Clears user on Firebase logout */
    clearUser(state) {
      state.user = null;
    },

    clearAuthError(state) {
      state.error = null;
    },
  },
  extraReducers: builder => {
    builder
      /* LOGIN */
      .addCase(loginThunk.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginThunk.fulfilled, (state, action) => {
        state.user = action.payload;
        state.loading = false;
      })
      .addCase(loginThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = (action.payload as string) ?? 'Login failed';
      })

      /* SIGNUP */
      .addCase(signupThunk.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signupThunk.fulfilled, (state, action) => {
        state.user = action.payload;
        state.loading = false;
      })
      .addCase(signupThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = (action.payload as string) ?? 'Signup failed';
      })

      /* LOGOUT */
      .addCase(logoutThunk.pending, state => {
        state.loading = true;
      })
      .addCase(logoutThunk.fulfilled, state => {
        state.user = null;
        state.loading = false;
      })
      .addCase(logoutThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = (action.payload as string) ?? 'Logout failed';
      });
  },
});

export const { setUser, clearUser, clearAuthError } = authSlice.actions;
export default authSlice.reducer;
