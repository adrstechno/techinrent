import { createSlice } from "@reduxjs/toolkit";

const themeSlice = createSlice({
  name: "theme",
  initialState: {
    primaryColor: "#007bff",
    secondaryColor: "#6c757d",
  },
  reducers: {
    setPrimaryColor: (state, action) => {
      state.primaryColor = action.payload;
    },
    setSecondaryColor: (state, action) => {
      state.secondaryColor = action.payload;
    },
  },
});

export const { setPrimaryColor, setSecondaryColor } = themeSlice.actions;
export default themeSlice.reducer;
