import { createSlice } from '@reduxjs/toolkit';

export const slice = createSlice({
  name: 'user',
  initialState: {
    name: "",
    education: []
  },
  reducers: {
    addName: (state, action) => {
      state.name = action.payload;
    },
    addEducation: (state, action) => {
      state.education = [...state.education, action.payload];
    }
  },
});

export const { addName, addEducation } = slice.actions;

export const getName = state => state.user.name;
export const getEducation = state => state.user.education;

export default slice.reducer;
