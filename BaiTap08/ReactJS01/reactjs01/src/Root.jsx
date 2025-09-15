import { RouterProvider } from "react-router-dom";
import { useAuth } from "./components/context/auth.context.jsx";
import { FavouriteProvider } from "../src/components/context/Favourite.context.jsx";
import { CartProvider } from "@bibihero13/my-cart-lib";
import { router } from "./router"; // nếu bạn tách router ra riêng, hoặc import trực tiếp

const Root = () => {
  const { auth } = useAuth();
  console.log("UserId in Root:", auth.user?._id);

  return (
    <FavouriteProvider userId={auth.user?._id}>
      <CartProvider>
        <RouterProvider router={router} />
      </CartProvider>
    </FavouriteProvider>
  );
};
export default Root;
