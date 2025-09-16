// controllers/product.controller.js
const productService = require("../services/productService");
const commentService = require("../services/commentService");
const orderService = require("../services/orderService");
const mongoose = require("mongoose");

const createProduct = async (req, res) => {
  try {
    const product = await productService.createProduct(req.body);
    return res.status(201).json(product);
  } catch (err) {
    return res.status(400).json({ message: err.message });
  }
};

const getProducts = async (req, res) => {
  try {
    const products = await productService.getProducts(req.query);
    return res.status(200).json(products);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

const searchProducts = async (req, res) => {
  try {
    const products = await productService.searchProducts(req.query);
    return res.json(products);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const getSimilarProducts = async (req, res) => {
  try {
    const { id } = req.params;
    const { limit = 6 } = req.query;
    const products = await productService.getSimilarProducts(id, Number(limit));
    return res.status(200).json(products);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

const getProductById = async (req, res) => {
  try {
    const product = await productService.getProductById(req.params.id);
    return res.status(200).json(product);
  } catch (err) {
    return res.status(404).json({ message: err.message });
  }
};

const getProductStats = async (req, res) => {
  try {
    const { id } = req.params;

    // ép ObjectId 1 lần, không truyền ObjectId thẳng xuống service
    const productId = new mongoose.Types.ObjectId(id);

    const buyersCount = await orderService.countUniqueBuyers(
      productId.toString()
    );
    const commentersCount = await commentService.countUniqueCommentUsers(
      productId.toString()
    );

    return res.json({ productId: id, buyersCount, commentersCount });
  } catch (err) {
    console.error("❌ Error getProductStats:", err);
    return res
      .status(500)
      .json({ message: "Server error", error: err.message });
  }
};

module.exports = {
  createProduct,
  getProducts,
  searchProducts,
  getSimilarProducts,
  getProductById,
  getProductStats,
};
