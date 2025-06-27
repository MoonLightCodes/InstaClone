import { configureStore } from "@reduxjs/toolkit";
import PostReducer from "./postUploadSlice";
import getOtherUsersReducer from "./otherUsersSlice";
import postedUsersSlice from "./postedUsersSlice"
export const store = configureStore({
  reducer: {
    postUploadReducer: PostReducer,
    getOtherUsers: getOtherUsersReducer,
    postedUsersSlice:postedUsersSlice
  },
});

