import { createSlice } from "@reduxjs/toolkit";

const postedUsersSlice = createSlice({
    name: "postedUsersSlice",
    initialState: { data: null, likes: null },
    reducers: {
        setPostUserData: (state, action) => {
            state.data = action.payload;
        },
        setIsliked: (state, action) => {
            state.likes = action.payload;
        },
    },
});
export default postedUsersSlice.reducer;
export const { setPostUserData, setIsliked } = postedUsersSlice.actions;
