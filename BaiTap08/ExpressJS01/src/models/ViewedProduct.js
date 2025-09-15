const mongoose = require("mongoose");

const viewedSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
    required: true,
  },
  viewedAt: { type: Date, default: Date.now },
});

const ViewedProduct = mongoose.model("ViewedProduct", viewedSchema);
module.exports = ViewedProduct;
