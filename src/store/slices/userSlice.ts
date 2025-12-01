import storageHelpers from "@/utils/storage";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { UserSliceState } from "@store/type";

export const initialStateUser: UserSliceState = {
  isAuthenticated: !!storageHelpers.token.get(),
  status: "idle",
};

const userSlice = createSlice({
  name: "user",
  initialState: initialStateUser,
  reducers: {
    changeAuthenticatedStatus: (state, action: PayloadAction<boolean>) => {
      state.isAuthenticated = action.payload;
    },
    _logout: () => {},
    resetUserSlice: () => {
      return {
        ...initialStateUser,
      };
    },
  },
});

export const { changeAuthenticatedStatus, resetUserSlice, _logout } = userSlice.actions;

export default userSlice;
