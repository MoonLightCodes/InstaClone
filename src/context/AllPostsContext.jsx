import React, { createContext, useContext, useEffect, useState } from "react";
import { getToken } from "../utils/getToken";
import { getAllPOsts } from "../service/Posts";
import { toast } from "react-toastify";
const PostContext = createContext();
export const usePostContext = () => useContext(PostContext);

const AllPostsContext = ({ children }) => {
  const [data, setData] = useState();
  const [refetch, setrefetch] = useState(true);
  const [fetchFailed, setfetchFailed] = useState(null);
  const [loading, setLoading] = useState(true);
  async function handleFetch() {
    try {
      let token = getToken();
      const a = await getAllPOsts(token);
      console.log("enter ", a);
      if (!a.data.success) {
        setData(null);
        toast.error("sorry failed to fetch 😥😖");
        return (
          <p className="text-red-600 text-8xl animate-pulse ">
            😭😡😟error fetching data
          </p>
        );
      }
      setData(a.data.data);
      // toast.success(a.data.message);
    } catch (e) {
      toast.error(e.message);
      setfetchFailed(e.message);
      console.log(e);
      setData(null);
    } finally {
      setLoading(false);

      // console.log(data)
    }
  }
  useEffect(() => {
    handleFetch();
    let a = setInterval(handleFetch(), 10000);
    // console.log("data",data)
    return () => {
      clearInterval(a);
    };
  }, [refetch]);
  return (
    <PostContext.Provider
      value={{
        data,
        setData,
        setrefetch,
        refetch,
        loading,
        setLoading,
        fetchFailed,
        setfetchFailed,
        handleFetch,
      }}
    >
      {children}
    </PostContext.Provider>
  );
};

export default AllPostsContext;
