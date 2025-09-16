import { createBrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import RegisterPage from "./pages/register.jsx";
import UserPage from "./pages/user.jsx";
import HomePage from "./pages/home.jsx";
import LoginPage from "./pages/login.jsx";
import ProductList from "./pages/productList.jsx";
import ViewedProducts from "./pages/ViewedProduct.jsx";
import { CartTable } from "@bibihero13/my-cart-lib";
import ProductDetail from "./pages/ProductDetail.jsx";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "user", element: <UserPage /> },
      { path: "register", element: <RegisterPage /> },
      { path: "login", element: <LoginPage /> },
      { path: "products", element: <ProductList /> },
      { path: "cart", element: <CartTable /> },
      { path: "/viewed", element: <ViewedProducts /> },
      { path: "/products/:id", element: <ProductDetail /> },
    ],
  },
]);
