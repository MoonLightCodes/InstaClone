import React, { useState } from "react";
import { getToken } from "../utils/getToken";
import { Navigate } from "react-router-dom";
import NavBar from "../components/NavBar";
import { useAuthContext } from "../context/AuthContext";
import { FiMenu, FiX } from "react-icons/fi";

const ProtectedRoute = ({ children, isPublic = false }) => {
  const [isNavCollapsed, setIsNavCollapsed] = useState(false);
  let token = getToken();
  const { user } = useAuthContext();

  if (!token && !isPublic) {
    return <Navigate to="/login" replace />;
  }

  if (isPublic) {
    return children;
  }

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col">
      {/* Header */}
      <header className="bg-gradient-to-r from-purple-200 via-purple-300 to-purple-400 
                         flex items-center justify-between p-4 
                         fixed top-0 left-0 right-0 z-50 h-16">
        <button
          onClick={() => setIsNavCollapsed(!isNavCollapsed)}
          className="md:hidden text-purple-900 text-2xl"
        >
          {isNavCollapsed ? <FiX /> : <FiMenu />}
        </button>
        <div className="flex items-center gap-4">
          <div className="bg-gradient-to-tr from-purple-900 via-purple-500 to-purple-600 
                        text-transparent bg-clip-text animate-pulse font-bold">
            {`Hi ${user}`}
          </div>
        <span className="relative w-8 h-8 overflow-hidden text-2xl">
  <span className="absolute top-0 left-0 w-full h-full emoji-swap text-purple-900 flex flex-col items-center">
    <span>🎉</span>
    <span>❤️</span>
    <span>😂</span>
    <span>📸</span>
    <span>💬</span>
    <span>👍</span>
  </span>

  {/* CSS below */}
  <style>
    {`
      @keyframes emojiSwap {
        0%, 10% { transform: translateY(0%); }
        15%, 25% { transform: translateY(-100%); }
        30%, 40% { transform: translateY(-200%); }
        45%, 55% { transform: translateY(-300%); }
        60%, 70% { transform: translateY(-400%); }
        75%, 85% { transform: translateY(-500%); }
        90%, 100% { transform: translateY(0%); }
      }
      .emoji-swap {
        animation: emojiSwap 6s ease-in-out infinite;
      }
    `}
  </style>
</span>

        </div>
      </header>

      {/* Layout */}
      <div className="flex flex-1 pt-16">
        {/* Sidebar */}
        <div
          className={`fixed md:relative z-40 transition-transform duration-300 
                      ${isNavCollapsed ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
                      h-full`}
        >
          <div
            className="group w-16 md:w-64 md:hover:w-64 h-full bg-white shadow-lg 
                       overflow-hidden transition-all duration-300 ease-in-out"
          >
            <NavBar onItemClick={() => setIsNavCollapsed(false)} />
          </div>
        </div>

        {/* Main Content */}
        <main
          className={`flex-1 overflow-auto p-4 transition-all duration-300
                     ${isNavCollapsed ? 'ml-0' : 'md:ml-16 md:group-hover:ml-64'}
                     min-h-[calc(100vh-4rem)]`}
        >
          {children}
        </main>
      </div>
    </div>
  );
};

export default ProtectedRoute;
