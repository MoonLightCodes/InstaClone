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
  useEffect(()=>{},[data])

  return (
    <div className=" bg-transparent backdrop-blur-3xl ">
      <h1 className="bg-gradient-to-r font-extrabold tracking-widest text-center text-3xl text-transparent bg-clip-text from-purple-300 via-violet-400 to-purple-800">
        News Feed
      </h1>

      <div className="grid grid-cols-1 bg-transparent justify-items-center">
        {loading ? (
          <LoadingElement className="" />
        ) : fetchFailed ? (
          <NetworkError />
        ) : (
          data
            ?.sort((b, a) => new Date(a.createdAt) - new Date(b.createdAt))
            .map((e, i) => <PostCard key={i} data={e} />)
        )}
      </div>
    </div>
  );
};

export default Home;
