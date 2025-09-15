const Comment = require("../models/Comment");

class CommentService {
  async createComment(data) {
    return await Comment.create(data);
  }

  async getAllComments(productId = null) {
    const query = productId ? { productId } : {};
    return await Comment.find(query).populate("userId").sort({ createdAt: -1 }); // comment mới nhất lên đầu
  }
}

module.exports = new CommentService();
