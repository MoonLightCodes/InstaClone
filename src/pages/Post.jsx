import React, { useEffect, useState } from "react";
import PostUploadModel from "../components/PostUploadModel";
import { getCurrentUserInfo, getUserDetails } from "../service/userServices";
import { getToken } from "../utils/getToken";
import { toast } from "react-toastify";
import { usePostContext } from "../context/AllPostsContext";
import LoadingElement from "../components/LoadingElement";
import NetworkError from "../components/NetworkError";
import PostCard from "../components/PostCard";
import { useAuthContext } from "../context/AuthContext";
import { useDispatch } from "react-redux";
import {
  toggleIsUpdate,
  setCaption,
  setPreview,
} from "../redux/postUploadSlice";

const Post = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { data, setData, refetch, handleFetch ,loading } = usePostContext();
  // const [loading, setLoading] = useState(!data);
  const [fetchFailed, setfetchFailed] = useState(false);
  const { userId } = useAuthContext();
  const dispatch = useDispatch();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const handleOpenModal = () => {
    setIsModalOpen(true);
  };
  const handleCloseModal = () => {
    setIsModalOpen(false);
  };
  useEffect(() => {
    handleFetch();
  }, [refetch]);

  const handleGetuserPosts = async () => {
    if (!data) {
      setfetchFailed(true);
      // setLoading(false);
      toast.error("Failed getting your posts");
      handleFetch();
      return;
    }
  };
  useEffect(() => {
    // handleGetuserPosts();
      // setLoading(false);

  }, [data]);

  return (
    <div className={`flex flex-col p-1 justify-center items-center min-h-screen bg-gradient-to-br from-purple-100 via-purple-200 to-purple-50 `}>
      <h1 className="bg-gradient-to-r font-extrabold tracking-widest text-4xl text-transparent bg-clip-text from-purple-500 via-violet-600 to-purple-400 drop-shadow-lg mb-6 mt-4">
        My Posts
      </h1>
      {!isModalOpen && (
        <button
          title="Add Post"
          onClick={() =>
            void (dispatch(toggleIsUpdate(false)),
            dispatch(setPreview("")),
            dispatch(setCaption("")),
            handleOpenModal(),
            window.scrollTo(0, 0))
          }
          className="fixed bottom-4 right-4 bg-gradient-to-br from-purple-500 via-violet-500 to-purple-400 flex justify-center w-16 h-16 rounded-full items-center text-4xl rotate-45 hover:shadow-2xl hover:shadow-purple-300 border-2 border-white shadow-lg hover:bg-purple-600 transition-all duration-300 backdrop-blur-lg text-white"
        >
          ✕
        </button>
      )}
      {isModalOpen && <PostUploadModel onClose={handleCloseModal} />}
      <div className={`grid grid-cols-1 justify-items-center w-full max-w-2xl ${isModalOpen?"blur-2xl ":""}`}>
        {loading && <LoadingElement className="text-purple-500" />}
        {fetchFailed ? (
          <NetworkError />
        ) : data?.filter((e) => e.user === userId)?.length !== 0 ? (
          data
            ?.filter((e) => e.user === userId)
            ?.sort((b, a) => new Date(a.createdAt) - new Date(b.createdAt))
            ?.map((e, i) => (
              <div key={i} className="w-full mb-6">
                <PostCard
                  data={e}
                  openModel={handleOpenModal}
                  cardClassName="border-2 border-purple-200 shadow-lg shadow-purple-100 rounded-xl bg-white hover:bg-purple-50 transition-all duration-300"
                />
              </div>
            ))
        ) : (
          !isModalOpen && (
            <div className="flex flex-col m-6 items-center justify-center mt-10 p-8 border-2 border-purple-300 rounded-2xl shadow-2xl bg-gradient-to-br from-purple-50 via-purple-100 to-purple-200">
              <h1 className="text-2xl font-bold text-purple-700 mb-4 drop-shadow">
                No posts available
              </h1>
              <p className="text-purple-600 mb-6">
                You haven't posted anything yet. Start sharing your moments!
              </p>
              <button
                onClick={handleOpenModal}
                className="px-6 py-2 bg-gradient-to-r from-purple-500 via-violet-500 to-purple-400 text-white rounded-lg hover:bg-purple-600 hover:scale-105 shadow-lg transition-all duration-300"
              >
                Post Your First Post
              </button>
            </div>
          )
        )}
      </div>
    </div>
  );
};
export default Post;
