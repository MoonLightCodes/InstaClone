import React, { createContext, useContext, useState } from 'react'

const AuthContextProvider = createContext(null);
export const useAuthContext = ()=>useContext(AuthContextProvider);
const AuthContext = ({children}) => {
    const [user,setUser] = useState(null);
    const[userId,setUserId] = useState(null);
    const [curUserInfo,setCurUserInfo] = useState(null);
  return (
    <AuthContextProvider.Provider value={{user,setUser,userId,setUserId,curUserInfo,setCurUserInfo}}>
        {children}
    </AuthContextProvider.Provider>
  )
}
  
export default AuthContext