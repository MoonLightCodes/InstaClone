import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { userLogOut } from "../service/userAuth";
import { getToken } from "../utils/getToken";

const NavBar = () => {
  const opts = ["Home", "Post", "Profile"];
  const logs = ["🏠", "📭", "👽"];
  const [hover, setHover] = useState(false);
  const navigate = useNavigate();
  const location = useLocation(); // Get the current location
  const [loading, setLoading] = useState(false);

  return (
    <div
      onMouseOver={() => setHover(true)}
      onMouseOut={() => setHover(false)}
      className="fixed top-0 my-1 z-100 rounded h-full w-[80px] peer overflow-hidden hover:w-[30vh] transition-all duration-300 bg-gradient-to-b from-blue-300 via-purple-300 to-purple-500 flex flex-col justify-between shadow-2xl backdrop-blur-[10px]"
    >
      <div className="flex flex-col gap-3 p-1">
        <span className="block font-bold text-white text-2xl bg-purple-800 shadow-lg rounded-2xl text-center py-2">
          LOGO
        </span>
        {opts.map((e, i) => (
          <Link
            key={i}
            to={`/${e.toLowerCase()}`}
            className={`rounded shadow-lg truncate p-3 ${
              location.pathname === `/${e.toLowerCase()}`
                ? "bg-gradient-to-r from-purple-500 via-pink-500 to-red-500  outline-2 outline-purple-300"
                : "bg-gradient-to-r from-green-300 via-teal-300 to-blue-400"
            } px-2 text-center text-white backdrop-blur-[100px] bg-opacity-90 hover:scale-105 transition-transform duration-200`}
          >
            {hover ? logs[i] + "  " + e : logs[i]}
          </Link>
        ))}
      </div>
      <div
        className={`mb-2 cursor-pointer ml-auto bg-gradient-to-r from-yellow-300 via-orange-300 to-red-400 text-white rounded mr-1 px-2 py-1 shadow-md backdrop-blur-[10px] bg-opacity-90 ${
          loading ? "opacity-50 cursor-not-allowed" : "hover:scale-105 transition-transform duration-200"
        }`}
        onClick={() => {
          if (!loading) {
            setLoading(true);
            userLogOut(getToken()).finally(() => {
              setLoading(false);
              navigate("/login");
            });
          }
        }}
      >
        {loading ? "Loading..." : hover ? "📤 Logout" : "📤"}
      </div>
    </div>
  );
};

export default NavBar;
