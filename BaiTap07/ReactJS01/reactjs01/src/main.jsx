import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./styles/global.css";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import RegisterPage from "./pages/register.jsx";
import UserPage from "./pages/user.jsx";
import HomePage from "./pages/home.jsx";
import LoginPage from "./pages/login.jsx";
import ProductList from "./pages/productList.jsx";
import { AuthWrapper } from "./components/context/auth.context.jsx";
import { CartProvider } from "@bibihero13/my-cart-lib";
import { CartTable } from "@bibihero13/my-cart-lib";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: "user",
        element: <UserPage />,
      },
      {
        path: "register",
        element: <RegisterPage />,
      },
      {
        path: "login",
        element: <LoginPage />,
      },
      { path: "products", element: <ProductList /> },
      { path: "cart", element: <CartTable /> },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthWrapper>
      <CartProvider>
        <RouterProvider router={router} />
      </CartProvider>
    </AuthWrapper>
  </React.StrictMode>
);
