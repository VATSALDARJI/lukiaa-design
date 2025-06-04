import { combineReducers } from "@reduxjs/toolkit";
import authReducer from  './slice/authSlice';
import userProfileReducer from  './slice/userProfile';

export const rootReducer = combineReducers({
     auth: authReducer,
     userProfile:  userProfileReducer
});

export type RootState = ReturnType<typeof rootReducer>;