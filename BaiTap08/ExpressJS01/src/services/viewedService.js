// services/viewedService.js
const ViewedProduct = require("../models/ViewedProduct");

class ViewedService {
  async createView(data) {
    return await ViewedProduct.create(data);
  }

  async getAllViews() {
    return await ViewedProduct.find().populate("productId userId");
  }
}

module.exports = new ViewedService();
