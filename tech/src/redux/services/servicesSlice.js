import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  selectedService: 'connections',
  stats: {
    verifiedAccounts: 1000,
    activeProviders: 500,
    supportHours: 24,
  },
};

const servicesSlice = createSlice({
  name: 'services',
  initialState,
  reducers: {
    selectService: (state, action) => {
      state.selectedService = action.payload;
    },
  },
});

export const { selectService } = servicesSlice.actions;
export default servicesSlice.reducer;
