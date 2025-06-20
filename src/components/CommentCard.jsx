import React, { useState } from "react";
import { FaTrashAlt } from "react-icons/fa";
import { useAuthContext } from "../context/AuthContext";
import { deleteComment } from "../service/comments";
import { getToken } from "../utils/getToken";
import { toast } from "react-toastify";

const CommentCard = ({ data, setRerender }) => {
  const { user } = useAuthContext();
  const [loading, setLoading] = useState(false);

  async function handleDelete() {
    setLoading(true);
    try {
      let response = await deleteComment(data._id, getToken());
      if (!response.data.success) {
        toast.error(response.data.message);
        return;
      }
      setRerender((prev) => !prev);
      toast.success(response.data.message);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="m-4 p-4 bg-purple-100 border border-purple-300 rounded-lg shadow-lg">
      <div className="flex items-center justify-between">
        <div>
          <h4 className="text-purple-800 font-bold">{data.user.name}</h4>
          <p className="text-purple-700">{data.text}</p>
        </div>
        <div className="flex items-center space-x-2">
          {loading && (
            <div className="w-5 h-5 border-2 border-purple-500 border-t-transparent rounded-full animate-spin"></div>
          )}
          {data.user.name === user && (
            <FaTrashAlt
              onClick={handleDelete}
              className="text-purple-600 hover:text-purple-800 cursor-pointer transition duration-200"
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default CommentCard;
