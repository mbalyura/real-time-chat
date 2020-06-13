import { createSlice } from '@reduxjs/toolkit';

const slice = createSlice({
  name: 'modalsInfo',
  initialState: {
    activeModal: null,
  },
  reducers: {
    setModal: (state, { payload: { activeModal } }) => {
      state.activeModal = activeModal;
    },
  },
});

export const { actions } = slice;
export default slice.reducer;
