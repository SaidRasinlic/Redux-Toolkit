import { createSlice } from '@reduxjs/toolkit';

const initialState = [
  {
    id: 1,
    name: 'John Doe',
  },
  {
    id: 2,
    name: 'Marcus Levante',
  },
  {
    id: 3,
    name: 'Jacob Jacobson',
  },
];

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
});

export const selectAllUsers = (state) => state.users;
export default usersSlice.reducer;
