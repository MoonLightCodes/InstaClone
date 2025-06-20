import { endPoints } from "./endPoints";
import axios from "axios";

export function getAllPOsts(token) {
  return axios.get(endPoints.GET_POST, {
    headers: {
      Authorization: "Bearer " + token,
    },
  });
}
export const updatePost = (payload, token, postId) =>
  axios.put(endPoints.UPDATE_POST(postId), payload, {
    headers: {
      Authorization: "Bearer " + token,
    },
    withCredentials: true,
  });
export function deletePost(postId, token) {
  return axios.delete(endPoints.DELETE_POST(postId), {
    headers: {
      Authorization: "Bearer " + token,
    },
  });
}
export const fileUpload = (data) =>
  axios.post(endPoints.FILE_UPLOAD, data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
    withCredentials: true,
  });

export const createPost = (data, token) =>
  axios.post(endPoints.CREATE_POST, data, {
    headers: {
      Authorization: "Bearer " + token,
    },
    withCredentials: true,
  });
export const likePost = (postId, token) =>
  axios.post(endPoints.LIKE_POST(postId), null, {
    headers: {
      Authorization: "Bearer " + token,
    },
    withCredentials: true,
  });

export const UnlikePost = (postId, token) =>
  axios.post(endPoints.UNLIKE_POST(postId), null, {
    headers: {
      Authorization: "Bearer " + token,
    },
    withCredentials: true,
  });
export const getMyPosts = (token) =>
  axios.get(API_ENDPOINTS.GET_MY_POSTS, {
    headers: {
      Authorization: "Bearer " + token,
    },
  });
