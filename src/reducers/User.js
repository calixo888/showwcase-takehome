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
      let newEducation = [...state.education, action.payload];
      newEducation = newEducation.sort((a, b) => new Date(b.startDate) - new Date(a.startDate));
      state.education = newEducation;
    }
  },
});

export const { addName, addEducation } = slice.actions;

export const getName = state => state.user.name;
export const getEducation = state => state.user.education;

export default slice.reducer;
