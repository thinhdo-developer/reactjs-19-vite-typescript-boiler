export type AppSliceState = {
  isLoading: boolean;
};

export type UserSliceState = {
  isAuthenticated: boolean;
  user?: any;
  status: "idle" | "loading" | "succeeded" | "failed";
};
