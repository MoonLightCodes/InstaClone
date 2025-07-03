import React, { useEffect, useLayoutEffect } from "react";
import { useNavigate, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import ProtectedRoute from "./hoc/ProtectedRoute";
import Home from "./pages/Home";
import Register from "./pages/Register";
import { Bounce, ToastContainer } from "react-toastify";
import MagicMouse from "./components/MagicMouse";
import Post from "./pages/Post";
import Profile from "./pages/Profile";
import IndividualProfile from "./pages/IndividualProfile";

const App = () => {
  // Lazy load pages
  const Login = React.lazy(() => import("./pages/Login"));
  const Home = React.lazy(() => import("./pages/Home"));
  const Register = React.lazy(() => import("./pages/Register"));
  const Post = React.lazy(() => import("./pages/Post"));
  const Profile = React.lazy(() => import("./pages/Profile"));
  const IndividualProfile = React.lazy(() =>
    import("./pages/IndividualProfile")
  );

  return (
    <div className="noScroll">
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss={false}
        draggable={false}
        pauseOnHover={false}
        theme="light"
        transition={Bounce}
      />
      <MagicMouse />
      <React.Suspense
        fallback={
          <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-br from-purple-400 via-purple-300 to-pink-200">
            <div className="w-16 h-16 border-4 border-purple-500 border-t-white rounded-full animate-spin mb-5" />
            <span className="text-purple-800 text-xl font-semibold">
              Loading...
            </span>
          </div>
        }
      >
        <Routes>
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />
          <Route
            path="/home"
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />
          <Route
            path="/post"
            element={
              <ProtectedRoute>
                <Post />
              </ProtectedRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <Profile />
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
              <ProtectedRoute>
                <IndividualProfile />
              </ProtectedRoute>
            }
          />
        </Routes>
      </React.Suspense>
      <ToastContainer />
    </div>
  );
};

export default App;
