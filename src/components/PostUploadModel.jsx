import React, { useState } from "react";
import { toast } from "react-toastify";
import { createPost, fileUpload, updatePost } from "../service/Posts";
import { getToken } from "../utils/getToken";
import { usePostContext } from "../context/AllPostsContext";
import { useDispatch, useSelector } from "react-redux";
import {
  setCaption,
  setPost,
  setPreview,
  toggleIsUpdate,
} from "../redux/postUploadSlice";

const PostUpladModel = ({ onClose }) => {
  const dispatch = useDispatch();
  const { post, preview, caption, isUpdate, postId } = useSelector(
    (state) => state.postUploadReducer
  );
  const [loading, setLoading] = React.useState(false);
  const { setrefetch } = usePostContext();
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      dispatch(setPost(file));
      dispatch(setPreview(URL.createObjectURL(file)));
    }
  };

  const handleRemovePost = () => {
    dispatch(setPreview(""));
  };

  async function handleSubmit() {
    if (!post && caption) {
      toast.error("Update the image");
      return;
    }
    if (!post || !caption) {
      toast.error("Fill Out all the fields");
      return;
    }
    try {
      setLoading(true);
      const formData = new FormData();
      formData.append("file", post);
      const a = await fileUpload(formData);
      const url = a?.data?.data?.file_url;
      const payload = {
        text: caption,
        image: url,
      };
      const { data } = isUpdate
        ? await updatePost(payload, getToken(), postId)
        : await createPost(payload, getToken());
      if (!data) return;
      toast.success(`post ${isUpdate ? "Updated" : "Uploded"} successfully !!`);
      dispatch(setCaption(""));
      dispatch(setPost(null));
      setrefetch((p) => !p);
    } catch (e) {
      toast.error(e.message);
    } finally {
      dispatch(setCaption(""));
      dispatch(setPost(null));
      dispatch(setPreview(""));
      setLoading(false);
      isUpdate &&
        (dispatch(toggleIsUpdate(false)),
        dispatch(setPreview("")),
        dispatch(setCaption("")));
    }
  }

  return (
    <div className="fixed inset-0  bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="w-full max-w-md mx-auto bg-gradient-to-br from-blue-100 to-purple-100 rounded-2xl shadow-lg relative p-6">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 bg-red-600 text-white px-2 py-1 rounded-full text-xs sm:text-sm shadow hover:bg-red-700 transition duration-200"
        >
          ✕
        </button>

        <h1 className="text-xl sm:text-2xl font-extrabold text-slate-800 mb-4 sm:mb-6 text-center">
          {isUpdate ? "Update Your Post" : "Upload Your Post"}
        </h1>
        
        <div className="mb-4 sm:mb-6">
          {preview ? (
            <div className="relative">
              <img
                src={preview}
                alt="Uploaded"
                className="w-full h-48 sm:h-64 object-cover rounded-xl shadow-md"
              />
              <button
                onClick={handleRemovePost}
                className="absolute top-1 right-1 sm:top-2 sm:right-2 bg-red-600 text-white px-2 py-1 rounded-full text-xs sm:text-sm shadow hover:bg-red-700 transition duration-200"
              >
                ✕
              </button>
            </div>
          ) : (
            <label className="block w-full cursor-pointer">
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="hidden"
              />
              <div className="flex flex-col items-center justify-center w-full h-32 sm:h-40 border-2 border-dashed border-slate-400 rounded-xl bg-white hover:bg-slate-50 transition duration-200">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8 sm:h-10 sm:w-10 text-slate-400 mb-1 sm:mb-2"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 16l4-4m0 0l4 4m-4-4v12"
                  />
                </svg>
                <span className="text-xs sm:text-sm font-medium text-slate-600">
                  Click to upload an image
                </span>
              </div>
            </label>
          )}
        </div>
        
        <textarea
          value={caption}
          onChange={(e) => dispatch(setCaption(e.target.value))}
          placeholder="Write a caption..."
          className="w-full p-2 sm:p-3 border border-slate-300 rounded-xl text-xs sm:text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-purple-400 shadow-sm"
          rows="3"
        ></textarea>
        
        <button
          className="mt-3 sm:mt-4 flex w-full bg-purple-600 disabled:cursor-not-allowed justify-center items-center gap-2 sm:gap-3 text-white py-2 rounded-xl font-semibold shadow-md hover:bg-purple-700 transition duration-200 text-sm sm:text-base"
          disabled={!isUpdate && (!post || !caption.trim())}
          onClick={handleSubmit}
        >
          {isUpdate ? "Update" : "Post"}
          {loading && (
            <span className="w-3 h-3 sm:w-4 sm:h-4 rounded-full border-r-transparent border border-purple-200 animate-spin"></span>
          )}
        </button>
      </div>
    </div>
  );
};

export default PostUpladModel;