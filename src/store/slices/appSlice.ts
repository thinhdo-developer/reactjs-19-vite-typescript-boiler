import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { AppSliceState } from "@store/type";

export const initialStateApp: AppSliceState = {
  isLoading: false,
};

const appSlice = createSlice({
  name: "app",
  initialState: initialStateApp,
  reducers: {
    updateLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    resetAppSlice: () => {
      return {
        ...initialStateApp,
      };
    },
  },
});

export const { updateLoading } = appSlice.actions;

export default appSlice;
