import React, { createContext, useContext, useEffect, useState } from "react";
import { getToken } from "../utils/getToken";
import { getAllPOsts } from "../service/Posts";
import { toast } from "react-toastify";
import { getUserDetails } from "../service/userServices";
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
      
      setData(null);
    } finally {
      setLoading(false);

      
    }
  }
  useEffect(() => {
    handleFetch();
    let a = setInterval(handleFetch, 10000);
    

    return () => {
      clearInterval(a);
    };
  }, [refetch]);
  // useEffect(() => {
    
  //   Promise.all(data?.map((e) => getUserDetails(e.user, getToken())))
  //     .then((res) => {
  //       // console.log(res,"post context userder details ")
  //       const rt = res.reduce(
  //         (acc, curr) => ({
  //           ...acc,
  //           [curr.data.data._id]: curr.data.data,
  //         }),
  //         {}
  //       );
        
  //       localStorage.setItem("postFormatData", JSON.stringify(rt));
  //     })
  //     .catch((e) => {
  //       toast.error("Failed to fetch user details for posts");
  //     });
  // }, [data]);

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
