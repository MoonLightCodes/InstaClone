import React, { useEffect, useMemo, useState } from "react";
import { useAuthContext } from "../context/AuthContext";
import { usePostContext } from "../context/AllPostsContext";
import { getUserDetails } from "../service/userServices";
import { getToken } from "../utils/getToken";
import { useNavigate } from "react-router-dom";
import LoadingElement from "../components/LoadingElement";
import { useDispatch, useSelector } from "react-redux";
import { setSendingDataRedux } from "../redux/otherUsersSlice";
import profilePic from "../assets/profile.webp"

const Profile = () => {
  const { curUserInfo, user } = useAuthContext();
  const { data } = usePostContext();
  const dispatch = useDispatch();
  const [othersProfiles, setOtherProfiles] = useState(new Set());
  const navigate = useNavigate();
  const sendingDataRedux = useSelector((state) => state.getOtherUsers);
  console.log("redux", sendingDataRedux);
  const profilesOThers = useMemo(() => {
    return [...new Set(data?.map((e) => e.user))];
  }, [data]);
  useEffect(() => {
    window.screenTop = 0;
  }, []);

  useEffect(() => {
    let isMounted = true;
    const fetchData = async () => {
      if (sendingDataRedux.length === 0) {
        const promises = profilesOThers.map((userId) =>
          getUserDetails(userId, getToken())
        );
        const results = await Promise.all(promises);
        if (isMounted) dispatch(setSendingDataRedux(results));
      }
    };

    fetchData();
    return () => {
      isMounted = false;
    };
  }, [profilesOThers]);
  console.log(data, " data");

  // useEffect(() => {
  //   console.log("profile user", profilesOThers);

  //   profilesOThers = [...profilesOThers];
  //   profilesOThers.forEach((e, i) => {
  //     // i < 10 &&
  //     getUserDetails(e, getToken()).then((res) => {
  //       console.log(res);
  //       const name = res?.data?.data?.name;
  //       if (name && !othersProfiles.has(name)) {
  //         sendingData.push(res);
  //         setOtherProfiles((p) => {
  //           const updated = new Set(p);
  //           updated.add(name);
  //           return updated;
  //         });
  //       }
  //     });
  //   });
  // }, []);
  // Search state and debounce
  const [searchTerm, setSearchTerm] = useState("");
  const [displayedProfiles, setDisplayedProfiles] = useState([]);

  useEffect(() => {
    setDisplayedProfiles(sendingDataRedux);
  }, [sendingDataRedux]);

  useEffect(() => {
    const handler = setTimeout(() => {
      if (searchTerm.trim() === "") {
        setDisplayedProfiles(sendingDataRedux);
      } else {
        setDisplayedProfiles(
          sendingDataRedux.filter((e) =>
            e?.data?.data?.name
              ?.toLowerCase()
              .includes(searchTerm.toLowerCase())
          )
        );
      }
    }, 300); // 300ms debounce

    return () => clearTimeout(handler);
  }, [searchTerm, sendingDataRedux]);

  return (
    <div className="max-w-4xl mx-auto p-4 bg-gradient-to-br from-purple-100 via-purple-50 to-white min-h-screen rounded-2xl shadow-xl">
      <div className="flex md:flex-row md:text-2xl flex-col text-md items-center space-x-6 bg-purple-50 rounded-xl p-6 shadow-md mb-6 border-2 border-purple-200">
        <img
          src={profilePic}
          alt="Profile"
          className="w-32 h-32 rounded-full object-cover border-4 border-purple-400 shadow-lg"
        />
        <div>
          <h1 className="text-3xl text-center font-extrabold text-purple-700">{curUserInfo.user.name}</h1>
          <p className="text-purple-500">{curUserInfo.message}</p>
        </div>
      </div>
      <div className="my-4">
        <input
          type="text"
          placeholder="Search profiles..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border-2 border-purple-400 focus:border-purple-600 focus:ring-2 focus:ring-purple-300 rounded-full px-5 py-3 w-full text-purple-700 placeholder-purple-400 bg-purple-50 transition-all duration-200 shadow-md outline-none"
        />
      </div>
      {sendingDataRedux.length === 0 && (
        <div className="flex justify-center items-center">
          <LoadingElement />
        </div>
      )}
      <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {displayedProfiles.map((e, index) => (
          <div
            key={index}
            className="aspect-square bg-gradient-to-br from-purple-200 via-purple-100 to-white rounded-2xl shadow-lg hover:scale-105 transition-all duration-300 hover:bg-purple-200 border-2 border-purple-300 flex flex-col items-center justify-center cursor-pointer group"
            onClick={() => {
              navigate(`/indi-profile/${e?.data?.data?._id}`, {
                state: {
                  name: e?.data?.data?.name,
                  id: e?.data?.data?._id,
                },
              });
            }}
          >
            <img
              src={`https://imgs.search.brave.com/cS-h-NqRdm6boRw8bddIQKM6xFFT2lW-Jm-OpHvUknY/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pbWcu/ZnJlZXBpay5jb20v/ZnJlZS12ZWN0b3Iv/dXNlci1jaXJjbGVz/LXNldF83ODM3MC00/NzA0LmpwZz9zZW10/PWFpc19pdGVtc19i/b29zdGVkJnc9NzQw`}
              alt={`Post `}
              className="w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 object-cover rounded-full border-4 border-purple-300 shadow-md group-hover:border-purple-500 transition-all duration-300"
            />
            <p className="text-center mt-4 text-lg font-semibold text-purple-700 group-hover:text-purple-900 transition-all duration-300">{e?.data?.data?.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Profile;
