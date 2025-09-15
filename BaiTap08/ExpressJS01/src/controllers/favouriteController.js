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

async function getFavouritesByUser(req, res) {
  try {
    const userId = req.params.userId;

    console.log("UserId từ params:", `"${userId}"`, userId.length);

    // Kiểm tra userId hợp lệ: 24 ký tự hex
    if (!userId || userId.length !== 24) {
      return res.status(400).json({ message: "UserId không hợp lệ" });
    }

    // Gọi service trực tiếp với userId (Mongoose tự cast sang ObjectId)
    const favs = await favouriteService.getFavouritesByUser(userId);

    res.json(favs);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
}
async function removeFavourite(req, res) {
  try {
    const { userId, productId } = req.params;
    await favouriteService.removeFavorite(userId, productId);
    res.json({ message: "Favourite removed" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

module.exports = {
  addFavourite,
  getFavourites,
  removeFavourite,
  getFavouritesByUser,
};
