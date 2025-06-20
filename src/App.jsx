import React, { useEffect, useLayoutEffect } from "react";
import { useNavigate, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import ProtectedRoute from "./hoc/ProtectedRoute";
import Home from "./pages/Home";
import Register from "./pages/Register";
import { ToastContainer } from "react-toastify";
import MagicMouse from "./components/MagicMouse";
import Post from "./pages/Post";
import Profile from "./pages/Profile";
import IndividualProfile from "./pages/IndividualProfile";

const App = () => {
 
  return (
    <div className="noScroll">
      <ToastContainer/>
      <MagicMouse/>
      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Home className="" />
            </ProtectedRoute>
          }
        />
        <Route
          path="/home"
          element={
            <ProtectedRoute>
              <Home className="" />
            </ProtectedRoute>
          }
        />
         <Route
          path="/post"
          element={
            <ProtectedRoute>
              <Post className="" />
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile className="" />
            </ProtectedRoute>
          }
        />
        <Route
          path="/login"
          element={
            <ProtectedRoute isPublic>
              <Login />
            </ProtectedRoute>
          }
        />
        <Route
          path="/register"
          element={
            <ProtectedRoute isPublic>
              <Register />
            </ProtectedRoute>
          }
        />
        <Route
          path="/indi-profile/:id"
          element={
            <ProtectedRoute >
              <IndividualProfile />
            </ProtectedRoute>
          }
        />
      </Routes>
      <ToastContainer />
    </div>
  );
};

export default App;
