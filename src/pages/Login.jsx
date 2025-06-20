import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useLogin } from "../service/userAuth";
import { toast } from "react-toastify";
import { useAuthContext } from "../context/AuthContext";
import { getCurrentUserInfo } from "../service/userServices";
import { getToken } from "../utils/getToken";

const Login = () => {
  const navigate = useNavigate();
  const { setUser,setCurUserInfo ,setUserId} = useAuthContext();
  const [formData, setFormData] = useState(() => ({
    email: "",
    password: "",
  }));
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    if (!formData.email || !formData.password) {
      setError("Please fill in all fields");
      setLoading(false);
      return;
    }
    const res = await useLogin(formData);
    console.log("res", res);
    setError(res.message);
    setLoading(false);
    if (!res.success) {
      toast.error(res.message);
      return;
    }
    toast.success(res.message);
    console.log("setuser ", res);
    setUser(res.user);
    let b = await getCurrentUserInfo(getToken());
    setUserId(b?.data?.data?.user?._id)
    setCurUserInfo(b?.data?.data);
    console.log("current user info",b?.data?.data)
    navigate("/home", { replace: true });
    setFormData({ email: "", password: "" });
    setError("");
  };
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((pr) => ({
      ...pr,
      [name]: value,
    }));
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-br from-purple-500 via-purple-600 to-purple-700">
      <h1 className="text-4xl font-extrabold text-white mb-6">Welcome Back!</h1>
      <form className="bg-white p-8 rounded-lg shadow-lg w-96">
        <div className="mb-6">
          <label
            className="block text-sm font-medium text-gray-700 mb-2"
            htmlFor="email"
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            value={formData.email}
            onChange={handleInputChange}
          />
        </div>
        <div className="mb-6">
          <label
            className="block text-sm font-medium text-gray-700 mb-2"
            htmlFor="password"
          >
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            value={formData.password}
            onChange={handleInputChange}
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-purple-600 text-white py-3 rounded-lg hover:bg-purple-700 transition duration-200 font-semibold"
          onClick={handleSubmit}
        >
          Login{" "}
          {loading && (
            <span className="ml-2 bg-transparent border-2 border-white border-l-transparent rounded-full w-4 h-4 inline-block animate-spin"></span>
          )}
        </button>
        {error && (
          <p className="text-red-500 text-sm mt-4 text-center">{error}</p>
        )}
      <div className=" mt-6">
        New user ! {" "}<Link to="/register" className="text-purple-500">Sign-up</Link>
      </div>
      </form>
    </div>
  );
};

export default Login;
