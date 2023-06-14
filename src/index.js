import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";
import App from "./App.jsx";
import { PostsContextProvider } from "./context/PostContext.jsx";
import { AuthContextProvider } from "./context/AuthContext.jsx";
import "./styles/index.scss";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
  <AuthContextProvider>
    <PostsContextProvider>
    <Router>
        <App />
      </Router>
    </PostsContextProvider>
  </AuthContextProvider>  
    
  </React.StrictMode>
);
