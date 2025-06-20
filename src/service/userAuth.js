import axios from "axios";
import { endPoints } from "./endPoints";
import { setToken } from "../utils/setToken";
import { toast } from "react-toastify";
export const useLogin = async (data) => {
  console.log(data);
  return axios
    .post(endPoints.LOG_IN, data)
    .then((response) => {
      if (response.data.success) {
        setToken(response.data.data.token);
        return {
          success: true,
          message: "Login successful",
          user: response.data.data.name,
        };
      } else {
        toast.error(response.data.message);
        return { success: false, message: response.data.message };
      }
    })
    .catch((error) => {
      console.error("Login error:", error);
      toast.error(error);
      return { success: false, message: error?.message };
    });
};
export const useRegister = (data) => {
  return axios.post(endPoints.SIGN_UP, data);
};
export const userLogOut = (token) => {
  return axios.delete(endPoints.LOG_OUT, {
    headers: {
      Authorization: "Bearer " + token,
    },
  });
};
