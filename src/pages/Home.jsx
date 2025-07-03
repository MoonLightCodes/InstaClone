import React, { useEffect, useRef, useState } from "react";
import PostCard from "../components/PostCard";
import { useAuthContext } from "../context/AuthContext";
import { getAllPOsts } from "../service/Posts";
import { toast } from "react-toastify";
import { getToken } from "../utils/getToken";
import LoadingElement from "../components/LoadingElement";
import { usePostContext } from "../context/AllPostsContext";
import NetworkError from "../components/NetworkError";

const Home = () => {
  const { user } = useAuthContext();
  const { data, refetch, loading, fetchFailed, handleFetch } = usePostContext();
 useEffect(() => {
    window.screenTop = 0;
  }, []);
  return (
    <div className="bg-gradient-to-br from-purple-200 via-purple-300 to-purple-500 min-h-screen backdrop-blur-3xl py-8">
      <h1 className="bg-gradient-to-r font-extrabold tracking-widest text-center text-4xl text-transparent bg-clip-text from-purple-500 via-violet-600 to-purple-900 drop-shadow-lg mb-8">
        News Feed
      </h1>

      <div className="grid grid-cols-1 gap-8 justify-items-center">
        {loading ? (
          <LoadingElement className="text-purple-700" />
        ) : fetchFailed ? (
          <NetworkError />
        ) : (
          data
            ?.sort((b, a) => new Date(a.createdAt) - new Date(b.createdAt))
            .map((e, i) => (
              <div
                key={i}
                className="w-full max-w-xl rounded-xl shadow-lg bg-gradient-to-r from-purple-100 via-purple-200 to-purple-300 p-1"
              >
                <PostCard data={e} />
              </div>
            ))
        )}
      </div>
    </div>
  );
};

export default Home;
