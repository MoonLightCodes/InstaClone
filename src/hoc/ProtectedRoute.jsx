import React from "react";
import { getToken } from "../utils/getToken";
import { Navigate } from "react-router-dom";
import NavBar from "../components/NavBar";
import { useAuthContext } from "../context/AuthContext";

const ProtectedRoute = ({ children, isPublic = false }) => {
  let token = getToken();
  const { user } = useAuthContext();
  if (!token && !isPublic) {
    return <Navigate to="/login" replace />;
  }

  if (isPublic) {
    return children;
  }

  if (token && !isPublic) {
    return (
      <div className="m-1 bg-slate-100">
        <NavBar className="peer" />
        <div className="flex flex-col items-center">
          <div className="text-2xl bg-gradient-to-r from-purple-200 via-purple-300 to-purple-400 flex items-center h-[10%] justify-end gap-4 text-center fixed top-0 z-[9] p-2 rounded-lg shadow-lg w-full font-bold">
            <div className="bg-gradient-to-tr from-purple-900 via-purple-500 to-purple-600 text-transparent bg-clip-text animate-pulse">
              {`Hi ${user}`}
            </div>
            <span className="animate-bounce text-purple-900 text-3xl">🎉</span>
          </div>
          <div className="mt-10 w-full ">
            {children}  
          </div>
        </div>
      </div>
    );
  }
};
export default ProtectedRoute;