import React, { useEffect, useState } from "react";
import {
  FaHeart,
  FaRegHeart,
  FaRegComment,
  FaEdit,
} from "react-icons/fa";
import { FaTrashCan } from "react-icons/fa6";
import { getToken } from "../utils/getToken";
import { getUserDetails } from "../service/userServices";
import { useAuthContext } from "../context/AuthContext";
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
  const [showDropdown, setShowDropdown] = useState(false);
  const { userId, user } = useAuthContext();
  const [loading, setLoading] = useState(false);
  const { setrefetch } = usePostContext();
  const dispatch = useDispatch();

  async function getUser() {
    let a = await getUserDetails(data.user, getToken());
    setPostUserData(a.data.data);
    setIsliked(data.likes.some((e) => e === userId));
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

  function formatTimeAgo(dateString) {
    const now = new Date();
    const postDate = new Date(dateString);
    const diff = Math.floor((now - postDate) / 1000); // in seconds

    if (diff < 60) return "Just now";
    if (diff < 3600) return `${Math.floor(diff / 60)}m`;
    if (diff < 86400) return `${Math.floor(diff / 3600)}h`;
    if (diff < 604800) return `${Math.floor(diff / 86400)}d`;
    return postDate.toLocaleDateString();
  }

  return (
    <div className="max-w-full sm:max-w-lg mx-auto border mt-5 border-purple-200 rounded-lg bg-gradient-to-br from-purple-100 to-purple-300 shadow-lg text-gray-800 font-sans">
      <div className="flex items-center p-4 relative">
        <div className="w-8 h-8 rounded-full text-purple-700 bg-white flex items-center justify-center font-bold">
          {postUserData?.name?.toUpperCase()[0]}
        </div>
        <span className="font-semibold ml-3">{postUserData?.name}</span>

        {postUserData?.name === user && (
          <div
            className="ml-auto relative"
            onMouseEnter={() => setShowDropdown(true)}
            onMouseLeave={() => setShowDropdown(false)}
          >
            <button className="text-gray-800 text-xl hover:text-purple-700">
              ⋮
            </button>

            {showDropdown && (
              <div className="absolute right-0 -top-1 w-28 bg-white rounded-lg shadow-md z-50 transition-all duration-300">
                <button
                  onClick={handleDelete}
                  className="flex items-center w-full px-3 py-2 text-sm text-red-500 hover:bg-red-50"
                >
                  <FaTrashCan className="mr-2" /> Delete
                </button>
                <button
                  onClick={() =>
                    window.location.pathname.includes("/post") &&
                    (openModel(), dispatch(handleEditThunk(data?.image, data?.text, data?._id)))
                  }
                  className="flex items-center w-full px-3 py-2 text-sm text-blue-500 hover:bg-blue-50"
                >
                  <FaEdit className="mr-2" /> Edit
                </button>
              </div>
            )}
          </div>
        )}

        {loading && (
          <span className="w-4 h-4 border-2 ml-2 border-r-purple-400 rounded-full animate-spin"></span>
        )}
      </div>

      <div className="w-full aspect-[4/2.5] bg-purple-200 my-2 p-2 sm:p-4 rounded-lg overflow-hidden">
        <img
          src={data.image}
          alt="post"
          className="w-full h-full object-contain border-t border-b border-purple-300"
        />
      </div>

      <div className="flex items-center px-2 sm:px-4 pt-2">
        <button
          className={`mr-4 text-xl sm:text-2xl focus:outline-none ${
            isLiked ? "text-red-500" : "text-gray-800"
          }`}
          aria-label="Like"
          onClick={handleLike}
        >
          {isLiked ? <FaHeart /> : <FaRegHeart />}
        </button>
        <button
          className="text-xl sm:text-2xl text-gray-800 focus:outline-none"
          aria-label="Comment"
        >
          <FaRegComment
            onClick={() => {
              ssetIsCommentsOpen(data?._id);
            }}
          />
        </button>
      </div>

      <div className="px-2 sm:px-4 py-2 sm:py-3">
        <div className="font-semibold mb-1">{data.likesCount} likes</div>
        <div>
          <span className="font-semibold">{postUserData?.name} </span>
          {data.text}
        </div>
        <div className="text-sm sm:text-md text-gray-500 uppercase tracking-wide mt-1">
          {formatTimeAgo(data.createdAt)}
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
