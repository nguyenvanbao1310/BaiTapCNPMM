// controllers/favourite.controller.js
const favouriteService = require("../services/favouriteService");

async function addFavourite(req, res) {
  try {
    const fav = await favouriteService.addFavourite(req.body);
    res.status(201).json(fav);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
}

async function getFavourites(req, res) {
  try {
    const favs = await favouriteService.getAllFavourites();
    res.json(favs);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

async function removeFavourite(req, res) {
  try {
    await favouriteService.removeFavourite(req.params.id);
    res.json({ message: "Favourite removed" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

module.exports = { addFavourite, getFavourites, removeFavourite };
