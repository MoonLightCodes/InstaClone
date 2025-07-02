import React, { createContext, useContext, useState } from "react";

const AuthContextProvider = createContext(null);
export const useAuthContext = () => useContext(AuthContextProvider);
const AuthContext = ({ children }) => {
  const [userId, setUserId] = useState(
    () => localStorage.getItem("userId") || null
  );
  const [curUserInfo, setCurUserInfo] = useState(
    () => JSON.parse(localStorage.getItem("userInfo")) || null
  );
  const [user, setUser] = useState(curUserInfo?.user?.name||null);
  return (
    <AuthContextProvider.Provider
      value={{ user, setUser, userId, setUserId, curUserInfo, setCurUserInfo }}
    >
      {children}
    </AuthContextProvider.Provider>
  );
};

export default AuthContext;
