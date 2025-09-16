const Comment = require("../models/Comment");
const mongoose = require("mongoose");

class CommentService {
  async createComment(data) {
    return await Comment.create(data);
  }

  async getAllComments(productId = null) {
    const query = productId ? { productId } : {};
    return await Comment.find(query).populate("userId").sort({ createdAt: -1 }); // comment mới nhất lên đầu
  }

  async countUniqueCommentUsers(productId) {
    const users = await Comment.distinct("userId", {
      productId: new mongoose.Types.ObjectId(productId),
    });
    return users.length;
  }
}

module.exports = new CommentService();
