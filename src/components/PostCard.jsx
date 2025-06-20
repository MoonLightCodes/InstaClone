import React, { useEffect } from "react";
import { useState } from "react";
import {
  FaHeart,
  FaRegHeart,
  FaRegComment,
  FaTrash,
  FaEdit,
} from "react-icons/fa";
import { getToken } from "../utils/getToken";
import { getUserDetails } from "../service/userServices";
import { useAuthContext } from "../context/AuthContext";
import { FaTrashCan } from "react-icons/fa6";
import { deletePost, likePost, UnlikePost } from "../service/Posts";
import CommentsModal from "./CommentsModal";
import { toast } from "react-toastify";
import { usePostContext } from "../context/AllPostsContext";
import { useDispatch } from "react-redux";
import { handleEditThunk } from "../redux/postUploadSlice";
const PostCard = ({ data, openModel }) => {
  const [postUserData, setPostUserData] = useState(null);
  const [isLiked, setIsliked] = useState(null);
  const [isCommentsOpen, ssetIsCommentsOpen] = useState(null);
  const { userId, user } = useAuthContext();
  const [loading, setLoading] = useState(false);
  const { setrefetch, refetch } = usePostContext();
  const dispatch = useDispatch();

  async function getUser() {
    let a = await getUserDetails(data.user, getToken());
    setPostUserData(a.data.data);
    // console.log(data.likes,user)
    setIsliked(data.likes.some((e) => e == userId));
  }

  useEffect(() => {
    getUser();
  }, [data]);

  async function handleDelete() {
    try {
      setLoading(true);
      let a = await deletePost(data?._id, getToken());
      if (!a.data.success) {
        toast.error(a.data.message);
        return;
      }
      setrefetch((p) => !p);
      toast.success(a.data.message);
    } catch (e) {
      toast.error(e.message);
    } finally {
      setLoading(false);
    }
  }
  async function handleLike() {
    if (isLiked) {
      let a = await UnlikePost(data?._id, getToken());
      if (!a.data.success) {
        toast.error(a.data.message);
        return;
      }
      setIsliked(false);
      setrefetch((p) => !p);
    } else {
      let a = await likePost(data?._id, getToken());
      if (!a.data.success) {
        toast.error(a.data.message);
        return;
      }
      setIsliked(true);
      setrefetch((p) => !p);
    }
  }

  return (
    <div className="w-[30rem] mx-auto  border mt-5 border-purple-200 rounded-lg bg-gradient-to-br from-purple-100 to-purple-300 shadow-lg text-gray-800 font-sans">
      <div className="flex items-center p-4">
        <div className="w-8 h-8 rounded-full text-purple-700 bg-white flex items-center justify-center font-bold">
          {postUserData?.name.toUpperCase()[0]}
        </div>
        <span className="font-semibold ml-3">{postUserData?.name}</span>
        {postUserData?.name === user && (
          <>
            <FaTrashCan
              className="ml-auto cursor-pointer text-gray-800 hover:text-red-500"
              onClick={handleDelete}
            />
            <FaEdit
              className="ml-4 cursor-pointer text-gray-800 hover:text-sky-500"
              onClick={() =>
                window.location.pathname.includes("/post") &&
                (openModel(), dispatch(handleEditThunk(data?.image, data?.text,data?._id)))
              }
            />
          </>
        )}
        {loading && (
          <span className="w-4 h-4 border-2 ml-2  border-r-purple-400 rounded-full animate-spin  "></span>
        )}
      </div>
      <div className="w-full aspect-[4/2.5] bg-purple-200 my-2 p-4 rounded-lg overflow-hidden">
        <img
          src={data.image}
          alt="post"
          className="w-full h-full object-cover border-t border-b border-purple-300"
        />
      </div>
      <div className="flex items-center px-4 pt-2">
        <button
          className={`mr-4 text-2xl focus:outline-none ${
            isLiked ? "text-red-500" : "text-gray-800"
          }`}
          aria-label="Like"
          onClick={handleLike}
        >
          {isLiked ? <FaHeart /> : <FaRegHeart />}
        </button>
        <button
          className="text-2xl text-gray-800 focus:outline-none"
          aria-label="Comment"
        >
          <FaRegComment
            onClick={() => {
              ssetIsCommentsOpen(data?._id);
            }}
          />
        </button>
      </div>
      <div className="px-4 py-3">
        <div className="font-semibold mb-1">{data.likesCount} likes</div>
        <div>
          <span className="font-semibold">{postUserData?.name} </span>
          {data.text}
        </div>
      </div>
      {isCommentsOpen && (
        <CommentsModal
          postid={isCommentsOpen}
          setCommentsVisible={ssetIsCommentsOpen}
        />
      )}
    </div>
  );
};

export default PostCard;
