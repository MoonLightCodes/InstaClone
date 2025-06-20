import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import AuthContext from "./context/AuthContext.jsx";
import AllPostsContext from "./context/AllPostsContext.jsx";
import { ToastContainer } from "react-toastify";
import { Provider } from "react-redux";
import { store } from "./redux/postUploadStore.js";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ToastContainer />
    <BrowserRouter>
      <AuthContext>
        <AllPostsContext>
          <Provider store={store}>
            <App className="noScroll" />
          </Provider>
        </AllPostsContext>
      </AuthContext>
    </BrowserRouter>
  </StrictMode>
);
