import { configureStore } from "@reduxjs/toolkit";
import PostReducer from "./postUploadSlice";

export const store = configureStore({
  reducer: {
    postUploadReducer: PostReducer,
  },
});

