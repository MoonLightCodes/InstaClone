import { createSlice } from "@reduxjs/toolkit";

const getOtherUsers = createSlice({
  name: "getOtherUsers",
  initialState: [],
  reducers: {
    setSendingDataRedux: (state, action) => {
      return action.payload;
    },
  },
});
export default getOtherUsers.reducer;
export const {setSendingDataRedux}= getOtherUsers.actions;
