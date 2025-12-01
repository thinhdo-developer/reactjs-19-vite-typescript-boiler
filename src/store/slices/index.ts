import { combineReducers, AnyAction } from "@reduxjs/toolkit";
import appSlice, { initialStateApp } from "./appSlice";
import userSlice, { initialStateUser } from "./userSlice";

const combinedReducer = combineReducers({
  app: appSlice.reducer,
  user: userSlice.reducer,
});

const rootReducer = (state: ReturnType<typeof combinedReducer> | undefined, action: AnyAction) => {
  // Clear all data in redux store when user logout
  // Can customize the reset state here
  if (action.type === "user/_logout") {
    state = {
      app: {
        ...initialStateApp,
      },
      user: {
        ...initialStateUser,
        isAuthenticated: false,
      },
    };
  }
  return combinedReducer(state, action);
};

export default rootReducer;
