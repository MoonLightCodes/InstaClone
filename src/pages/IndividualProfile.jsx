import React, { useEffect } from "react";
import { data, useLocation, useParams } from "react-router-dom";
import NavBar from "../components/NavBar";
import { usePostContext } from "../context/AllPostsContext";
import PostCard from "../components/PostCard";

const IndividualProfile = () => {
  const { id } = useParams();
  const { state } = useLocation();
  const { data } = usePostContext();
  useEffect(() => {
    window.screenTop = 0;
  }, []);
  console.log("state", state, id, data);
  return (
    <div className="max-w-4xl mx-auto p-4">
      <div className="flex items-center space-x-6 bg-purple-300 p-2 rounded">
        <img
          src="https://imgs.search.brave.com/cS-h-NqRdm6boRw8bddIQKM6xFFT2lW-Jm-OpHvUknY/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pbWcu/ZnJlZXBpay5jb20v/ZnJlZS12ZWN0b3Iv/dXNlci1jaXJjbGVz/LXNldF83ODM3MC00/NzA0LmpwZz9zZW10/PWFpc19pdGVtc19i/b29zdGVkJnc9NzQw"
          alt="Profile"
          className="w-32 h-32 rounded-full object-cover "
        />
        <div>
          <h1 className="bg-gradient-to-r font-extrabold tracking-widest text-center text-3xl text-transparent bg-clip-text from-purple-600 via-violet-700 to-purple-800">
            {state.name}
          </h1>
        </div>
      </div>
      <div className="mt-8 grid grid-cols-1 gap-4">
        <h1 className="bg-gradient-to-r font-extrabold tracking-widest text-center text-3xl text-transparent bg-clip-text from-purple-300 via-violet-400 to-purple-800">
          Posts
        </h1>
        {data
          .filter((e) => e?.user === id)
          .map((e, i) => (
            <PostCard key={i} data={e} />
          ))}
      </div>
    </div>
  );
};

export default IndividualProfile;
