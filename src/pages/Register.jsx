import React, { useState } from "react";
import { useRegister } from "../service/userAuth";
import { toast } from "react-toastify";
import { useAuthContext } from "../context/AuthContext";
import { setToken } from "../utils/setToken";
import { Link, useNavigate } from "react-router-dom";

const Register = () => {
  const { setUser } = useAuthContext();
  const navigate = useNavigate();
  const initForm = {
    name: "",
    email: "",
    password: "",
  };
  const [formData, setFormData] = useState(initForm);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    if (!formData.email || !formData.password || !formData.name) {
      setError("All fields are required");
      setLoading(false);
      return;
    }
    try {
      const res = await useRegister(formData);
      if (!res?.data?.success) {
        toast.error(res?.data?.message);
        setError(res?.data?.message);
        setLoading(false);
        return;
      }
      toast.success(res?.data?.message);
      setFormData(initForm);
      setError("");
      setLoading(false);
      setUser({
        email: res?.data?.data?.email,
        username: res?.data?.data?.username,
      });
      setToken(res?.data?.data?.token);
      navigate("/login")
    } catch (e) {
      console.log(e);
      setLoading(false);
      setError(e);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-3xl font-bold mb-6 text-center text-purple-700">
          Register
        </h1>
        <form>
          <div className="mb-4">
            <label htmlFor="name" className="block text-purple-700 mb-2">
              Username:
            </label>
            <input
              type="text"
              id="name"
              name="name"
              required
              value={formData.name}
              className="w-full px-3 py-2 border border-purple-300 rounded focus:outline-none focus:ring focus:border-purple-500"
              onChange={handleChange}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block text-purple-700 mb-2">
              Email:
            </label>
            <input
              type="email"
              id="email"
              name="email"
              required
              value={formData.email}
              className="w-full px-3 py-2 border border-purple-300 rounded focus:outline-none focus:ring focus:border-purple-500"
              onChange={handleChange}
            />
          </div>
          <div className="mb-6">
            <label htmlFor="password" className="block text-purple-700 mb-2">
              Password:
            </label>
            <input
              type="password"
              id="password"
              name="password"
              required
              value={formData.password}
              className="w-full px-3 py-2 border border-purple-300 rounded focus:outline-none focus:ring focus:border-purple-500"
              onChange={handleChange}
            />
          </div>
          <button
            type="submit"
            className="w-full flex items-center justify-center bg-purple-600 text-white py-2 rounded hover:bg-purple-700 transition-colors"
            onClick={handleSubmit}
          >
            Register{" "}
            {loading && (
              <span className="ml-2 bg-transparent border-2 border-white border-l-transparent rounded-full w-3 h-3 inline-block animate-spin"></span>
            )}
          </button>
          {error && (
            <p className="text-red-500 text-sm mt-2 text-center">{error}</p>
          )}
        </form>
      <div className="mt-6">Already a user ! {" "} <Link to="/login" className="text-purple-600">Login</Link></div>
      </div>
    </div>
  );
};

export default Register;
