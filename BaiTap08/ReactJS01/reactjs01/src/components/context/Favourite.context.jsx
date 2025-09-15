// src/context/FavouriteContext.jsx
import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const FavouriteContext = createContext();

export const FavouriteProvider = ({ userId, children }) => {
  const [favourites, setFavourites] = useState([]);

  // load favourites khi login (có userId)
  useEffect(() => {
    if (!userId) return;
    const fetchFavourites = async () => {
      try {
        const res = await axios.get(
          `http://localhost:8080/v1/api/favourites/${userId}`
        );
        console.log("Favourites loaded from DB:", res.data);
        setFavourites(res.data);
      } catch (err) {
        console.error("Lỗi load favourites:", err);
      }
    };
    fetchFavourites();
  }, [userId]);

  return (
    <FavouriteContext.Provider value={{ favourites, setFavourites }}>
      {children}
    </FavouriteContext.Provider>
  );
};

export const useFavourites = () => useContext(FavouriteContext);
