import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isProfileSetup: false
};

const userProfileSlice = createSlice({
  name: 'userProfile',
  initialState,
  reducers: {
    ProfileSetupCompleted: (state) => {
      state.isProfileSetup = true;
    },
    // You can add more reducers if needed, e.g.:
    resetProfileSetup: (state) => {
      state.isProfileSetup = false;
    }
  },
});

// Export actions
export const { ProfileSetupCompleted, resetProfileSetup } = userProfileSlice.actions;

// Export reducer
export default userProfileSlice.reducer;

// Optionally, you can export selectors
export const selectIsProfileSetup = (state: { userProfile: typeof initialState }) =>
  state.userProfile.isProfileSetup;