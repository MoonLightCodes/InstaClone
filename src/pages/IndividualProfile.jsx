import React, { useEffect } from "react";
import { data, useLocation, useParams } from "react-router-dom";
import NavBar from "../components/NavBar";
import { usePostContext } from "../context/AllPostsContext";
import PostCard from "../components/PostCard";
import profilePic from "../assets/profile.webp"

const IndividualProfile = () => {
  const { id } = useParams();
  const { state } = useLocation();
  const { data } = usePostContext();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  console.log("state", state, id, data);
  return (
    <div className="max-w-4xl mx-auto p-4 bg-gradient-to-br from-purple-100 via-purple-200 to-purple-300 min-h-screen">
      <div className="flex flex-col md:flex-row items-center space-x-6 bg-gradient-to-r from-purple-400 via-violet-500 to-purple-700 p-4 rounded-lg shadow-lg">
        <img
          src={profilePic}
          alt="Profile"
          className="w-32 h-32 rounded-full object-cover border-4 border-purple-600 shadow-xl"
        />
        <div>
          <h1 className="bg-gradient-to-r font-extrabold tracking-widest text-center text-3xl text-transparent bg-clip-text from-purple-200 via-violet-400 to-purple-900 drop-shadow-lg">
            {state.name}
          </h1>
        </div>
      </div>
      <div className="mt-8 grid grid-cols-1 gap-4">
        <h1 className="bg-gradient-to-r font-extrabold tracking-widest text-center text-3xl text-transparent bg-clip-text from-purple-400 via-violet-500 to-purple-800 drop-shadow-md">
          Posts
        </h1>
        <div className="grid gap-6">
          {data
            .filter((e) => e?.user === id)
            .map((e, i) => (
              <div key={i} className="rounded-lg bg-gradient-to-r from-purple-200 via-purple-100 to-purple-300 p-1 shadow-md">
                <PostCard data={e} />
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default IndividualProfile;
