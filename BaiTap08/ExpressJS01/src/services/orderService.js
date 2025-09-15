const Order = require("../models/Order");

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
}

module.exports = new OrderService();
