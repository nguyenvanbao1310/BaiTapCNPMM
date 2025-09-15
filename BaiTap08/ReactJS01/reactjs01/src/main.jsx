import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./styles/global.css";
import { AuthWrapper } from "./components/context/auth.context.jsx";

import Root from "./Root.jsx";
// import FavouriteProvider

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthWrapper>
      <Root />
    </AuthWrapper>
  </React.StrictMode>
);
