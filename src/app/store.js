import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../reducers/User.js';

export default configureStore({
  reducer: {
    user: userReducer,
  },
});
