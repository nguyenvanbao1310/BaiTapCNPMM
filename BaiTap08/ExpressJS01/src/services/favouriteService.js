const FavouriteProduct = require("../models/FavouriteProduct");
const mongoose = require("mongoose");

class FavouriteService {
  async addFavourite(data) {
    return await FavouriteProduct.create(data);
  }

  async getFavouritesByUser(userId) {
    return await FavouriteProduct.find({
      userId: new mongoose.Types.ObjectId(userId),
    }).populate("productId");
  }

  async getAllFavourites() {
    return await FavouriteProduct.find().populate("productId userId");
  }

  async removeFavorite(userId, productId) {
    return await FavouriteProduct.findOneAndDelete({ userId, productId });
  }
}

module.exports = new FavouriteService();
