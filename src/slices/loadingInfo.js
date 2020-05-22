import { createSlice } from '@reduxjs/toolkit';

const slice = createSlice({
  name: 'loadingInfo',
  initialState: {
    isLoading: false,
  },
  reducers: {
    toggleLoadingState: (state) => {
      state.isLoading = !state.isLoading;
    },
  },
});

export const { actions } = slice;
export default slice.reducer;
