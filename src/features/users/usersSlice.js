import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const USERS_URL = 'https://jsonplaceholder.typicode.com/users';

const initialState = [];

export const fetchUsers = createAsyncThunk('users/fetchUsers', async () => {
  const response = await fetch(USERS_URL);
  const data = await response.json();
  return data;
});

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(fetchUsers.fulfilled, (state, action) => action.payload);
  },
});

export const selectAllUsers = (state) => state.users;
export default usersSlice.reducer;
