import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  post: null,
  preview: "",
  caption: "",
  isUpdate:false,
  postId:""
};

export const handleEditThunk = (img, cap,pid) => (dispatch, getStore) => {
//   dispatch(setPost(img)); //for editin)g
console.log("thunk",img);
  dispatch(setPreview(img));
  dispatch(setCaption(cap));
  dispatch(toggleIsUpdate(true));
  dispatch(setPostId(pid))
};

const postReducer = createSlice({
  name: "postUploadReducer",
  initialState,
  reducers: {
    setPost: (state, action) => {
      state.post = action.payload;
    },
    setPreview: (state, action) => {
      state.preview = action.payload;
    },
    setCaption: (state, action) => {
      state.caption = action.payload;
    },
    toggleIsUpdate:(state,action)=>{
        state.isUpdate = action.payload;
    },
    setPostId:(state,action)=>{
        state.postId=action.payload
    }
  },
});

export default postReducer.reducer;
export const { setCaption, setPost, setPreview,toggleIsUpdate,setPostId } = postReducer.actions;
