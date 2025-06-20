import axios from "axios";
import { endPoints } from "./endPoints";

export function getComments(postId, token) {
  return axios.get(endPoints.GET_COMMENTS_BY_POSTID(postId), {
    headers: {
      Authorization: "Bearer " + token,
    },
  });
}
export function addCommentService(postId, token, payload) {
  return axios.post(endPoints.ADD_COMMENT(postId), payload, {
    headers: {
      Authorization: "Bearer " + token,
    },
  });
}
export function deleteComment(commentId, token) {
  return axios.delete(endPoints.DELTE_COMMENT(commentId), {
    headers: {
      Authorization: "Bearer " + token,
    },
    withCredentials: true,
  });
}
