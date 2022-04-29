import { createSlice } from '@reduxjs/toolkit';

const searchSlice = createSlice({
  name: 'crypto',
  initialState: {
    query: '' as string,
    result: [] as object[],
  },
  reducers: {
    updateQuery: (state, action) => {
      state.query = action.payload;
    },
    updateResult: (state, action) => {
      state.result = action.payload;
    },
  },
});

export const { updateQuery, updateResult } = searchSlice.actions;

export default searchSlice.reducer;
