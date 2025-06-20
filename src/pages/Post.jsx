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
import { toggleIsUpdate,setCaption,setPreview } from "../redux/postUploadSlice";

const Post = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { data, setData, refetch, handleFetch } = usePostContext();
  const [loading, setLoading] = useState(!data);
  const [fetchFailed, setfetchFailed] = useState(false);
  const { userId } = useAuthContext();
  const dispatch = useDispatch();
   useEffect(() => {
      window.screenTop = 0;
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
    console.log("post", data);
    if (!data) {
      setfetchFailed(true);
      setLoading(false);
      toast.error("Failed getting your posts");
      return;
    }
  };
  useEffect(() => {
    handleGetuserPosts();
  }, [data]);

  return (
    <div className="flex flex-col p-1 justify-center items-center">
      <h1 className="bg-gradient-to-r font-extrabold tracking-widest text-3xl text-transparent bg-clip-text from-purple-400 via-violet-500 to-purple-300">
        My Posts
      </h1>
      {!isModalOpen && (
        <button
          title="Add Post"
          onClick={() => (
            dispatch(toggleIsUpdate(false)),
            dispatch(setPreview("")),
            dispatch(setCaption("")),
            handleOpenModal()
          )}
          className="fixed bottom-2 right-2 bg-slate-600 flex justify-center w-16 h-16 rounded-full items-center text-4xl rotate-45 hover:shadow-lg hover:shadow-slate-300 border border-white shadow-lg hover:bg-gray-400 transition-all duration-300 backdrop-blur-lg"
        >
          ✕
        </button>
      )}
      {isModalOpen && <PostUploadModel onClose={handleCloseModal} />}
      <div className="grid grid-cols-1 justify-items-center">
        {loading && <LoadingElement className="" />}
        {fetchFailed ? (
          <NetworkError />
        ) : data?.filter((e) => e.user === userId)?.length !== 0 ? (
          data
            ?.filter((e) => e.user === userId)
            ?.sort((b, a) => new Date(a.createdAt) - new Date(b.createdAt))
            ?.map((e, i) => (
              <PostCard key={i} data={e} openModel={handleOpenModal} />
            ))
        ) : (
          !isModalOpen && (
            <div className="flex flex-col m-6 items-center justify-center mt-10 p-6 border border-purple-300 rounded-lg shadow-lg bg-purple-50">
              <h1 className="text-xl font-bold text-purple-600 mb-4">
                No posts available
              </h1>
              <p className="text-purple-500 mb-6">
                You haven't posted anything yet. Start sharing your moments!
              </p>
              <button
                onClick={handleOpenModal}
                className="px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-all duration-300"
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
