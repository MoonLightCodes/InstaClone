const BASE_URL = "https://social-media-server-v1-awpt.onrender.com/api";

export const endPoints = {
  LOG_IN: BASE_URL + "/auth/login",
  SIGN_UP: BASE_URL + "/auth/signup",
  LOG_OUT: BASE_URL + "/auth/logout",
  GET_LOGGED_IN_USER_INFO: BASE_URL + "/auth/zuku",
  GET_POST: BASE_URL + "/post/all-posts",
  FILE_UPLOAD: BASE_URL + "/post/upload",
  CREATE_POST: BASE_URL + "/post/create",
  GET_USER_INFO: (userId) => BASE_URL + `/user/profile/${userId}`,
  UPDATE_POST: (postId) => BASE_URL + `/post/update/${postId}`,
  DELETE_POST: (postId) => BASE_URL + `/post/delete/${postId}`,
  GET_COMMENTS_BY_POSTID: (postId) => BASE_URL + `/comment/${postId}`,
  ADD_COMMENT: (postId) => BASE_URL + `/comment/create/${postId}`,
  DELTE_COMMENT: (commentId) => BASE_URL + `/comment/${commentId}`,
  LIKE_POST: (postId) => BASE_URL + `/post/like/${postId}`,
  UNLIKE_POST: (postId) => BASE_URL + `/post/unlike/${postId}`,
  // GET_MY_POSTS: BASE_URL + "/post/my-posts",
};
