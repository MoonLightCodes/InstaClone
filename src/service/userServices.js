import axios from "axios";
import { endPoints } from "./endPoints";
import { useAuthContext } from "../context/AuthContext";
// const {setCurUserInfo} = useAuthContext();

export  function getUserDetails(userId,token) {
  return axios.get(endPoints.GET_USER_INFO(userId), {
    headers: {
      Authorization: "Bearer " + token,
    },
  });
}
export const getCurrentUserInfo = ( token) => axios.get(endPoints.GET_LOGGED_IN_USER_INFO,{
    headers:{
        'Authorization': 'Bearer ' + token
    },
}).then((e)=>{
  console.log(e);
  
  return e;
});
