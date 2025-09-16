const Order = require("../models/Order");
const mongoose = require("mongoose");

class OrderService {
  async createOrder(data) {
    return await Order.create(data);
  }

  async getAllOrders(userId = null) {
    const query = userId ? { userId } : {};
    return await Order.find(query).populate("products.productId");
  }

  async updateStatus(orderId, status) {
    return await Order.findByIdAndUpdate(orderId, { status }, { new: true });
  }

  async countUniqueBuyers(productId) {
    const users = await Order.distinct("userId", {
      "products.productId": new mongoose.Types.ObjectId(productId),
    });
    return users.length;
  }
}

module.exports = new OrderService();
