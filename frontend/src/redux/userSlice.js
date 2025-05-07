import { createSlice } from '@reduxjs/toolkit';

const userInfo = JSON.parse(localStorage.getItem('user'));

const userSlice = createSlice({
  name: 'user',
  initialState: {
    user: userInfo || null,
  },
  reducers: {
    loginSuccess: (state, action) => {
      state.user = action.payload;
      localStorage.setItem('user', JSON.stringify(action.payload));
    },
    logout: (state) => {
      state.user = null;
      localStorage.removeItem('user');
    },
  },
});

export const { loginSuccess, logout } = userSlice.actions;
export default userSlice.reducer;
