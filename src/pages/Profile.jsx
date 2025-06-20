import React, { useEffect, useMemo, useState } from "react";
import { useAuthContext } from "../context/AuthContext";
import { usePostContext } from "../context/AllPostsContext";
import { getUserDetails } from "../service/userServices";
import { getToken } from "../utils/getToken";
import { useNavigate } from "react-router-dom";
import LoadingElement from "../components/LoadingElement";

const Profile = () => {
  const { curUserInfo, user } = useAuthContext();
  const { data } = usePostContext();
  // const [othersProfiles, setOtherProfiles] = useState(new Set());
  const navigate = useNavigate();
  const profilesOThers = useMemo(() => {
    return [...new Set(data.map((e) => e.user))];
  }, [data]);
  useEffect(() => {
    window.screenTop = 0;
  }, []);
  const [sendingData, setSendingData] = useState([]);

  useEffect(() => {
    let isMounted = true;
    const fetchData = async () => {
      const promises = profilesOThers.map((userId) =>
        getUserDetails(userId, getToken())
      );
      const results = await Promise.all(promises);
      if (isMounted) setSendingData(results);
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
  return (
    <div className="max-w-4xl mx-auto p-4">
      <div className="flex items-center space-x-6">
        <img
          src="https://imgs.search.brave.com/cS-h-NqRdm6boRw8bddIQKM6xFFT2lW-Jm-OpHvUknY/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pbWcu/ZnJlZXBpay5jb20v/ZnJlZS12ZWN0b3Iv/dXNlci1jaXJjbGVz/LXNldF83ODM3MC00/NzA0LmpwZz9zZW10/PWFpc19pdGVtc19i/b29zdGVkJnc9NzQw"
          alt="Profile"
          className="w-32 h-32 rounded-full object-cover "
        />
        <div>
          <h1 className="text-2xl font-bold">{curUserInfo.user.name}</h1>
          <p className="text-gray-600">{curUserInfo.message}</p>
        </div>
      </div>
      {sendingData.length === 0 && (
        <div className="flex justify-center items-center">
          <LoadingElement />
        </div>
      )}
      <div className="mt-8 grid grid-cols-3 gap-4">
        {sendingData.map((e, index) => (
          <div
            key={index}
            className="aspect-square bg-gray-200 rounded-lg hover:scale-105 transition-all duration-300 hover:bg-gray-300"
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
              className="w-full h-full object-cover rounded-lg cursor-pointer mix-blend-multiply"
            />
            <p className="text-center m-1">{e?.data?.data?.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Profile;
