import React, { useEffect, useRef, useState } from "react";
import LoadingElement from "./LoadingElement";
import { addCommentService, getComments } from "../service/comments";
import { getToken } from "../utils/getToken";
import { FcUndo } from "react-icons/fc";
import NetworkError from "./NetworkError";
import CommentCard from "./CommentCard";
import { toast } from "react-toastify";

const CommentsModal = ({ postid, setCommentsVisible }) => {
  const [loading, setLoading] = useState(true);
  const [allComments, setAllComments] = useState(null);
  const [fetchFailed, setFetchFailed] = useState(null);
  const addCommentSection = useRef(null);
  const [addComment, setAddComment] = useState("");
  const [rerender, setRerender] = useState(false);
  const [loadingPost,setLoadingPost] = useState(false);

  async function fetchComments() {
    try {
      let a = await getComments(postid, getToken());
      if (!a.data.success) {
        setFetchFailed(true);
        return;
      }
      setAllComments(a.data.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    addCommentSection.current.focus();
    fetchComments();
  }, [rerender]);

  async function handleAddComment(e) {
    e.preventDefault();
    try{
      setLoadingPost(true);
    if (!addComment?.trim()) {
      toast.error("Cannot add a blank comment");
      return;
    }
    let a = await addCommentService(postid, getToken(), { text: addComment?.trim() });
    if (!a.data.success) {
      toast.error(a.data.message);
      return;
    }
    toast.success(a.data.message);
    setAddComment("");
    setRerender((p) => !p);
    }catch(e){
      toast.error(e.message);
    }finally{
      setLoadingPost(false);
    }
  }

  return (
    <div className="max-h-[70vh] overflow-y-auto noScroll m-2 md:ml-11 sm:m-4 border p-2 sm:p-4 rounded-2xl w-full max-w-lg bg-white mx-auto sm:-translate-x-1/12 shadow-lg">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-xl sm:text-2xl font-semibold text-purple-800">Comments</h1>
        <FcUndo
          className="cursor-pointer text-2xl sm:text-3xl hover:bg-purple-100 rounded-full transition-all duration-200"
          onClick={() => setCommentsVisible(null)}
        />
      </div>
      {loading ? (
        <div className="flex justify-center items-center">
          <div className="w-8 h-8 border-4 border-purple-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
      ) : (
        <div className="space-y-4">
          {fetchFailed ? (
            <NetworkError />
          ) : allComments?.length !== 0 ? (
            allComments?.map((e, index) => (
              <CommentCard key={index} data={e} setRerender={setRerender} />
            ))
          ) : (
            <h1 className="text-center text-purple-400">No Comments Yet</h1>
          )}
        </div>
      )}
      <form
        className="flex items-center mt-4 border rounded-lg shadow-sm bg-purple-50"
        onSubmit={handleAddComment}
      >
        <input
          type="text"
          className="flex-1 px-3 sm:px-4 py-2 focus:outline-none rounded-l-lg bg-white text-purple-900 placeholder-purple-300"
          placeholder="Enter a comment..."
          ref={addCommentSection}
          onChange={(e) => setAddComment(e.target.value)}
          value={addComment}
        />
        <button
          type="submit"
          className="px-3 sm:px-4 flex justify-center items-center gap-2 py-2 bg-purple-600 text-white rounded-r-lg hover:bg-purple-700 transition-colors"
        >
          Post {loadingPost && <span className="w-4 h-4 border-2 ml-2 border-purple-200 border-r-transparent rounded-full animate-spin"></span>}
        </button>
      </form>
    </div>
  );
};

export default CommentsModal;
