import { createSlice } from '@reduxjs/toolkit';

export const slice = createSlice({
  name: 'user',
  initialState: {
    name: ""
  },
  reducers: {
    addName: (state, action) => {
      console.log("state", state);
      console.log("action", action);
      state.name = action.payload;
      console.log("state", state);
    },
  },
});

export const { addName } = slice.actions;

export const getName = state => state.user.name;

export default slice.reducer;
