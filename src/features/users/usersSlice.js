import { createEntityAdapter, createSelector } from '@reduxjs/toolkit';
import apiSlice from '../api/apiSlice';

const usersAdapter = createEntityAdapter();

const initialState = usersAdapter.getInitialState();

export const usersApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getUsers: builder.query({
      query: () => '/users',
      transformResponse: (responseData) => usersAdapter.setAll(initialState, responseData),
      providesTags: (result) => [
        { type: 'User', id: 'LIST' },
        ...result.ids.map((id) => ({ type: 'User', id })),
      ],
    }),
  }),
});

// Returns query result object
export const selectUsersResult = usersApiSlice.endpoints.getUsers.select();

// Creates memoized selector used for normalization
export const selectUsersData = createSelector(
  selectUsersResult,
  (usersResult) => usersResult.data,
);

// getSelectors creates these selectors and we rename them with aliases using destructuring
export const {
  selectAll: selectAllUsers,
  // Pass in a selector that returns the posts slice of state
} = usersAdapter.getSelectors((state) => selectUsersData(state) ?? initialState);

export const {
  useGetUsersQuery,
} = usersApiSlice;
